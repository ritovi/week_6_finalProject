const { getAll, create, getOne, remove, update } = require('../controllers/purchase.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');

const routerPurchase = express.Router();

routerPurchase.route('/')
    .get(verifyJwt ,getAll)
    .post(verifyJwt, create);

module.exports = routerPurchase;