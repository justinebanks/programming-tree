const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcrypt')
const { Sequelize } = require('sequelize');

// HTTPS and HTTP modules
const https = require('https');
const http = require('http');

// Initialize Express app
const app = express();

// Read SSL certificate and private key from 'sslcert' directory
const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'sslcert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'sslcert', 'cert.pem'))
};

// Sequelize object and configData
let sequelize = null;
let configData = {};

// Retrieve data from config.ini
fs.readFile(path.join(__dirname, '/config.ini'), 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const stringData = data.split("\r\n");

    // Format config data
    for (let dataPoint of stringData) {
        if (dataPoint !== '') {
            const [key, value] = dataPoint.split("=");
            configData[key] = value;
        }
    }

    // Initialize Sequelize connection using config data
    sequelize = new Sequelize(`postgres://${configData.db_user}:${configData.db_pwd}@localhost:5432/${configData.db_name}`);

    // Authenticate Sequelize
    try {
        sequelize.authenticate().then(() => console.log('Connection established successfully.'));
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});

// Middleware
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use(express.json());
app.use(cors());

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ msg: "You need to be logged in to access this resource." });
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.get("/nodes", async (req, res) => {
    const [results] = await sequelize.query('SELECT * FROM nodes;');
    res.json(results);
});

app.get("/nodes/:id", async (req, res) => {
    const [results] = await sequelize.query('SELECT * FROM nodes WHERE id = ?;', { replacements: [req.params["id"]] });
    if (results.length > 0) {
        res.json(results[0]);
    } else {
        res.status(404).json({ error: "Node Not Found" });
    }
});

app.post("/nodes/:id", async (req, res) => {
    const { text, isCode } = req.body;
    const [results] = await sequelize.query('SELECT * FROM nodes WHERE id = ?;', { replacements: [req.params["id"]] });
    
    if (results.length > 0) {
        const node = results[0];
        let encSegments = JSON.parse(decodeURI(node.segments));

        let plainString = `:${isCode ? 'code' : 'text'}:${text}`;
        let encodedFinalText = Buffer.from(plainString).toString('base64');  // Using Buffer for base64 encoding
        encSegments.push(encodedFinalText);

        let newSegments = encodeURI(JSON.stringify(encSegments));

        try {
            await sequelize.query('UPDATE nodes SET segments = ? WHERE id = ?;', { replacements: [newSegments, req.params['id']] });
            res.json({ msg: "Success" });
        } catch (err) {
            res.json({ msg: err });
        }
    } else {
        res.status(404).json({ error: "Node Not Found" });
    }
});

app.delete("/nodes/:id", async (req, res) => {
    const { index } = req.body;
    const [results] = await sequelize.query('SELECT * FROM nodes WHERE id = ?;', { replacements: [req.params["id"]] });

    if (results.length > 0) {
        const node = results[0];
        let encSegments = JSON.parse(decodeURI(node.segments));
        encSegments.splice(index, 1);

        let newSegments = encodeURI(JSON.stringify(encSegments));

        try {
            await sequelize.query('UPDATE nodes SET segments = ? WHERE id = ?;', { replacements: [newSegments, req.params['id']] });
            res.json({ msg: "Success" });
        } catch (err) {
            res.json({ msg: err });
        }
    } else {
        res.status(404).json({ error: "Node Not Found" });
    }
});

app.post("/login", async (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err); // Handle errors
        if (!user) return res.status(401).json({ msg: info.message }); // User not found or incorrect password

        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.json({ msg: "Login successful!", user });
        });
    })(req, res, next)   

});

app.post("/signup", async (req, res) => {
    console.log(req.body);  // Add this to see what's being sent in the request

    let { username, email, password, password2 } = req.body;
    let errors = [];

    if (!username || !email || !password || !password2) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }


    if (password.length < 6) {
        errors.push({ message: "Password should be at least 6 characters" });
    }

    if (password !== password2) {
        errors.push({ message: "Passwords do not match" });
    }

    if (errors.length > 0) {
        return res.json({ msg: errors });
        console.log(errors);
    }

    try {
        // Check if email is already registered
        const [resultsEmail] = await sequelize.query('SELECT * FROM users WHERE email = ?', { replacements: [email] });

        if (resultsEmail.length > 0) {
            return res.json({ msg: "Email already registered" });
        }

        const [resultsUser] = await sequelize.query('SELECT * FROM users WHERE username = ?', { replacements: [username] });

        if (resultsUser.length > 0) {
            return res.json({ msg: "Username already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        await sequelize.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?);',
            { replacements: [username, email, hashedPassword] }
        );

        res.json({ msg: "Registration successful!" });

    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});

app.post("/logout", (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.json({ msg: "Logged out successfully!" });
    });
});





// Start HTTPS server
https.createServer(sslOptions, app).listen(8443, () => {
    console.log('✅ HTTPS Server running on port 8443');
});

// Optional: HTTP server to redirect traffic to HTTPS
http.createServer((req, res) => {
    res.writeHead(301, { "Location": `https://${req.headers.host}${req.url}` });
    res.end();
}).listen(80, () => {
    console.log('🌐 HTTP Server running on port 80, redirecting to HTTPS');
});
