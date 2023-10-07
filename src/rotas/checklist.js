const express = require("express");

const rotas = express.Router();
const Checklist = require('../model/checklist')

rotas.get("/", async(req, res)=>{
    try {
        let checklist = await Checklist.find({});
        res.status(200).render('checklists/index',{checklist: checklist})
    } catch (error) {
        res.status(422).render('pages/error',{error: 'Erro ao exibir as listas'})
    }
});

rotas.get("/:id", async(req, res)=>{
    try {
        let checklist = await Checklist.findById(req.params.id)
        res.status(200).render('checklists/show',{checklist: checklist})
    } catch (error) {
        res.status(422).render('pages/error',  {error: 'erro ao acessar esse usuario'})
    }
});

rotas.post("/", async(req,res)=>{
    let {nome} = req.body;

    try {
      let checklist = await Checklist.create({nome})
      res.status(200).json(checklist)
    } catch (error) {
        res.status(422).json(error)
    }
    
});

rotas.put("/:id", async(req, res)=>{
    let {nome} = req.body
    try {
        let checklist = await Checklist.findByIdAndUpdate(req.params.id, {nome}, {new: true});
        res.status(200).json(checklist)
    } catch (error) {
        res.status(422).json(error)   
    }
})

rotas.delete("/:id", async(req,res)=>{
    try {
        let checklist = await Checklist.findByIdAndRemove(req.params.id)
        res.status(200).json(checklist)
    } catch (error) {
        res.status(422).json(error)
    }
})

module.exports = rotas;