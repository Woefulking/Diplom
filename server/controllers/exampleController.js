const {Fruits} = require('../models/model2')
const sequelize = require('../db2')
const { QueryTypes } = require('sequelize');

class ExampleController {
    async getTableInfo(req, res) {
        const {tableName} = req.body
        let tableInfo = await sequelize.query(`SELECT * from public."${tableName}"`, { type:QueryTypes.SELECT});
        return res.json({tableInfo})
    }

    async selectAll(req, res) {
        const {price} = req.body
        const fruits = await Fruits.findAll({attributes: ['Цена']})
        try{   
            const fruit2 = await sequelize.query(`${price}`, { type: QueryTypes.SELECT });
            if( JSON.stringify(fruits) === JSON.stringify(fruit2) ) {
                return res.json('Одинаковые')
            } else {
                return res.json('Разные')
            }
        } catch(e) {
            return res.json(e.message)
        }
    }

    async selectWhere(req, res) {
        const {sql} = req.body
        let rightAnswer = await sequelize.query(`select * from univers where (Группа = 220692 or Группа = 220291) and (Программирование = 5 and Базы_Данных = 5)`, { type:QueryTypes.SELECT});
        try{   
            const studentAnswer = await sequelize.query(`${sql}`, { type: QueryTypes.SELECT })
            if( JSON.stringify(rightAnswer) === JSON.stringify(studentAnswer) ) {
                return res.json(rightAnswer)
            } else {
                return res.json('Разные')
            }
        } catch(e) {
            return res.json(e.message)
        }
    }

}

module.exports = new ExampleController()
