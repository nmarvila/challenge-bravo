const CurrencyService = require('../Services/Currency')
const CurrencyRepositoryRedisInstance = require('../Repository/CurrencyRepositoryRedis')
const currencyService = new CurrencyService(CurrencyRepositoryRedisInstance)

module.exports.callCurrency = async (req, res, method) => {
    const result = await currencyService[`${method}`](req, res)

    if (result == undefined) {
        res.status(404).send('0')
    } else {
        res.status(200).send({data: {result}})
    }
    req.connection.destroy()
}