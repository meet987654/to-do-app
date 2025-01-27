import { useState, useEffect } from "react";
import { CreateTodo } from "./components/CreateTodo";
import { TodoList } from "./components/Todo";

function App() {
    const [todos, setTodos] = useState([]);

    const fetchTodos = async () => {
        try {
            const response = await fetch("http://localhost:3000/todos");
            if (response.ok) {
                const data = await response.json();
                setTodos(data.todos);
            }
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div>
            <CreateTodo refreshTodos={fetchTodos} />
            <TodoList todos={todos} refreshTodos={fetchTodos} />
        </div>
    );
}

export default App;
