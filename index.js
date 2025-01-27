const express = require("express");
const app = express();
const { Todo } = require("./db"); // Correct model name (from db.js)
const { z } = require("zod");
const cors=require("cors");
// Middleware to parse JSON
app.use(express.json());
app.use(cors())
// Define Zod schemas
const createTodo = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
});

const updateTodo = z.object({
    id: z.string(),
});

// POST /todo: Create a new Todo
app.post("/todo", async (req, res) => {
    const createPayload = req.body;

    // Zod validation for schema
    const parsedPayload = createTodo.safeParse(createPayload);

    if (!parsedPayload.success) {
        return res.status(400).json({
            msg: "You have sent wrong inputs",
            errors: parsedPayload.error.errors,
        });
    }

    await Todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false,
    });

    res.status(201).json({
        msg: "Todo created successfully!",
    });
});

// GET /todos: Fetch all Todos
app.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json({
            todos,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Failed to fetch todos",
            error: err.message,
        });
    }
});

// PUT /completed: Mark a Todo as completed
app.put("/completed", async (req, res) => {
    const updatePayload = req.body;

    // Zod validation
    const parsedPayload = updateTodo.safeParse(updatePayload);

    if (!parsedPayload.success) {
        return res.status(400).json({
            msg: "You have sent wrong inputs",
            errors: parsedPayload.error.errors,
        });
    }

    try {
        await Todo.findByIdAndUpdate(
            updatePayload.id,
            { completed: true },
            { new: true }
        );

        res.json({
            msg: "Todo marked as completed successfully!",
        });
    } catch (err) {
        res.status(500).json({
            msg: "Failed to update the todo",
            error: err.message,
        });
    }
});

// Start the server
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});
