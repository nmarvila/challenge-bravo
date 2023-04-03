const express = require('express')
const axios = require('axios')
const app = express()

app.get('/', function(req, res) {
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
    });
})

app.listen(3000, function() {
    console.log("Server listening on port 3000")
})