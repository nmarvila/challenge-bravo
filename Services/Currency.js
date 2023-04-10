class CurrencyService {
    constructor(currencyRepository) {
        this.currencyRepository = currencyRepository
    }

    set = async (req, res) => {
        let from = req.query.from
        let to = req.query.to
        let rate = req.query.rate

        await this.currencyRepository.setRate(from, to, rate)
        return 'OK'
    }

    delete = async (req, res) => {
        let from = req.query.from
        let to = req.query.to

        await this.currencyRepository.deleteRate(from, to)
        return 'OK'
    }

    get = async (req, res) => {
        let from = req.query.from
        let to = req.query.to

        if (from != undefined && to != undefined) {
            let rate = await this.currencyRepository.getRate(from, to)
            return rate
        } else {
            let rates = await this.currencyRepository.getRates()
            return rates
        }
    }
}

module.exports = CurrencyService