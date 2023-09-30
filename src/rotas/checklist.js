const express = require("express");

const rotas = express.Router();

rotas.get("/",(req, res)=>{
    console.log('estou no checklist')
    res.send()
});

rotas.post("/",(req,res)=>{
    console.log(req.body)
    res.status(200).send(req.body)
});

module.exports = rotas;