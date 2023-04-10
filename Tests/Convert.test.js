const request = require('supertest')
const url = 'http://localhost:3000'

test('tests /convert endpoint with valid conversion rate', async () => {
    const response = await request(url).get('/convert?from=USD&to=BRL&amount=1')
    const responseValue = JSON.parse(response.text).data.result
    expect(response).not.toEqual(null)
    expect(response.statusCode).toEqual(200)
    expect(responseValue).toBeGreaterThan(0)
})

test('tests /convert endpoint with invalid conversion rate', async () => {
    const response = await request(url).get('/convert?from=TEST&to=BRL&amount=1')
    expect(response).not.toEqual(null)
    expect(response.statusCode).toEqual(404)
    expect(response.text).toEqual('0')
})