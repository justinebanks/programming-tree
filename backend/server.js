const express = require('express');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const bcrypt = require('bcrypt')
const passport = require('passport');
const { Sequelize } = require('sequelize');
const cors = require('cors');

// HTTPS and HTTP modules
const https = require('https');
const http = require('http');

// Initialize Express app
const app = express();


const initializePassport = require("./passports");


app.use(session({
    secret: 'cvxdbfgrt435t5rtutj',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

initializePassport(passport)

app.use(express.urlencoded({ extended : false}))



// CORS options
const corsOptions = {
    origin: 'http://localhost:3000',  // Specify your frontend URL
    credentials: true                 // Allow credentials (cookies, authorization headers)
};

app.use(cors(corsOptions));



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
    console.log(results);
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

app.post("/login", passport.authenticate('local', {
    successRedirect: "/users/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true
}));

app.post("/signup", async (req, res, next) => {
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
        return res.status(400).json({ msg: errors });
    }

    try {
        // Check if email is already registered
        const [resultsEmail] = await sequelize.query('SELECT * FROM users WHERE email = ?', { replacements: [email] });

        if (resultsEmail.length > 0) {
            return res.status(400).json({ msg: "Email already registered" });
        }

        const [resultsUser] = await sequelize.query('SELECT * FROM users WHERE username = ?', { replacements: [username] });

        if (resultsUser.length > 0) {
            return res.status(400).json({ msg: "Username already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database and retrieve the ID of the new user
        const [result] = await sequelize.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?) RETURNING id;',
            { replacements: [username, email, hashedPassword] }
        );

        const userId = result[0].id;  // Get the newly created user's ID

        // Retrieve the user object using the ID (for use in login)
        const [newUser] = await sequelize.query('SELECT * FROM users WHERE id = ?', { replacements: [userId] });

        // Log the user in after signup
        req.logIn(newUser[0], (err) => {
            if (err) return next(err);
            return res.redirect('/dashboard');
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }
});


app.post("/logout", (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.json({ msg: "Logged out successfully!" });
    });
});


app.get("/dashboard", ensureAuthenticated, (req, res) => {
    res.json({ msg: "Welcome to the protected route!", user: req.user });
    console.log(req.user);
});





//Start HTTPS server
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

// app.listen(80, () => {
//     console.log("Server Started Successfully");
// })
