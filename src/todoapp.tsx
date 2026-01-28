import { useState } from "react";

interface Task {
  readonly text: string;
}

export function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  return (
    <div className="box">
      <h2>TodoApp</h2>
      {tasks.map((task, index) => (
        <div key={index}>
          {index + 1}. {task.text}
          <button
            onClick={() => {
              const tasksWithoutThisTask = tasks.filter((task, i) => i !== index);
              setTasks(tasksWithoutThisTask);
            }}
          >
            Elimina
          </button>
          <button
            onClick={() => {
              setEditingIndex(index);
            }}
          >
            Modifica
          </button>
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
          const newTask: Task = { text: text };
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
  return (
    <div className="box">
      <div style={{ fontWeight: "bold" }}>UpdateTask</div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button
        onClick={() => {
          const newTask: Task = { text: text };
          onTaskUpdated(newTask);
          setText("");
        }}
      >
        Update
      </button>
    </div>
  );
}
