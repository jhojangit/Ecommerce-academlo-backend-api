const { getAll, create } = require('../controllers/purchase.controllers');
const express = require('express');
const verifyJWT = require('../utils/VERIFYjwt.JS');


const purchaseRouter = express.Router();

purchaseRouter.route('/')
    .get(verifyJWT , getAll)
    .post(verifyJWT, create)

module.exports = purchaseRouter;