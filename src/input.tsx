import { useState } from "react";

export function Input() {
  const [text, setText] = useState("");
  return (
    <div
      style={{
        border: "1px dashed #CCCCCC",
        padding: 8,
        margin: 4,
      }}
    >
      <input
        type="text"
        style={{
          width: 140,
        }}
        onChange={(ev) => {
          const partialText = ev.target.value;
          console.log(partialText);
          setText(partialText);
        }}
      />
      <div>
        Testo digitato: <span>{text}</span>
      </div>
    </div>
  );
}
