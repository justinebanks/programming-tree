const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
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

// Test route for signup
app.post("/signup", (req, res) => {
    res.json({ msg: "Success", body: req.body });
    console.log(req.body);
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
