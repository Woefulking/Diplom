const {Groups} = require('../models/models')
const ApiError = require('../error/ApiError');
const sequelize = require('../db')
const { QueryTypes } = require('sequelize');


class AdminContoller {
    async addGroup(req, res, next) {
        const {newGroup} = req.body
        let groupQuery
        const check = await Groups.findOne({where: {groups: newGroup}})
        if (check === null) {
            groupQuery = await sequelize.query(`INSERT INTO public."Groups" values (${newGroup})`, { type:QueryTypes.INSERT});
            
        } else {
            return next(ApiError.internal('Группа с таким номером уже есть'))
        }
        return res.json({groupQuery})
    }

    async deleteGroup(req, res, next) {
        const {deleteGroup} = req.body
        let groupQuery
        const check = await Groups.findOne({where: {groups: deleteGroup}})
        if (check === null) {
            return next(ApiError.internal('Группы с таким номером нет'))
            
        } else {
            groupQuery = await sequelize.query(`DELETE FROM public."Groups" WHERE groups = ${deleteGroup}`, { type:QueryTypes.DELETE});
        }
        return res.json({groupQuery})
    }
    async getMarks(req, res, next) {
        const {group} = req.body
        let groupQuery
        const check = await Groups.findOne({where: {groups: group}})
        if (check === null) {
            return next(ApiError.internal('Группы с таким номером нет'))
        } else {
            groupQuery = await sequelize.query(`select Группа, ФИО, Семестр, lab1, lab2, lab3, lab4, (lab1 + lab2 + lab3 + lab4) as Суммарно 
            from public."Students", public."Marks" where public."Students".student_id = public."Marks".student_id and  public."Students"."Группа" = ${group}`, { type:QueryTypes.SELECT});      
        }
        return res.json({groupQuery})
    }
}

module.exports = new AdminContoller()