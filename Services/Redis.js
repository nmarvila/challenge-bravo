const redis = require('redis')
const client = redis.createClient({
    url: 'redis://localhost:6379'
});

client.connect();
  
client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
});

module.exports = client