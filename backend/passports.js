const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');  // Ensure bcrypt is required here
const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');


// Define a function to initialize passport strategies
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



function initializePassport(passport) {
    passport.use(new LocalStrategy({
        usernameField: 'username', // Or 'email' if using email
        passwordField: 'password'
    }, async (username, password, done) => {
        try {
            const [user] = await sequelize.query('SELECT * FROM users WHERE username = ? OR email = ?', {
                replacements: [username, username]
            });

            if (!user.length) {
                return done(null, false, { message: 'No user found with this username/email' });
            }

            const userRecord = user[0];
            const match = await bcrypt.compare(password, userRecord.password);

            if (!match) {
                return done(null, false, { message: 'Incorrect password' });
            }

            return done(null, userRecord);

        } catch (err) {
            return done(err);
        }
    }));

    passport.serializeUser((user, done) => {
        console.log("Serializing User:", user.id); // Log user ID
        done(null, user.id);
    });
    
    passport.deserializeUser(async (id, done) => {
        console.log("Deserializing User by ID:", id); // Log deserialization
        try {
            const [user] = await sequelize.query('SELECT * FROM users WHERE id = ?', { replacements: [id] });
            done(null, user[0]);
        } catch (err) {
            done(err);
        }
    });
}

// Export the initializePassport function
module.exports = initializePassport;
