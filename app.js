const express = require('express')
const rotaChecklist = require('./src/rotas/checklist')
const app = express();
app.use(express.json())
require("./config/database")
//require("./config/mongo")


app.use("/checklist", rotaChecklist)

app.listen(3000, () => {
    console.log("Servidor iniciado!")
})