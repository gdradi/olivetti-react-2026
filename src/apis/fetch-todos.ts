export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface TodosResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

// Funzione per fetchare i todos
export const fetchTodos = async (): Promise<TodosResponse> => {
  const response = await fetch("https://dummyjson.com/todos");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: TodosResponse = await response.json();
  return data;
};
