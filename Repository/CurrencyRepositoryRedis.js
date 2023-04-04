const RatesService = require('../Services/Rates')
const CurrencyRepository = require('./CurrencyRepository')
const Currency = require('../Model/Currency')
const redis = require('../Services/Redis')

const ratesService = new RatesService()

class CurrencyRepositoryRedis extends CurrencyRepository {
    constructor() {
        super()
    }

    getRate = (from, to) => {
        return redis.hGet(`${from}${to}`, rate)
    }

    setRate = (from, to, rate) => {
        let currency = new Currency(from, to, rate)
        redis.hSet(`rates`, `${from}-${to}`, `${currency}`)
    }

    deleteRate = (from, to) => {
        redis.hDel(`${from}${to}`)
    }

    loadRates = () => {
        let currencies = ['USD-BRL','USD-EUR','BTC-USD','ETH-USD','BRL-EUR','BTC-BRL','ETH-BRL','BTC-EUR','ETH-EUR']
        ratesService.getRates(currencies)
    }
}

const CurrencyRepositoryRedisInstance = new CurrencyRepositoryRedis()

Object.freeze(CurrencyRepositoryRedisInstance)

module.exports = CurrencyRepositoryRedisInstance