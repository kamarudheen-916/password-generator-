const jwt = require('jsonwebtoken');

const generateToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken
};
