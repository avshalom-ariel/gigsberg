const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    try {
        console.log("auth request received ");

        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        console.log("authentication token: " + token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("decoded token: " + decoded.email);

        req.user = decoded;

        // Just logged in console, may be replaced with a logger.
        const now = new Date().toISOString();
        console.log(`[${now}] ${req.method} ${req.url}`);

        next();
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authenticateToken;
