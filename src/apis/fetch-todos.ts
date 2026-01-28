import type { Task } from "../todoapp";

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
  console.log(data);
  return data;
};

export const deleteTask = async (task: Task) => {
  // Creazione di una promise
  const promise = new Promise((resolve) => {
    /**
     * Set timeout attende 2000 millisecondi e poi invoca la funzione
     * passata come primo argomento
     *
     * per completare la promise con successo, occorre invocare la funzione
     * accept passando come parametro la risposta della promise
     *
     * quindi, questa promise risponde con "true" dopo 2 secondi
     */
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
  return promise;
};
