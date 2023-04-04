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
}

module.exports = CurrencyService