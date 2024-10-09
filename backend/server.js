const express = require('express');
const path = require('path');
const cors = require("cors");
const { Sequelize } = require('sequelize');

const app = express();
const sequelize = new Sequelize('postgres://postgres:!231njsfN@localhost:5432/postgres');


try {
    sequelize.authenticate().then(() => 
        console.log('Connection has been established successfully.')); 
}
catch (error) {
    console.error('Unable to connect to the database:', error);
}

// sequelize.query('SELECT * FROM nodes;')
//     .then(([results, metadata]) => {
//         console.log("Results: ", results);
//         console.log("Metadata: ", metadata);
//     });



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

