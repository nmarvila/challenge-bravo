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
        const defaultRatesExists = await redis.exists('default-rates')
        if (defaultRatesExists == 0) await this.loadRates()
        const rateDefault = await redis.hGet('default-rates', this.getRateCode(from, to))
        const rateCustom = await redis.hGet('custom-rates', this.getRateCode(from, to))
        if (rateCustom != undefined) return rateCustom
        return rateDefault
    }

    setRate = async (from, to, rate, isCustomRate) => {
        const rateDefault = await redis.hGet('default-rates', this.getRateCode(from, to))
        if (isCustomRate && rateDefault == undefined) {
            await redis.hSet('custom-rates', this.getRateCode(from, to), `${rate}`)
        } else {
            await redis.hSet('default-rates', this.getRateCode(from, to), `${rate}`)
        }
    }

    deleteRate = async (from, to) => {
        await redis.hDel('default-rates', this.getRateCode(from, to))
        await redis.hDel('custom-rates', this.getRateCode(from, to))
    }

    loadRates = async () => {
        const defaultCurrencies = ['USD-BRL','USD-EUR','BTC-USD','ETH-USD','BRL-EUR','BTC-BRL','ETH-BRL','BTC-EUR','ETH-EUR']
        const rates = await ratesService.getRates(defaultCurrencies)
        rates.forEach(rate => {
            this.setRate(rate.from, rate.to, rate.rate, false)
        });
        redis.expire('default-rates', CURRENCY_RATES_EXPIRY_TIME_SECONDS)
    }

    getRates = async () => {
        const defaultRates = await redis.hGetAll('default-rates')
        const customRates = await redis.hGetAll('custom-rates')
        let result = []
        Object.entries(defaultRates).forEach(rate => {
            const codes = rate[0].split('-')
            result.push({from: codes[0], to: codes[1], rate: rate[1]})
        });
        Object.entries(customRates).forEach(rate => {
            const codes = rate[0].split('-')
            result.push({from: codes[0], to: codes[1], rate: rate[1]})
        });
        return result
    }
}

const CurrencyRepositoryRedisInstance = new CurrencyRepositoryRedis()

Object.freeze(CurrencyRepositoryRedisInstance)

module.exports = CurrencyRepositoryRedisInstance