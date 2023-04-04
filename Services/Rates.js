const axios = require('axios')
const Currency = require('../Model/Currency')

class RatesService {
    getRates = async (currencies) => {
        let url = `https://economia.awesomeapi.com.br/last/${currencies.join(',')}`
        let result = await axios.get(url)
        let rates = []

        Object.entries(result.data).forEach(rate => {
            rates.push(new Currency(rate[1].code, rate[1].codein, Number.parseFloat(rate[1].ask).toFixed(10)))
            rates.push(new Currency(rate[1].codein, rate[1].code, (1 / rate[1].ask).toFixed(10)))
        });

        let rateBTCUSD = Number.parseFloat(rates.find(({from, to}) => from === 'BTC' && to === 'USD').rate)
        let rateETHUSD = Number.parseFloat(rates.find(({from, to}) => from === 'ETH' && to === 'USD').rate)

        rates.push(new Currency('BTC', 'ETH', (rateBTCUSD / rateETHUSD).toFixed(10)))
        rates.push(new Currency('ETH', 'BTC', (rateETHUSD / rateBTCUSD).toFixed(10)))

        rates.sort((a, b) => a.from.localeCompare(b.from))
        console.log(rates)
        return rates
    }
}

module.exports = RatesService