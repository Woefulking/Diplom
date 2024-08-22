const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const Role = sequelize.define('Roles', {
    role: {type: DataTypes.STRING, primaryKey: true, allowNull: false}
})

const Users = sequelize.define('users', {
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
})

const Groups = sequelize.define('Groups', {
    groups: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false}
})

const Students = sequelize.define('Students', {
    student_id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false},
    ФИО: {type: DataTypes.STRING}
})

const Marks = sequelize.define('Marks', {
    Семестр: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false},
    student_id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false},
    lab1: {type: DataTypes.INTEGER},
    lab2: {type: DataTypes.INTEGER},
    lab3: {type: DataTypes.INTEGER},
    lab4: {type: DataTypes.INTEGER}
})

Role.hasMany(Users, { foreignKey: 'role'})
Users.belongsTo(Role, { foreignKey: 'role'})

Groups.hasMany(Students, { foreignKey: 'Группа'})
Students.belongsTo(Groups, { foreignKey: 'Группа'})

Users.hasOne(Students, { foreignKey: 'student_id'})
Students.belongsTo(Users,{ foreignKey: 'student_id'})

Students.hasOne(Marks, { foreignKey: 'student_id'})
Marks.belongsTo(Students, { foreignKey: 'student_id'})

module.exports = {
    Role,
    Users,
    Groups,
    Students,
    Marks
}