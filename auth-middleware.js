const jwt = require('jsonwebtoken')

const SECRET_KEY = 'eQexMoYpsgwzNqDQX5LOCZzgTEsgtoWz2BpauUX9llKFPdVpO6kLKv2ums163NLz4ki' +
    'UT1pOe7XR2HJfguulZUYkyZEQL6e6taRNPEfTGPv6KMiyQ4AihqyMNmK9Zzc9';


const generateAccessToken = (user) => {
    return jwt.sign(user, SECRET_KEY);
}

const authorizeToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null)
        return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err)
            return res.sendStatus(403);
        req.user = user;
        next();
    })
}

module.exports.authorizeToken = authorizeToken;
module.exports.generateAccessToken = generateAccessToken;