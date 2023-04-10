const request = require('supertest')
const url = 'http://localhost:3000'

test('tests /currency endpoint to post a new conversion rate', async () => {
    const response = await request(url).post('/currency?from=HURB&to=BRL&rate=3')
    const responseValue = JSON.parse(response.text).data.result
    expect(response).not.toEqual(null)
    expect(response.statusCode).toEqual(200)
    expect(responseValue).toEqual("OK")
})

test('tests /currency endpoint to delete a conversion rate', async () => {
    const responsePost = await request(url).post('/currency?from=HURB&to=BRL&rate=3')
    const responseDelete = await request(url).delete('/currency?from=HURB&to=BRL')
    const responsePostValue = JSON.parse(responsePost.text).data.result
    const responseDeleteValue = JSON.parse(responseDelete.text).data.result
    expect(responsePost).not.toEqual(null)
    expect(responseDelete).not.toEqual(null)
    expect(responsePost.statusCode).toEqual(200)
    expect(responseDelete.statusCode).toEqual(200)
    expect(responsePostValue).toEqual("OK")
    expect(responseDeleteValue).toEqual("OK")
})

test('test /currency endpoint to get all the available conversion rates', async () => {
    const response = await request(url).get('/currency')
    const responseValue = JSON.parse(response.text).data.result
    expect(response).not.toEqual(null)
    expect(response.statusCode).toEqual(200)
    expect(responseValue.length).toBeGreaterThan(0)
})

test('test /currency endpoint to get a specific conversion rate that exists', async () => {
    const response = await request(url).get('/currency?from=USD&to=BRL')
    const responseValue = Number.parseFloat(JSON.parse(response.text).data.result)
    expect(response).not.toEqual(null)
    expect(response.statusCode).toEqual(200)
    expect(responseValue).not.toEqual(undefined)
    expect(responseValue).toBeGreaterThan(0)
})

test('test /currency endpoint to get a specific conversion rate that doesn\'t exist', async () => {
    const response = await request(url).get('/currency?from=HURB&to=BRL')
    expect(response).not.toEqual(null)
    expect(response.statusCode).toEqual(404)
    expect(response.text).toEqual('0')
})