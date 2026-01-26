import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
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
    <TodoApp />
    {/* <ListVisualizer /> */}
    {/* <C1 /> */}
  </StrictMode>
);

// console.log("hello world!");
