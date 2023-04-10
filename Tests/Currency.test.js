const request = require('supertest')
const url = 'http://localhost:3000'

test('tests /currency endpoint to post a new conversion rate', async () => {
    const response = await request(url).post('/currency?from=HURB&to=BRL&rate=3')
    expect(response).not.toEqual(null)
    expect(response.statusCode).toEqual(200)
    expect(JSON.parse(response.text).data.result).toEqual("OK")
})

test('tests /currency endpoint to delete a conversion rate', async () => {
    const responsePost = await request(url).post('/currency?from=HURB&to=BRL&rate=3')
    const responseDelete = await request(url).delete('/currency?from=HURB&to=BRL')
    expect(responsePost).not.toEqual(null)
    expect(responseDelete).not.toEqual(null)
    expect(responsePost.statusCode).toEqual(200)
    expect(responseDelete.statusCode).toEqual(200)
    expect(JSON.parse(responsePost.text).data.result).toEqual("OK")
    expect(JSON.parse(responseDelete.text).data.result).toEqual("OK")
})

test('test /currency endpoint to get all the available conversion rates', async () => {
    const response = await request(url).get('/currency')
    expect(response).not.toEqual(null)
    expect(response.statusCode).toEqual(200)
    expect(JSON.parse(response.text).data.result.length).toBeGreaterThan(0)
})

test('test /currency endpoint to get a specific conversion rate that exists', async () => {
    const response = await request(url).get('/currency?from=USD&to=BRL')
    expect(response).not.toEqual(null)
    expect(response.statusCode).toEqual(200)
    expect(JSON.parse(response.text).data.result).not.toEqual(undefined)
    expect(Number.parseFloat(JSON.parse(response.text).data.result)).toBeGreaterThan(0)
})

test('test /currency endpoint to get a specific conversion rate that doesn\'t exist', async () => {
    const response = await request(url).get('/currency?from=HURB&to=BRL')
    expect(response).not.toEqual(null)
    expect(response.statusCode).toEqual(404)
    expect(response.text).toEqual('0')
})