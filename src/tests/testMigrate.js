const sequelize = require('../utils/connection');
const request = require('supertest')
const app = require('../app');
const User = require('../models/User');


const main = async () => {
    try {
        // Acciones a ejecutar antes de los tests
        sequelize.sync();

        const user = await User.findOne(({ where: { email: 'correoo@gmail.com.(TEST)' } }))
        if (!user) {
            const userTest = {
                firstName: "nombre(TEST)",
                lastName: "apellido(TEST)",
                email: "correoo@gmail.com.(TEST)",
                password: "123456(TEST)",
                phone: 123456789
            }

            await request(app).post('/users').send(userTest)
        }


        process.exit();
    } catch (error) {
        console.log(error);
    }
}

main();