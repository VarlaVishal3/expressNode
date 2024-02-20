const jwt = require('jsonwebtoken');
const authenticate = (req, res, next) => {
    try {
        const token = req?.headers?.token;
        if(!token) throw new Error("Authentication is required!")
        console.log("token", token)
        const user = jwt.verify(token, process.env.secretKey);
        console.log("token", token)
        if(!user) throw new Error("User is not present");

        next();
    } catch (error) {
        console.log("error in code");
        return res.status(400).json({msg: error.message});
    }
}

const authorize = (req, res, next) => {
    try {
        console.log("entered try");
        const user = jwt.verify(req.headers.token, process.env.secretKey);
        console.log("checked token");
        if(user.role != 'admin') throw new Error("your current role is not eligible to access this resource");
        next();
    } catch (error) {
        console.log("error in authorization");
        return res.status(401).json({msg: error.message });
    }
}
module.exports = { authenticate , authorize};