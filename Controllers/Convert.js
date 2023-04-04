const ConvertService = require('../Services/Convert')
const CurrencyRepositoryRedisInstance = require('../Repository/CurrencyRepositoryRedis')

module.exports.callConvert = async (req, res) => {
    let convertService = new ConvertService(CurrencyRepositoryRedisInstance)
    let result = await convertService.convert(req, res)

    if (result == undefined) {
        res.status(404).send('0')
    }
    else {
        res.status(200).send({data: {result}})
    }
}