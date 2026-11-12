import type { Todo } from "./Todo";

export const getTodos = async () => {
    const response = await fetch(
  "https://jsonplaceholder.typicode.com/todos?_limit=10"
);

    if (!response.ok) {
    throw new Error("Ошибка загрузки задач");
}

    const data: Todo[] = await response.json();

    return data;
};

export const addTodo = async (title: string) => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        completed: false,
        userId: 1,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Ошибка добавления задачи");
  }

  const data: Todo = await response.json();

  return data;
}

export const updateTodo = async (
  id: number,
  completed: boolean
): Promise<Todo> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Ошибка изменения задачи");
  }

  const data: Todo = await response.json();

  return data;
}