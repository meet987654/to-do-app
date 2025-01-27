import { useState } from "react";

export function CreateTodo({ refreshTodos }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const addTodo = async () => {
        try {
            const response = await fetch("http://localhost:3000/todo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description }),
            });
            if (response.ok) {
                alert("Todo added successfully!");
                setTitle("");
                setDescription("");
                refreshTodos();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.msg}`);
            }
        } catch (error) {
            alert("Error adding Todo: " + error.message);
        }
    };

    return (
        <div>
            <input value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
            <input value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
            <button onClick={addTodo}>Add Todo</button>
        </div>
    );
}
