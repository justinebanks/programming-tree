const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Passport middleware setup
app.use(passport.initialize());
app.use(passport.session());

// Define local strategy for Passport
passport.use(new LocalStrategy({
    usernameField: 'username', // This can be 'email' if you're using email for login
    passwordField: 'password'
}, async (username, password, done) => {
    try {
        // Check if the user exists
        const [user] = await sequelize.query('SELECT * FROM users WHERE username = ? OR email = ?', { replacements: [username, username] });

        if (!user.length) {
            return done(null, false, { message: 'No user found with this username/email' });
        }

        const userRecord = user[0];

        // Compare password with hashed password
        const match = await bcrypt.compare(password, userRecord.password);

        if (!match) {
            return done(null, false, { message: 'Incorrect password' });
        }

        // Successful login
        return done(null, userRecord);

    } catch (err) {
        return done(err);
    }
}));

// Serialize user into the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
    try {
        const [user] = await sequelize.query('SELECT * FROM users WHERE id = ?', { replacements: [id] });
        done(null, user[0]);
    } catch (err) {
        done(err);
    }
});
