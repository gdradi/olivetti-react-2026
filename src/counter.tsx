import { useState } from "react";

export function Counter() {
  const [value, setValue] = useState(0);

  return (
    <div
      style={{
        border: "1px dashed #CCCCCC",
        padding: 8,
        margin: 4,
      }}
    >
      <div>
        Valore del contatore: <span>{value}</span>
      </div>
      <div>
        <button
          onClick={() => {
            console.log("clicked!");
            // setValue con valore puntuale:
            // imposta lo stato a quell'esatto valore
            setValue(value + 1);
            setValue(value + 1);
            // se viene fatto più volte, in entrambe setta lo stesso valore
            // setValue(1);
            // setValue(1);

            // setValue con funzione aggiornamento parziale
            // considera eventuali variazioni già applicate precedentemente
            setValue((x) => x + 1);
            setValue((x) => x + 1);
            // in questo caso lo stato aumenta di 2 a ogni click
          }}
        >
          Incrementa
        </button>
      </div>
    </div>
  );
}
