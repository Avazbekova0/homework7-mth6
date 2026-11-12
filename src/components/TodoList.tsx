import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../api/todosApi";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  if (isPending) return <div className="todo-loading">Загрузка...</div>;

  if (isError) return <div className="todo-error">{error.message}</div>;

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h2>Мои задачи</h2>
        <span>{data.length} задач</span>
      </div>

      <div className="todo-list">
        {data.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  )
}
