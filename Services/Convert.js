class ConvertService {
    constructor(currencyRepository) {
        this.currencyRepository = currencyRepository
    }

    convert = async (req, res) => {
        const from = req.query.from
        const to = req.query.to
        const amount = req.query.amount

        const rate = await this.currencyRepository.getRate(from, to)
        if (rate > 0) {
            const result = amount * rate
            return result
        } else {
            return undefined
        }
    }
}

module.exports = ConvertService