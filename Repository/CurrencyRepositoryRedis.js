const CurrencyRepository = require('./CurrencyRepository')
const Currency = require('../Model/Currency')
const redis = require('redis')

const client = redis.createClient({
    host: 'localhost',
    port: 6379,
});

client.connect();
  
client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
});

class CurrencyRepositoryRedis extends CurrencyRepository {
    constructor() {
        super()
    }

    getRate = (from, to) => {
        return client.hGet(`${from}${to}`, rate)
    }

    setRate = (from, to, rate) => {
        client.hSet(`${from}${to}`, `rate`, `${rate}`)
    }

    deleteRate = (from, to) => {
        client.hDel(`${from}${to}`)
    }
}

const CurrencyRepositoryRedisInstance = new CurrencyRepositoryRedis()

Object.freeze(CurrencyRepositoryRedisInstance)

module.exports = CurrencyRepositoryRedisInstance