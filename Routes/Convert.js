const express = require('express')
const router = express.Router()
const convertController = require('../Controllers/Convert')

router.get('/', convertController.convert)

module.exports = router