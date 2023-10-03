const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1", {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('banco conectado com sucesso')
}).catch((err)=>{console.error(err)})