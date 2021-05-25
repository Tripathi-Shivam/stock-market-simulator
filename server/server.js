require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const User = require("./model/User");

const { createToken, hashPassword, verifyPassword } = require("./util.js");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Registration API Endpoint
app.post("/api/signup", async (req, res) => {
    try {
        const { username, email } = req.body;

        const hashedPassword = await hashPassword(req.body.password);

        const userData = {
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: hashedPassword,
            role: "user",
        };

        const existingUsername = await User.findOne({
            username: userData.username,
        }).lean();

        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const existingEmail = await User.findOne({
            email: userData.email,
        }).lean();

        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const newUser = new User(userData);
        const savedUser = await newUser.save();

        if (savedUser) {
            const token = createToken(savedUser);

            const { username, email, role } = savedUser;

            const userInfo = {
                username,
                email,
                role,
            };

            return res.json({
                message: "User created!",
                token,
                userInfo,
            });
        } else {
            return res.status(400).json({
                message: "There was a problem creating your account",
            });
        }
    } catch (err) {
        return res.status(400).json({
            message: "There was a problem creating your account",
        });
    }
});

async function connect() {
    try {
        mongoose.Promise = global.Promise;
        await mongoose.connect(process.env.ATLAS_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
    } catch (err) {
        console.log("Mongoose error", err);
    }
    app.listen(3001);
    console.log("API listening on localhost:3001");
}

connect();
