const sequelize2 = require('../db2')
const {DataTypes} = require('sequelize')


const Fruits = sequelize2.define('fruits', {
    Фрукт: {type: DataTypes.STRING, primaryKey: true, allowNull: false},
    Цена: {type: DataTypes.INTEGER, allowNull: false}
})

const University = sequelize2.define('univers', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false},
    Имя: {type: DataTypes.STRING, allowNull: false},
    Группа: {type: DataTypes.INTEGER, allowNull: false},
    Программирование: {type: DataTypes.INTEGER, allowNull: false},
    Базы_Данных: {type: DataTypes.INTEGER, allowNull: false}
})


module.exports = {
    Fruits,
    University
}