const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (user) => {
    // Sign the JWT
    if (!user.role) {
        throw new Error("No user role specified");
    }
    return jwt.sign(
        {
            sub: user._id,
            email: user.email,
            role: user.role,
            iss: "api.stock",
            aud: "api.stock",
        },
        process.env.JWT_SECRET,
        { algorithm: "HS256" }
    );
};

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        // Generate a salt at level 12 strength
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
};

const verifyPassword = (passwordAttempt, hashedPassword) => {
    return bcrypt.compare(passwordAttempt, hashedPassword);
};

module.exports = {
    createToken,
    hashPassword,
    verifyPassword,
};
