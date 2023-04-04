const express = require('express')
const router = express.Router()
const currencyController = require('../Controllers/Currency')

router.post('/', currencyController.callSet)
router.delete('/', currencyController.callDelete)

module.exports = router