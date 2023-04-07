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