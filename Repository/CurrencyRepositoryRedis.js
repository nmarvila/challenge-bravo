const RatesService = require('../Services/Rates')
const CurrencyRepository = require('./CurrencyRepository')
const redis = require('../Services/Redis')

const CURRENCY_RATES_EXPIRY_TIME_SECONDS = 600

const ratesService = new RatesService()

class CurrencyRepositoryRedis extends CurrencyRepository {
    constructor() {
        super()
        this.loadRates()
    }

    getRateCode = (from, to) => { return `${from}-${to}` }

    getRate = async (from, to) => {
        const exists = await redis.exists('rates')
        if (exists == 0) {
            await this.loadRates()
        }
        const rate = await redis.hGet('rates', this.getRateCode(from, to))
        return rate
    }

    setRate = async (from, to, rate) => {
        await redis.hSet('rates', this.getRateCode(from, to), `${rate}`)
    }

    deleteRate = async (from, to) => {
        await redis.hDel('rates', this.getRateCode(from, to))
    }

    loadRates = async () => {
        const currencies = ['USD-BRL','USD-EUR','BTC-USD','ETH-USD','BRL-EUR','BTC-BRL','ETH-BRL','BTC-EUR','ETH-EUR']
        const rates = await ratesService.getRates(currencies)
        rates.forEach(rate => {
            this.setRate(rate.from, rate.to, rate.rate)
        });
        redis.expire('rates', CURRENCY_RATES_EXPIRY_TIME_SECONDS)
    }

    getRates = async () => {
        const rates = await redis.hGetAll('rates')
        let result = []
        Object.entries(rates).forEach(rate => {
            const codes = rate[0].split('-')
            result.push({from: codes[0], to: codes[1], rate: rate[1]})
        });
        return result
    }
}

const CurrencyRepositoryRedisInstance = new CurrencyRepositoryRedis()

Object.freeze(CurrencyRepositoryRedisInstance)

module.exports = CurrencyRepositoryRedisInstance