const express = require('express')

const convertRoute = require('./Routes/Convert')
const currencyRoute = require('./Routes/Currency')

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Currency converter')
})

app.use('/convert', convertRoute)
app.use('/currency', currencyRoute)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})