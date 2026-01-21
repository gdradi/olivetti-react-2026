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
        /**
         * Passando value come props,
         * stiamo decidendo noi che cosa l'input
         * deve visualizzare.
         * In questo caso si dice che l'input è
         *   completamente controllato
         *
         * Se invece non passiamo value,
         * l'input decide in autonomia che cosa visualizzare
         */
        value={text}
        onChange={(ev) => {
          // ev.target.value contiene il valore digitato
          const partialText = ev.target.value;
          console.log(partialText);
          setText(partialText);
        }}
      />
      <div>
        Testo digitato: <span>{text}</span>
      </div>
      <button
        onClick={() => {
          setText("");
        }}
      >
        X
      </button>
    </div>
  );
}
