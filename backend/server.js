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
app.use(express.json());
app.use(cors());


const getNode = () => {
    
}



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
        res.status(404).json({error: "Node Not Found"});
    }
    
});

app.post("/nodes/:id", async (req, res) => {
    const { text, isCode } = req.body;
    const [results, _] = await sequelize.query('SELECT * FROM nodes WHERE id = ?;', { replacements: [req.params["id"]] });
    console.log(results);

    if (results.length > 0) {
        const node = results[0];
        let encSegments = JSON.parse(decodeURI(node.segments));

        let plainString = `:${isCode ? 'code' : 'text'}:${text}`;
        let encodedFinalText = btoa(plainString);
        encSegments.push(encodedFinalText);

        let newSegments = encodeURI(JSON.stringify(encSegments));

        try {
            await sequelize.query('UPDATE nodes SET segments = ? WHERE id = ?;', {replacements: [newSegments, req.params['id']]});
            res.json({msg: "Success"});
        }
        catch (err) {
            res.json({ msg: err });
        }
     
    }
    else {
        res.status(404).json({error: "Node Not Found"});
    }
})

app.delete("/nodes/:id", async (req, res) => {
    const { index } = req.body;
    const [results, _] = await sequelize.query('SELECT * FROM nodes WHERE id = ?;', { replacements: [req.params["id"]] });
    console.log(results);

    if (results.length > 0) {
        const node = results[0];
        let encSegments = JSON.parse(decodeURI(node.segments));
        encSegments.splice(index, 1);

        let newSegments = encodeURI(JSON.stringify(encSegments));

        try {
            await sequelize.query('UPDATE nodes SET segments = ? WHERE id = ?;', {replacements: [newSegments, req.params['id']]});
            res.json({msg: "Success"});
        }
        catch (err) {
            res.json({ msg: err });
        }
     
    }
    else {
        res.status(404).json({error: "Node Not Found"});
    }
});



app.post("/signup", (req, res) => {
    console.log("request recived")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

