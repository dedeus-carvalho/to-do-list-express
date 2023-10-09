const express = require('express');
const path = require('path');
const methodoverrid = require('method-override');


const rotaChecklist = require('./src/rotas/checklist');
const rotaTask = require("./src/rotas/task")
const rootRouter = require('./src/rotas/index');
require("./config/database");


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodoverrid('_method', {methods:['POST', 'GET']}));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use("/", rootRouter);
app.use("/checklist", rotaChecklist);
app.use("/checklist", rotaTask.checkListDependent);
app.use("/task", rotaTask.simples)

app.listen(3000, () => {
    console.log("Servidor iniciado!")
});