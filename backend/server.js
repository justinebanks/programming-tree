const express = require("express");
const path = require("path");
const fs = require("fs");
const session = require("express-session");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { Sequelize } = require("sequelize");
const cors = require("cors");
const flash = require('connect-flash');
const http = require("http");  // Use HTTP instead of HTTPS

// Initialize Express app
const app = express();

const initializePassport = require("./passports");

// CORS options
const corsOptions = {
    origin: "http://localhost", // Update to reflect new frontend URL
    credentials: true, // Allow cookies to be sent
};

// Sequelize object and configData
let sequelize = null;
let configData = {};

// Retrieve data from config.ini
fs.readFile(path.join(__dirname, "/config.ini"), "utf-8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const stringData = data.split("\r\n");

    // Format config data
    for (let dataPoint of stringData) {
        if (dataPoint !== "") {
            const [key, value] = dataPoint.split("=");
            configData[key] = value;
        }
    }

    // Initialize Sequelize connection using config data
    sequelize = new Sequelize(
        `postgres://${configData.db_user}:${configData.db_pwd}@localhost:5432/${configData.db_name}`
    );

    // Authenticate Sequelize
    try {
        sequelize
            .authenticate()
            .then(() => console.log("Connection established successfully."));
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});

// Middleware
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.use(express.json());
app.use(cors(corsOptions));
app.use(flash());

