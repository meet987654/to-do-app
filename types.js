const zod=require("zod")

const createTodo=zod.object({
    title:string(),
    description:string()
})
const updateTodo=zod.object({
    id:zod.string(),
})

module.exports={
    createTodo:createTodo,
    updateTodo:updateTodo
}