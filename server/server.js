// require("dotenv").config();
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const mongoose = require("mongoose");

// const User = require("./model/User");

// const { createToken, hashPassword, verifyPassword } = require("./util.js");

// const app = express();

// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Registration API Endpoint
// app.post("/api/signup", async (req, res) => {
//     try {
//         const { username, email } = req.body;

//         const hashedPassword = await hashPassword(req.body.password);

//         const userData = {
//             username: username.toLowerCase(),
//             email: email.toLowerCase(),
//             password: hashedPassword,
//             role: "user",
//         };

//         const existingUsername = await User.findOne({
//             username: userData.username,
//         }).lean();

//         if (existingUsername) {
//             return res.status(400).json({ message: "Username already exists" });
//         }

//         const existingEmail = await User.findOne({
//             email: userData.email,
//         }).lean();

//         if (existingEmail) {
//             return res.status(400).json({ message: "Email already exists" });
//         }

//         const newUser = new User(userData);
//         const savedUser = await newUser.save();

//         if (savedUser) {
//             const token = createToken(savedUser);

//             const { username, email, role } = savedUser;

//             const userInfo = {
//                 username,
//                 email,
//                 role,
//             };

//             return res.json({
//                 message: "User created!",
//                 token,
//                 userInfo,
//             });
//         } else {
//             return res.status(400).json({
//                 message: "There was a problem creating your account",
//             });
//         }
//     } catch (err) {
//         return res.status(400).json({
//             message: "There was a problem creating your account",
//         });
//     }
// });

// // Login API
// app.post("/api/signin", async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await User.findOne({
//             email,
//         }).lean();

//         if (!user) {
//             return res.status(403).json({
//                 message: "Wrong email.",
//             });
//         }

//         const passwordValid = await verifyPassword(password, user.password);

//         if (passwordValid) {
//             const { password, ...rest } = user;
//             const userInfo = Object.assign({}, { ...rest });

//             const token = createToken(userInfo);

//             res.json({
//                 message: "Authentication successful!",
//                 token,
//                 userInfo,
//             });
//         } else {
//             res.status(403).json({
//                 message: "Wrong email or password.",
//             });
//         }
//     } catch (err) {
//         console.log(err);
//         return res.status(400).json({ message: "Something went wrong." });
//     }
// });

// async function connect() {
//     try {
//         mongoose.Promise = global.Promise;
//         await mongoose.connect(process.env.ATLAS_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useFindAndModify: false,
//         });
//     } catch (err) {
//         console.log("Mongoose error", err);
//     }
//     app.listen(3001);
//     console.log("API listening on localhost:3001");
// }

// connect();
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const cookieParser = require("cookie-parser");
const path = require("path");

// SETUP
// dotenv.config({ path: "./server/config/.env" });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cookieParser("secretcode"));

// DATABASE
// const DB = process.env.MONGO_URI.replace(
//   "<password>",
//   process.env.MONGO_PASSWORD
// );

mongoose
    .connect(process.env.ATLAS_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => console.log(err));

// ROUTES
const authRouter = require("./routes/authRoutes");
const dataRouter = require("./routes/dataRoutes");
// const newsRouter = require("./routes/newsRoutes");
const stockRouter = require("./routes/stockRoutes");

app.use("/api/auth", authRouter);
app.use("/api/data", dataRouter);
// app.use("/api/news", newsRouter);
app.use("/api/stock", stockRouter);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname + "/../client/build/index.html"));
//   });
// }

// APP
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
