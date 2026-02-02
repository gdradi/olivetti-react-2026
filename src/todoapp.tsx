import { createContext, useContext, useEffect, useState } from "react";
import { deleteTask, fetchTodos } from "./apis/fetch-todos";

export interface Task {
  readonly text: string;
  readonly isCompleted: boolean;
}

export function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);

  // Funzione di appoggio asyncrona in cui scriviamo le nostre logiche
  const fetchTodosAndSet = async () => {
    try {
      setIsLoading(true);
      // Faccio partire la richiesta HTTP tramite la funzione fetchTodo
      const data = await fetchTodos();
      // Mappo i risultati nel modello di dati locale (Task)
      const tasksFromApi = data.todos
        .filter((t, index) => index < 10)
        .map((t) => {
          const mappedTask: Task = {
            text: t.todo,
            isCompleted: t.completed,
          };
          return mappedTask;
        });
      // Aggiorno la lista di task
      setTasks(tasksFromApi);
    } catch (error) {
      setError("Errore nel caricamento dei dati" + (error as Error).message);
    } finally {
      // Finally viene invocato sempre, sia che si completi il try con successo,
      // sia che si è entrati nel catch
      setIsLoading(false);
    }
  };

  const deleteWithApi = async (task: Task, index: number) => {
    setIsDeleting(true);
    try {
      const deleteResult = await deleteTask(task);
      const tasksWithoutThisTask = tasks.filter((task, i) => i !== index);
      setTasks(tasksWithoutThisTask);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsDeleting(false);
    }
  };

  /**
   * Useeffect con array di dipendenze vuoto ([]) significa che
   * viene eseguito solo al montaggio del componente
   */
  useEffect(() => {
    // Non si può passare una funzione async allo useEffect.
    // Quindi utilizziamo una funzione di appoggio (fetchTodosAndSet)
    fetchTodosAndSet();
  }, []);

  /**
   * Per creare un contenitore che sia invisibile nel dom, si può utilizzare
   * il fragment di react:
   *
   * <React.Fragment>
   * {...contenuto...}
   * </React.Fragment>
   *
   * anche nella sua sintassi semplificata
   *
   * <>
   * {...contenuto...}
   * </>
   */
  return (
    <>
      {/*
        Definizione dello scope (raggio d'azione) del context, 
        utilizzando il provider. 

        Dobbiamo passare come value=
        il valore del tipo del context (ContextType)

        Per poter usare il context tramite useContext,
        occorre essere all'interno dello scope di validità,
        quindi dentro TaskContext.Provider
       */}
      <TasksContext.Provider value={{ tasksAmount: tasks.length }}>
        <div className="box">
          <h2>TodoApp</h2>
          {/* Concatenazione di condizioni */}
          {/* Sto caricando? 
            => se si, mostro un messaggio di loading
            => altrimenti, c'è un errore?
              => se si, mostro il messaggio di errore
              => altrimenti, mostro la lista di task
      */}
          {isLoading === false && (
            <button
              onClick={() => {
                fetchTodosAndSet();
              }}
            >
              Ricarica
            </button>
          )}
          {isLoading === true ? (
            <div>Loading...</div>
          ) : error != null ? (
            <div>{error}</div>
          ) : (
            <div>
              {tasks.map((task, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      width: 50,
                      textAlign: "right",
                    }}
                  >
                    {index + 1}.
                  </div>
                  <div
                    style={{
                      color: task.isCompleted ? "green" : "red",
                      fontSize: 8,
                    }}
                  >
                    {task.isCompleted ? "V" : "X"}
                  </div>
                  <div
                    style={{
                      // width: 100,
                      flexGrow: 1,
                    }}
                  >
                    {task.text}
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        deleteWithApi(task, index);
                      }}
                      disabled={isDeleting}
                    >
                      Elimina
                    </button>
                    <button
                      onClick={() => {
                        setEditingIndex(index);
                      }}
                      disabled={isDeleting}
                    >
                      Modifica
                    </button>
                  </div>
                </div>
              ))}
              <CreateTask
                onClick={(task) => {
                  const newList = tasks.concat(task);
                  setTasks(newList);
                }}
              />
              {editingIndex !== null && (
                <UpdateTask
                  task={tasks[editingIndex]!}
                  onTaskUpdated={(updatedTask) => {
                    const updatedTasks = tasks.map((task, index) => (index === editingIndex ? updatedTask : task));
                    setTasks(updatedTasks);
                    setEditingIndex(null);
                  }}
                />
              )}
            </div>
          )}
        </div>
      </TasksContext.Provider>
      <TasksAmountDisplay />
    </>
  );
}

interface CreateTaskProps {
  readonly onClick: (task: Task) => void;
}
function CreateTask(props: CreateTaskProps) {
  const { onClick } = props;
  const [text, setText] = useState("");
  return (
    <div className="box">
      <div style={{ fontWeight: "bold" }}>CreateTask</div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button
        onClick={() => {
          const newTask: Task = { text: text, isCompleted: false };
          onClick(newTask);
          setText("");
        }}
      >
        Create
      </button>
    </div>
  );
}

interface EditTaskProps {
  readonly task: Task;
  readonly onTaskUpdated: (updatedTask: Task) => void;
}
function UpdateTask(props: EditTaskProps) {
  const { task, onTaskUpdated } = props;
  const [text, setText] = useState(task.text);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  return (
    <div className="box">
      <div style={{ fontWeight: "bold" }}>UpdateTask</div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <input type="checkbox" checked={isCompleted} onChange={(e) => setIsCompleted(e.target.checked)} />
      <button
        onClick={() => {
          const newTask: Task = { text: text, isCompleted: isCompleted };
          onTaskUpdated(newTask);
          setText("");
        }}
      >
        Update
      </button>
    </div>
  );
}

function TasksAmountDisplay() {
  /**
   * Recupero il context tramite l'hook useContext
   *
   * questo componente deve essere utilizzato all'interno di
   * <TasksContext.Provider>
   */
  const context = useContext(TasksContext);
  if (context == null) {
    return <div>non c'è il context</div>;
  }
  const { tasksAmount } = context;
  return <div>Tasks Amount: {tasksAmount}</div>;
}

/**
 * Interfaccia del context:
 *  serve a definire quali informazioni vogliamo rendere disponibili
 */
interface ContextType {
  tasksAmount: number;
}
/**
 * Creazione del context, di tipo ContextType o undefined
 * NB: crearlo con la lettera maiuscola
 */
const TasksContext = createContext<ContextType | undefined>(undefined);
