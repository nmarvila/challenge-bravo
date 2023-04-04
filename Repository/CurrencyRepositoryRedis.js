const RatesService = require('../Services/Rates')
const CurrencyRepository = require('./CurrencyRepository')
const redis = require('../Services/Redis')

const ratesService = new RatesService()

class CurrencyRepositoryRedis extends CurrencyRepository {
    constructor() {
        super()
        this.loadRates()
    }

    getRate = async (from, to) => {
        let rate = await redis.hGet('rates', `${from}-${to}`)
        return rate
    }

    setRate = (from, to, rate) => {
        redis.hSet('rates', `${from}-${to}`, `${rate}`)
    }

    deleteRate = (from, to) => {
        redis.hDel('rates', `${from}-${to}`)
    }

    loadRates = async () => {
        let currencies = ['USD-BRL','USD-EUR','BTC-USD','ETH-USD','BRL-EUR','BTC-BRL','ETH-BRL','BTC-EUR','ETH-EUR']
        let rates = await ratesService.getRates(currencies)
        rates.forEach(rate => {
            this.setRate(rate.from, rate.to, rate.rate)
        });
    }
}

const CurrencyRepositoryRedisInstance = new CurrencyRepositoryRedis()

Object.freeze(CurrencyRepositoryRedisInstance)

module.exports = CurrencyRepositoryRedisInstance