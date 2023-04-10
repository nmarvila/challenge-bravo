const axios = require('axios')
const Currency = require('../Model/Currency')

class RatesService {
    getRates = async (currencies) => {
        const url = `https://economia.awesomeapi.com.br/last/${currencies.join(',')}`
        const result = await axios.get(url)
        let rates = []

        Object.entries(result.data).forEach(rate => {
            const rateValue = Number.parseFloat(rate[1].ask).toFixed(10)
            const reverseRateValue = (1 / rate[1].ask).toFixed(10)
            rates.push(new Currency(rate[1].code, rate[1].codein, rateValue))
            rates.push(new Currency(rate[1].codein, rate[1].code, reverseRateValue))
        });

        const BTCUSDRateValue = Number.parseFloat(rates.find(({from, to}) => from === 'BTC' && to === 'USD').rate)
        const ETHUSDRateValue = Number.parseFloat(rates.find(({from, to}) => from === 'ETH' && to === 'USD').rate)
        const BTCETHRateValue = (BTCUSDRateValue / ETHUSDRateValue).toFixed(10)
        const ETHBTCRateValue = (ETHUSDRateValue / BTCUSDRateValue).toFixed(10)
        
        rates.push(new Currency('BTC', 'ETH', BTCETHRateValue))
        rates.push(new Currency('ETH', 'BTC', ETHBTCRateValue))

        return rates
    }
}

module.exports = RatesService