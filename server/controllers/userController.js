const {Users, Students, Groups, Marks} = require('../models/models')
const ApiError = require('../error/ApiError');
const sequelize = require('../db')
const jwt = require('jsonwebtoken');
const { QueryTypes } = require('sequelize');

const generateJWT = (id, login, role) => {
    return jwt.sign(
        {id, login, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserContoller {
    async registration(req, res, next) {
        const {login, password, surName, name, patronymic, group} = req.body
        if(!login || !password) 
            return next(ApiError.internal('Незаполненные поля логина или пароля'))

        if(!surName || !name || !patronymic)
            return next(ApiError.internal('Незаполненные поля личной информации'))

        const candidate = await Users.findOne({where: {login}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким логином уже существует'))
        }
        
        if(!group) {
            return next(ApiError.internal('Пустое поле группы'))
        }

        const candidateGroup = await Groups.findOne({where: {groups: group}})
        if(!candidateGroup) {
            return next(ApiError.badRequest('Такой группы нет в списке'))
        }

        const user = await Users.create({login, password, role: 'student'})
        const fullname = `${surName} ${name} ${patronymic}`
        const student = await Students.create({ФИО: fullname, Группа: group, student_id: user.id})
        
        const token = generateJWT(user.id, user.login, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {login, password} = req.body
        if(!login || !password) 
            return next(ApiError.internal('Незаполненные поля логина или пароля'))

        const user = await Users.findOne({where: {login, password}})
        if(!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        const token = generateJWT(user.id, user.login, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJWT(req.user.id, req.user.login, req.user.role)
        return res.json({token})
    }

    async setLabMark(req, res) {
        const {mark, labNumber, id} = req.body
        let markQuery
        const check = await Marks.findOne({where: {Семестр: 1, student_id: id}})
        if (check === null) {
            markQuery = await sequelize.query(`INSERT INTO public."Marks" (Семестр, student_id, lab${labNumber}) values (1, ${id}, ${mark})`, { type:QueryTypes.INSERT});
        } else {
            markQuery = await sequelize.query(`UPDATE public."Marks" SET lab${labNumber} = ${mark} WHERE student_id = ${id}`,{type:QueryTypes.UPDATE});
        }
        return res.json({markQuery})
    }

    async getUserInfo(req, res) {
        const {id} = req.body
        let userQuery
        const check = await Users.findOne({where: {id}})
        if (check !== null) {
            userQuery = await sequelize.query(`SELECT ФИО from public."Students" where student_id = ${id}`, { type:QueryTypes.SELECT});
        } else {
            return next(ApiError.internal('Пользователь не найден'))
        }
        return res.json({userQuery})
    }

    async getAllMarks(req, res) {
        const {id} = req.body
        let userQuery
        const check = await Users.findOne({where: {id}})
        if (check !== null) {
            userQuery = await sequelize.query(`SELECT lab1, lab2, lab3, lab4, (lab1 + lab2) as Суммарно from public."Marks" where student_id = ${id}`, { type:QueryTypes.SELECT});
        } else {
            return next(ApiError.internal('Пользователь не найден'))
        }
        return res.json({userQuery})
    }

}

module.exports = new UserContoller()