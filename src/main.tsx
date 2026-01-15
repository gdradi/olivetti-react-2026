import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ListVisualizer } from "./components";
import "./index.css";
// import "./lezione1";
// import "./lezione2";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    {/* <HelloWorld /> */}
    <ListVisualizer />
  </StrictMode>
);

// console.log("hello world!");
