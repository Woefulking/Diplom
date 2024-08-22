const Router = require('express')
const router = new Router()
const exampleController = require('../controllers/exampleController')

router.post('/select', exampleController.selectAll)
router.post('/getTableData', exampleController.getTableInfo)
router.post('/selectWhere', exampleController.selectWhere)

module.exports = router