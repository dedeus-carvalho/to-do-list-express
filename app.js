const express = require('express');
const path = require('path');


const rotaChecklist = require('./src/rotas/checklist');
const rootRouter = require('./src/rotas/index');
require("./config/database");


const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use("/", rootRouter);
app.use("/checklist", rotaChecklist);

app.listen(3000, () => {
    console.log("Servidor iniciado!")
});