import { useState } from "react";

interface Task {
  readonly text: string;
  readonly isCompleted: boolean;
}

export function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  return (
    <div className="box">
      <h2>TodoApp</h2>
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
