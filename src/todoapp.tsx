import { useState } from "react";

interface Task {
  readonly text: string;
}

export function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <div className="box">
      <h2>TodoApp</h2>
      {tasks.map((task, index) => (
        <div key={index}>
          {index + 1}. {task.text}
        </div>
      ))}
      <CreateTask
        onClick={(task) => {
          const newList = tasks.concat(task);
          setTasks(newList);
        }}
      />
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
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(ev) => {
          if (ev.code === "Enter") {
            // TODO
          }
        }}
      />
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
