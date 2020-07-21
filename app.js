const express = require('express')
const cors = require('cors')
const app = express()
const bcrypt = require('bcrypt')
const sequelize = require('./db/connection');
const { generateAccessToken, authorizeToken } = require('./auth-middleware');
const User = require('./db/models/User');

app.use(express.json())
app.use(cors())

app.post('/signup', async (req, res) => {

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.values.password, salt);
    const user = await User.create({
        email: req.body.values.email,
        name: req.body.values.name,
        password: hashedPassword
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
    console.log(`New User Added: ${JSON.stringify(user)}`);
    res.sendStatus(201);
})

app.post('/login', async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.values.email } })
        .catch(err => {
            console.log(err);
        });
    if (user === null) {
        return res.status(400).send('User NOT FOUND!');
    }

    if (await bcrypt.compare(req.body.values.password, user.password)) {
        const accToken = generateAccessToken(JSON.stringify(user));
        res.json({ accessToken: accToken });
    } else {
        res.send('Passwords DONT MATCH!');
    }
})

app.get('/me', authorizeToken, async (req, res) => {
    const user = req.user;
    res.json({ name: user.name });
})

app.listen(3000, () => {
    console.log("Server is listening on 3000...");
})