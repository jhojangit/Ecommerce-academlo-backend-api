const request = require('supertest')
const app = require('../app')
require('../models')


let id;
let token;


beforeAll( async () => {
    const body = {
        email: "correoo@gmail.com.(TEST)",
        password: "123456(TEST)"
    }
    const res = await request(app).post('/users/login').send(body)
    token = res.body.token
})



test("GET /category debe retornar status 200 y traer todos los usuarios", async ()=> {
    const res = await request(app).get('/categories')
    expect(res.status).toBe(200)
})



test("POST /category debe crear un usuario", async ()=> {
    const body = {name: "Chanclas"}

    const res = await request(app)
        .post('/categories')
        .send(body)
        .set('Authorization', `Bearer ${token}`)

    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(body.name)
    expect(res.body.id).toBeDefined()
})



test("POST /category debe borrar un usuario", async ()=> {
    const res = await request(app)
        .delete(`/categories/${id}`)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
})
