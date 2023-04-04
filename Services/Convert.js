class ConvertService {
    constructor(currencyRepository) {
        this.currencyRepository = currencyRepository
    }

    convert = async (req, res) => {
        let from = req.query.from
        let to = req.query.to
        let amount = req.query.amount

        let rate = await this.currencyRepository.getRate(from, to)
        let result = amount * rate
        return result
    }
}

module.exports = ConvertService