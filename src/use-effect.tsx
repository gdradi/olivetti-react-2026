import { useEffect, useState } from "react";
import { C3 } from "./state-lift";

export function CountersWithEffect() {
  const [n1, setN1] = useState(0);
  const [n2, setN2] = useState(0);

  /**
   * Come si legge questo useEffect:
   *
   * "se almeno 1 tra n2 e n1 cambia, esegui la funzione in input"
   *
   * NB: la funzione viene in ogni caso eseguita al mount del componente
   */
  useEffect(() => {
    console.log("ciao");
  }, [n2, n1]);

  useEffect(() => {
    console.log("useeffect senza dipendenze");
  }, []);

  return (
    <div>
      <div>
        N1: {n1}{" "}
        <button
          onClick={() => {
            setN1(n1 + 1);
          }}
        >
          inc n1
        </button>
      </div>
      <div>
        N2: {n2}{" "}
        <button
          onClick={() => {
            setN2(n2 + 1);
          }}
        >
          inc n2
        </button>
        <button
          onClick={() => {
            setN2(n2 - 1);
          }}
        >
          dec n2
        </button>
        {n2 > 3 && <C3 x={n2} />}
      </div>
    </div>
  );
}
