const Sequelize = require('sequelize');

const sequelizeInstance = new Sequelize('UsersDB', 'root', 'yomawn12',
    { 
        host: '127.0.0.1',
        dialect: 'mysql'
    });

module.exports = sequelizeInstance;