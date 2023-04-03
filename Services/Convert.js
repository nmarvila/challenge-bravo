const axios = require('axios')

module.exports.convert = async (req, res) => {
    let from = req.query.from
    let to = req.query.to
    let amount = req.query.amount
    let url = 'https://economia.awesomeapi.com.br/last/'

    if (to == 'BTC' || to == 'ETH') {
        url = `${url}${to}-${from}`
        let rate = await axios.get(url)
        let result = amount * (1 / rate.data[`${to}${from}`].ask)
        return result
    } else {
        url = `${url}${from}-${to}`
        let rate = await axios.get(url)
        let result = rate.data[`${from}${to}`].ask * amount
        return result
    }
}