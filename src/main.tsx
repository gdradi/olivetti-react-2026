import { ConfigProvider } from "antd";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { fetchTodos } from "./apis/fetch-todos";
import "./index.css";
import { TodoApp } from "./todoapp";
// import "./lezione1";
// import "./lezione2";

// Questo è il nodo del DOM radice, quindi quello all'interno del quale
// verrà montato (caricato, inizializzato) il componente React radice della nostra applicazione.
// Il ! serve a dire a TypeScript che siamo sicuri che l'elemento esista nel DOM.
const rootDomNode = document.getElementById("root")!;

createRoot(rootDomNode).render(
  <StrictMode>
    {/* <App /> */}
    {/* <HelloWorld /> */}
    {/* <Point /> */}
    {/* <Counter />
    <Counter />
    <Counter />
    <Counter />
    <Counter />
    <Counter /> */}
    {/* <Input /> */}
    {/* <CountersWithEffect /> */}
    {/* <TicTacToe /> */}
    {/* <TodoApp /> */}
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00b96b",
          borderRadius: 2,
        },
      }}
    >
      <TodoApp />
    </ConfigProvider>

    {/* <TodoList /> */}
    {/* <ListVisualizer /> */}
    {/* <C1 /> */}
  </StrictMode>
);

// console.log("hello world!");

console.log("1");
try {
  const data = await fetchTodos();
  console.log(data);
} catch (e) {
  // TODO cosa faccio?
  console.error(e);
}

console.log("2");
