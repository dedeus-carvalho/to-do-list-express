const express = require("express");

const rotas = express.Router();

rotas.get("/",(req, res)=>{
    console.log('estou no checklist')
    res.send();
})

module.exports = rotas;