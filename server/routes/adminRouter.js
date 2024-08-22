const Router = require('express')
const router = new Router()
const adminController = require('../controllers/adminController')

router.post('/addGroup', adminController.addGroup)
router.post('/deleteGroup',adminController.deleteGroup)
router.post('/getMarks',adminController.getMarks)

module.exports = router