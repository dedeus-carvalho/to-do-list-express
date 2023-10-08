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

rotas.get('/new', async (req, res)=>{
    try {
        let checklist = new Checklist()
        res.status(200).render('checklists/new',{checklist:checklist})
    } catch (error) {
        res.status(500).render('pages/error', {errors: 'Erro ao carregar o formulario'})
    }
})

rotas.get('/:id/edit', async (req, res)=>{
    try {
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklists/edit', {checklist:checklist})
    } catch (error) {
        res.status(500).render('pages/error', {errors: 'Erro ao carregar a edição de lista de Tarefas'})
    }
})

rotas.post("/", async(req,res)=>{
    let {nome} = req.body.checklist;
    let checklist = new Checklist({nome})
    try {
      await checklist.save()  
      res.redirect('checklist')
    } catch (error) {
        res.status(422).render('checklists/new',{checklist:{...checklist, error}})
    }
    
});

rotas.put("/:id", async(req, res)=>{
    let {nome} = req.body.Checklist
    let checklist = await Checklist.findById(req.params.id)
    try {
        await checklist.Update({nome});
        res.redirect('/checklists')
    } catch (error) {
        let errors = error.errors;
        res.status(422).render('checklist/edit', {checklist:{...checklist, errors}}) 
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