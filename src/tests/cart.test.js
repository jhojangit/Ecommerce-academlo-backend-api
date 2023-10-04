const app = require('../app')
const request = require('supertest');
const { post } = require('../routes');
require('../models')

let token;
let id;

beforeAll( async () => {
    const body = {
        email: "correoo@gmail.com.(TEST)",
        password: "123456(TEST)"
    }
    const res = await request(app).post('/users/login').send(body)
    token = res.body.token
})




test('GET /cart Trae cart', async () => {
    const res = await request(app)
        .get(`/cart`)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
})


test('POST  /cart ', async () => {
    const body = {quantity: 5}
    const res = await request(app)
    .post('/cart')
    .send(body)
    .set('Authorization', `Bearer ${token}`)

    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()
})


test('DELETE /cart/:id', async () => {
    const res = await request(app)
        .delete(`/cart/${id}`)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
})