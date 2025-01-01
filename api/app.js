const pg = require("pg");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "YOUR DATABASE",
  password: "YOUR PASSWORD",
  port: 5432,
});

db.connect();

app.use(express.static("build"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let isAuthanticated = false;

app.post("/api/signUp", async (req, res) => {
    // Check for an exsiting account
    const result = await db.query(
        "SELECT * FROM users WHERE email = $1",
         [req.body.email]
    );
    if (result.rows.length != 0) return res.json({"message": "Email already exist, try logging in instead"});

    try {
        // Encrypt the password
        const hashedPwd = await bcrypt.hash(req.body.password, 10);
        await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [req.body.email, hashedPwd]);
        isAuthanticated = true;
        res.json({"success": "User signed up succesfully"});
    } catch (err) {
        res.json({"message": err.message});
    }

})

app.post("/api/signIn", async (req, res) => {
    const result = await db.query(
        "SELECT * FROM users WHERE email = $1",
         [req.body.email]
    );
    const users =  result.rows;
    // Check if the user exist
    if (users.length != 0){
        const user = users[0];
        // Check if the passwords match
        const areMatching = await bcrypt.compare(req.body.password, user.password);
        if (areMatching){
            isAuthanticated = true;
            res.json({"success": "User signed in succesfully"});
        } else {
            res.json({"message": "Password is incorrect, please try again"});
        }
    } else {
        res.json({"message": "Email doesn't exist, try to sign up instead"});
    }

})

app.get("/api/logout", (req, res) => {
    isAuthanticated = false;
    res.sendStatus(200);
});

app.get("/api/authanticated", (req, res) => {
    res.json({"isAuthanticated": isAuthanticated});
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
