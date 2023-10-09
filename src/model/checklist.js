const mogoose = require('mongoose')

const checklistSchema = mogoose.Schema({
    nome: {type: String, require: true},
    task: [{type: mogoose.Schema.Types.ObjectId, ref: 'Task'}]
})

module.exports = mogoose.model('Checklist', checklistSchema)