app.use(
    session({
        secret: "cvxdbfgrt435t5rtutj",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // 1-day session
            secure: false, // Set to false to allow HTTP cookies
            httpOnly: false, // Allow JS to access cookie in development for testing
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());

initializePassport(passport);

app.use(express.urlencoded({ extended: false }));

function ensureAuthenticated(req, res, next) {
    console.log("Checking authentication. Session:", req.session);
    console.log("User authenticated:", req.isAuthenticated());

    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({
        msg: "You need to be logged in to access this resource.",
    });
}

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.get("/nodes", async (req, res) => {
    const [results] = await sequelize.query("SELECT * FROM nodes;");
    console.log(results);
    res.json(results);
});

app.get("/nodes/:id", async (req, res) => {
    const [results] = await sequelize.query(
        "SELECT * FROM nodes WHERE id = ?;",
        { replacements: [req.params["id"]] }
    );
    if (results.length > 0) {
        res.json(results[0]);
    } else {
        res.status(404).json({ error: "Node Not Found" });
    }
});


app.post("/nodes/:id", async (req, res) => {
    const { text, type } = req.body;
    const [results] = await sequelize.query(
        "SELECT * FROM nodes WHERE id = ?;",
        { replacements: [req.params["id"]] }
    );

    if (results.length > 0) {
        const node = results[0];
        let encSegments = JSON.parse(decodeURI(node.segments));

        let plainString = `:${type}:${text}`;
        let encodedFinalText = Buffer.from(plainString).toString("base64");
        encSegments.push(encodedFinalText);

        let newSegments = encodeURI(JSON.stringify(encSegments));

        try {
            await sequelize.query(
                "UPDATE nodes SET segments = ? WHERE id = ?;",
                { replacements: [newSegments, req.params["id"]] }
            );
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
    const [results] = await sequelize.query(
        "SELECT * FROM nodes WHERE id = ?;",
        { replacements: [req.params["id"]] }
    );

    if (results.length > 0) {
        const node = results[0];
        let encSegments = JSON.parse(decodeURI(node.segments));
        encSegments.splice(index, 1);

        let newSegments = encodeURI(JSON.stringify(encSegments));

        try {
            await sequelize.query(
                "UPDATE nodes SET segments = ? WHERE id = ?;",
                { replacements: [newSegments, req.params["id"]] }
            );
            res.json({ msg: "Success" });
        } catch (err) {
            res.json({ msg: err });
        }
    } else {
        res.status(404).json({ error: "Node Not Found" });
    }
});

// Login route - Modified to handle redirection properly

app.post("/signup", async (req, res, next) => {
    let { username, email, password, password2 } = req.body;
    let errors = [];

    if (!username || !email || !password || !password2) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }

    if (password.length < 6) {
        errors.push({ msg: "Password should be at least 6 characters" });
    }

    if (password !== password2) {
        errors.push({ msg: "Passwords do not match" });
    }

    if (errors.length > 0) {
        return res.json({ msg: errors });
    }

    try {
        const [resultsEmail] = await sequelize.query(
            "SELECT * FROM users WHERE email = ?;",
            { replacements: [email] }
        );

        if (resultsEmail.length > 0) {
            return res.status(400).json({ msg: "Email already registered" });
        }

        const [resultsUser] = await sequelize.query(
            "SELECT * FROM users WHERE username = ?;",
            { replacements: [username] }
        );

        if (resultsUser.length > 0) {
            return res.status(400).json({ msg: "Username already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await sequelize.query(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?) RETURNING id;",
            { replacements: [username, email, hashedPassword] }
        );

        return res.json({ msg: "success" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }
});


app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error("Error in passport.authenticate:", err);
            return next(err);
        }
        if (!user) {
            console.error("Login failed: User not found");
            return res.status(400).json({ msg: 'Login failed' });
        }
        req.login(user, function(err) {
            if (err) {
                console.error("Error during req.login:", err);
                return next(err);
            }

            if (req.user) {
                console.log(`User successfully authenticated. User: ${JSON.stringify(req.user)}`);
                console.log("Session after login:", req.session);
                // Return a success response with user details for frontend
                res.json({ msg: 'Login successful', user: req.user });
            } else {
                console.error("Login error: req.user is undefined");
                res.json({ error: 'Invalid username or password' });
            }
        });
    })(req, res, next);
});

app.get("/dashboard", ensureAuthenticated, (req, res) => {
    console.log("Session on /dashboard access:", req.session);
    if (req.isAuthenticated()) {
        const { id, username, email } = req.user;
        return res.json({ msg: "Authenticated", user: { id, username, email } });
    } else {
        res.status(401).json({ msg: "Unauthorized" });
    }
});


app.get('/status', (req, res) => {
    res.json({
        authenticated: req.isAuthenticated(),
        user: req.user,
        session: req.session
    });
});


// Get all threads
app.get("/api/threads", async (req, res) => {
    try {
        const [threads] = await sequelize.query("SELECT * FROM threads ORDER BY created_at DESC;");
        res.json(threads);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch threads." });
    }
});

app.get("/api/threads/:id", async (req, res) => {
    const [results] = await sequelize.query(
        "SELECT * FROM threads WHERE id = ?;",
        { replacements: [req.params["id"]] }
    );
    if (results.length > 0) {
        res.json(results[0]);
    } else {
        res.status(404).json({ error: "Thread Not Found" });
    }
});


// Get all posts in a specific thread
app.get("/api/threads/:id/posts", async (req, res) => {
    const threadId = req.params.id;
    
    try {
        const [posts] = await sequelize.query(
            "SELECT * FROM posts WHERE thread_id = ? ORDER BY created_at ASC;",
            { replacements: [threadId] }
        );
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch posts." });
    }
});

// Add a new post to a thread
app.post("/api/threads/:id/posts", async (req, res) => {
    const threadId = req.params.id;
    const { author, content } = req.body;
    console.log("Making Post");
    if (!author || !content) {
        return res.status(400).json({ error: "Author and content are required." });
    }

    try {
        await sequelize.query(
            "INSERT INTO posts (thread_id, author, content) VALUES (?, ?, ?);",
            { replacements: [threadId, author, content] }
        );
        res.json({ msg: "Post created successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create post." });
    }
});

app.post("/api/forum", async (req, res) => {
    const { author, title } = req.body;

    if (!author || !title) {
        return res.status(400).json({ error: "Author and Title are required."});
    }

    try {
        await sequelize.query(
            "INSERT INTO threads (title, author) VALUES (?, ?);", 
            { replacements: [title, author] }
        );
        res.json({ msg: "Thread created successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create post." });
    }

});

// Start HTTP server on port 3000
http.createServer(app).listen(3000, () => {
    console.log("✅ HTTP Server running on port 3000");
});
