class CurrencyService {
    constructor(currencyRepository) {
        this.currencyRepository = currencyRepository
    }

    set = async (req, res) => {
        const from = req.query.from
        const to = req.query.to
        const rate = req.query.rate

        await this.currencyRepository.setRate(from, to, rate)
        return 'OK'
    }

    delete = async (req, res) => {
        const from = req.query.from
        const to = req.query.to

        await this.currencyRepository.deleteRate(from, to)
        return 'OK'
    }

    get = async (req, res) => {
        const from = req.query.from
        const to = req.query.to

        if (from != undefined && to != undefined) {
            const rate = await this.currencyRepository.getRate(from, to)
            return rate
        } else {
            const rates = await this.currencyRepository.getRates()
            return rates
        }
    }
}

module.exports = CurrencyService