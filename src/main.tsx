import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TicTacToe } from "./tictactoe";
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
    <TicTacToe />
    {/* <ListVisualizer /> */}
  </StrictMode>
);

// console.log("hello world!");
