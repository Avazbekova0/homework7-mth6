import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo  } from "../api/todosApi";
import type { Todo } from "../api/Todo";

export const TodoForm = () => {
  const [title, setTitle] = useState("");

  const queryClient = useQueryClient();

 const mutation = useMutation({
  mutationFn: addTodo ,

  onSuccess: (newTodo) => {
    setTitle("");

    queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) => {
    return [...(oldTodos ?? []), newTodo];
    });
  },
});

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!title.trim()) return;

  mutation.mutate(title.trim());
}

  return (
  <form className="todo-form" onSubmit={handleSubmit}>
    <input
      className="todo-input"
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Добавить новую задачу..."/>

    {mutation.isError && (
      <p>{mutation.error.message}</p>
    )}

    <button
      className="todo-button"
      type="submit"
      disabled={mutation.isPending}>

      {mutation.isPending ? "Добавление..." : "Добавить"}
    </button>
  </form>
)
}