const express = require('express');

const rota = express.Router();

rota.get('/', async(req, res)=>{
    res.render('pages/index')
});

module.exports = rota;