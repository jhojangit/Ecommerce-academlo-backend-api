const { getAll, create, getOne, remove, update, login } = require('../controllers/user.controllers');
const express = require('express');
const verifyJWT = require('../utils/VERIFYjwt.JS');

const userRouter = express.Router();

userRouter.route('/')
    .get(getAll)
    .post(create);

    
userRouter.route('/login')
    .post(login)


userRouter.route('/:id')
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = userRouter;