const app = require('../app')
const request = require('supertest')
const Category = require('../models/Category');
const Image = require('../models/Image');
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





test("POST /products debe crear un producto",  async () => {
    // const category = await Category.create({name: "Busos"})

    const body = {
        title: "Chaqueta de Lana",
        description: "Chaqueta Blanca",
        brand: "Velez",
        price: 4500,
        // categoryId: category.id
    }


    const res = await request(app)
        .post('/products')
        .send(body)
        .set('Authorization', `Bearer ${token}`);

    console.log(res.body);



    id = res.body.id

    // await category.destroy();
    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined();
    expect(res.body.headline).toBe(body.headline);
})

test("GET /products debe debolver todos los productos",  async () => {
    const res = await request(app).get('/products')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array);
})


test('POST /products/:id/images' , async()=> {
    const image = await Image.create({ 
        url: 'http://cualquiercosa.jpg', 
        publicId: 'id' 
    })
    const res = await request(app)
        .post(`/products/${id}/images`)
        .send([image.id])
        .set('Authorization', `Bearer ${token}`)

    await image.destroy();
    

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
})


test('DELETE /products/:id/images elimina una imagen' , async()=> {
    const res = await request(app)
        .delete(`/categories/${id}`)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
})


