const express = require('express')
const router = express.Router()
const currencyController = require('../Controllers/Currency')

router.post('/', (req, res) => { currencyController.callCurrency(req, res, 'set') })
router.delete('/', (req, res) => { currencyController.callCurrency(req, res, 'delete') })
router.get('/', (req, res) => { currencyController.callCurrency(req, res, 'get') })

module.exports = router