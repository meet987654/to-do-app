export function TodoList({ todos, refreshTodos }) {
    const markAsCompleted = async (id) => {
        try {
            const response = await fetch("http://localhost:3000/completed", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            if (response.ok) {
                alert("Todo marked as completed!");
                refreshTodos();
            } else {
                alert("Error marking Todo as completed");
            }
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    return (
        <div>
            {todos.map((todo) => (
                <div key={todo._id}>
                    <h1>{todo.title}</h1>
                    <p>{todo.description}</p>
                    <button onClick={() => markAsCompleted(todo._id)}>
                        {todo.completed ? "Completed" : "Mark as Completed"}
                    </button>
                </div>
            ))}
        </div>
    );
}
