const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login',userController.login)
router.post('/setMark', userController.setLabMark)
router.post('/getUserInfo',userController.getUserInfo)
router.post('/getAllMarks',userController.getAllMarks)
router.get('/auth', authMiddleware ,userController.check)

module.exports = router