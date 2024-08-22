const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const adminRouter = require('./adminRouter')
const exampleRouter = require('./exampleRouter')

router.use('/user', userRouter)
router.use('/admin', adminRouter)
router.use('/example', exampleRouter)


module.exports = router