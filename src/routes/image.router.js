const { getAll, create, remove } = require('../controllers/image.controllers');
const express = require('express');
const upload = require('../utils/multer');
const verifyJWT = require('../utils/VERIFYjwt.JS');


const imageRouter = express.Router();

imageRouter.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, upload.single('image'), create)

imageRouter.route('/:id')
    .delete(verifyJWT, remove)


module.exports = imageRouter;