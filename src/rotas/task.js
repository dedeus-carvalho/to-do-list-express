const express = require("express");

const checkListDependentRota = express.Router();
const rotaSimples = express.Router();

const Checklist = require('../model/checklist')
const Task = require('../model/task');
const task = require("../model/task");


checkListDependentRota.get('/:id/tasks/new', async(req, res)=>{
    try {
        let task = await new Task();
        res.status(200).render('tasks/new',{checklistId: req.params.id, task:task})
    } catch (error) {
        res.status(422).render('pages/error',{errors:'erro ao criar nova tarefa'})
    }
})

checkListDependentRota.post("/:id/tasks", async(req, res)=>{
    let {nome} = req.body.task;
    let task = new Task({nome, checklist: req.params.id});
    try {
        await task.save();
        let checklist = await Checklist.findById(req.params.id)
        checklist.task.push(task);
        await checklist.save();
        res.redirect('/checklist')
    } catch (error) {
        let errors = error.errors
        res.status(422).render('tasks/new',{task: {...task,errors}, checklistId: req.params.id})
    }
})

rotaSimples.delete("/:id", async (req, res)=>{
    try {
        let task = await Task.findByIdAndDelete(req.params.id);
        let checklist = await Checklist.findById(task.checklist);
        let taskToRemove = checklist.task.indexOf(task._id);
        checklist.task.splice(taskToRemove, 1);
        checklist.save();
        res.redirect(`/checklist/${checklist._id}`)
    } catch (error) {
        res.status(422).render('pages/error',{error:'erro ao remover uma tarefa'})
    }
})

module.exports = {
    checkListDependent: checkListDependentRota,
    simples: rotaSimples
}