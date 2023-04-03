const axios = require('axios')

module.exports.convert = (req, res) => {
    let from = req.query.from
    let to = req.query.to
    let amount = req.query.amount

    axios.get(`https://economia.awesomeapi.com.br/last/${from}-${to}`)
    .then(response => {
      res.json(amount * response.data[`${from}${to}`].ask);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Error retrieving data from API');
    })
}