const express = require('express');
const path = require('path');
const fs = require("node:fs");
const cors = require("cors");
const { Sequelize } = require('sequelize');




let sequelize = null; // Null Sequelize Object
let configData = {};

// Retrieves data from config.ini
fs.readFile(path.join(__dirname, '/config.ini'), 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
    }

    console.log(data);
    stringData = data.split("\r\n");

    // Formats config data
    for (let dataPoint of stringData) {
        if (dataPoint != '') {
            const [key, value] = dataPoint.split("=");
            configData[key] = value;
        }
    }

    console.log("CONFIG", configData);

    // Initializes database connection using config data
    sequelize = new Sequelize(`postgres://${configData.db_user}:${configData.db_pwd}@localhost:5432/${configData.db_name}`);

    try {
        sequelize.authenticate().then(() => 
            console.log('Connection has been established successfully.')); 
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }


})



const app = express();


const PORT = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', index.html));
});

app.get("/nodes", async (req, res) => {
    const [results, _] = await sequelize.query('SELECT * FROM nodes;');
    console.log(results);
    res.json(results);
});

app.get("/nodes/:id", async (req, res) => {
    const [results, _] = await sequelize.query('SELECT * FROM nodes WHERE id = ?;', { replacements: [req.params["id"]] });
    console.log(results);
    if (results.length > 0) {
        res.json(results[0]);
    }
    else {
        res.status(404).json({error: "Generic Error Message"});
    }
    
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

