import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "../api/todosApi";
import type { Todo } from "../api/Todo";

export const TodoItem = ({ todo }: { todo: Todo }) => {
  const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: ({ id, completed }: 
    { id: number; completed: boolean }) =>
    updateTodo(id, completed),

    onSuccess: (updatedTodo) => {

      queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) => {
      return oldTodos?.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
  );
});

    }
});


  return (
  <div className="todo-item">
    <h3 className={todo.completed ? "completed" : ""}>
      {todo.title}
    </h3>

    <input
      type="checkbox"
      checked={todo.completed}
      disabled={mutation.isPending}
      onChange={(e) => {
        mutation.mutate({
          id: todo.id,
          completed: e.target.checked,
        });}}/>
        
    {mutation.isError && (
      <p className="todo-error">{mutation.error.message}</p>
    )}
  </div>
)
}
