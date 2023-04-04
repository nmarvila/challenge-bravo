const CurrencyService = require('../Services/Currency')
const CurrencyRepositoryRedisInstance = require('../Repository/CurrencyRepositoryRedis')
const currencyService = new CurrencyService(CurrencyRepositoryRedisInstance)

module.exports.callSet = async (req, res) => {
    let result = await currencyService.set(req, res)

    if (result == undefined) {
        res.status(404).send('0')
    }
    else {
        res.status(200).send({data: {result}})
    }
}

module.exports.callDelete = async (req, res) => {
    let result = await currencyService.delete(req, res)

    if (result == undefined) {
        res.status(404).send('0')
    }
    else {
        res.status(200).send({data: {result}})
    }
}