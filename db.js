const Sequelize = require('sequelize')

const naturalModel = require('./src/Models/naturalModel');
const senaModel = require('./src/Models/senaModel');
const bussinessModel = require('./src/Models/bussinessModel');

const sequelize = new Sequelize('GdP', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const Natural = naturalModel(sequelize, Sequelize); 
const Sena = senaModel(sequelize, Sequelize); 
const Bussiness = bussinessModel(sequelize, Sequelize); 

sequelize.sync({ force: false })
    .then(() => {
        console.log( 'Synchronized Tables' );
    })

module.exports = {
    Natural,
    Sena,
    Bussiness
}