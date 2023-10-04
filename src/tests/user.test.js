const request = require('supertest')
const app = require('../app')
require('../models')


let id;
let token;



test('POST /users debe crear un usuario', async () => {
    const body = {
        firstName: "nombre(T",
        lastName: "apellido(T",
        email: "correoo@gmail.com.(T",
        password: "123456(T",
        phone: 123456789
    }
    const res = await request(app).post("/users").send(body);

    id = res.body.id

    expect(res.status).toBe(201);
    expect(res.body.password).toBeFalsy()
})


test('POST /users/login', async () => {
    const body = { email: "correoo@gmail.com.(TEST)", password: "123456(TEST)" }
    const res = await request(app).post(`/users/login`).send(body)
    token = res.body.token
    expect(res.status).toBe(200)
    expect(res.body.token).toBeDefined()
    expect(res.body.user).toBeDefined()
})





test('GET /users debe retornar todos los usuarios y status 200', async () => {
    const res = await request(app).get("/users").set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})




test('PUT /users debe actualizar un usuario', async () => {
    const bodyUpdate = { firstName: "nombre(TEST)" }
    const res = await request(app).put(`/users/${id}`).send(bodyUpdate).set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200)
})




test('POST /users/login con credenciales debe retornar error', async () => {
    const body = { email: "invalid@gmail.com.(TEST)", password: "invalid123456(TEST)" }
    const res = await request(app).post(`/users/login`).send(body)


    expect(res.status).toBe(401)
})



test('DELETE /users debe borrar un usuario', async () => {
    const res = await request(app).delete(`/users/${id}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
})



