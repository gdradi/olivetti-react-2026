import { useState } from "react";

interface Point {
  readonly x: number;
  readonly y: number;
}

export function Point() {
  const initialPoint: Point = { x: 0, y: 0 };
  const [point, setPoint] = useState(initialPoint);
  return (
    <div
      style={{
        border: "1px dashed #CCCCCC",
        padding: 8,
        margin: 4,
      }}
    >
      <div>
        X:{" "}
        <input
          type="number"
          onChange={(ev) => {
            // NB: se lo stato è di un tipo per riferimento,
            // non si deve mutare direttamente lo stato precedente
            // ma va creato un nuovo stato
            const x = Number(ev.target.value);
            const newPoint: Point = {
              x: x,
              y: point.y,
            };
            setPoint(newPoint);
          }}
        />
      </div>
      <div>
        Y:{" "}
        <input
          type="number"
          onChange={(ev) => {
            // Utilizzo lo spread operator per
            // costruire un nuovo punto che ha gli stessi
            // valori di point ma con la proprietà y diversa
            setPoint({
              ...point,
              y: Number(ev.target.value),
            });
          }}
        />
      </div>
      <div>
        Punto: ({point.x}, {point.y})
      </div>
    </div>
  );
}
