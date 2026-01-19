import { useState } from "react";

export function Counter() {
  // Lo stato di un componente è privato e isolato per quel componente
  // se utilizzo due <Counter />, il loro stato non è nè condiviso nè sincronizzato
  //
  // lo stato deve essere obbligatoriamente definito nel corpo della funzione,
  // non dentro degli if, delle funzioni, o qualsiasi altra cosa
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
