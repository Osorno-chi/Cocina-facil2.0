const config = require("../config/config")
const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const header = req.header("Authorization");
    if (!header) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = header.split(" ")[1];
    if (!header) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid Token" });
        }
        req.user = user;
    })
    next();
}

module.exports= verifyToken;