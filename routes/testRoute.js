const express=require('express')
const { testController } = require('../controllers/testController')

//router object

const router = express.Router()

//routes(get | post | delete| update

router.get('/test-user',testController)


//export(it is used to use this in any file  )
module.exports =router