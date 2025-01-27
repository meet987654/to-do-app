const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://admin:tGJ6lHf0EA0B9aQj@cluster0.pr6f0.mongodb.net/to-do-app")

const todoSchema=mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
})

const Todo=mongoose.model('todos',todoSchema);
module.exports = { Todo }