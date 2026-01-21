import { useEffect, useState } from "react";

interface C4Props {
  readonly x: number;
  readonly setX: (newX: number) => void;
}
function C4(props: C4Props) {
  const { x, setX } = props;
  return (
    <div
      style={{
        border: "1px dashed #CCCCCC",
        padding: 8,
        margin: 4,
      }}
    >
      <h2>C4</h2>
      <div>X: {x}</div>
      <button
        onClick={() => {
          setX(x + 1);
        }}
      >
        incrementa
      </button>
    </div>
  );
}

interface C3Props {
  readonly x: number;
}
export function C3(props: C3Props) {
  const { x } = props;

  /**
   * useEffect con array vuoto di dipendenze
   * esegue la funzione passata in input solo al montaggio del componente
   *
   * Se specificate una funzione in return, allora questa funzione viene invocata
   * all'unmount
   */
  useEffect(() => {
    console.log("mount c3");
    return () => {
      console.log("unmount c3");
    };
  }, []);

  return (
    <div
      style={{
        border: "1px dashed #CCCCCC",
        padding: 8,
        margin: 4,
      }}
    >
      <h2>C3</h2>
      <div>X: {x}</div>
    </div>
  );
}

interface C2Props {
  readonly x: number;
}
function C2(props: C2Props) {
  const { x } = props;
  return (
    <div
      style={{
        border: "1px dashed #CCCCCC",
        padding: 8,
        margin: 4,
      }}
    >
      <h2>C2</h2>
      <C3 x={x} />
    </div>
  );
}

export function C1() {
  const [x, setX] = useState(0);
  return (
    <div
      style={{
        border: "1px dashed #CCCCCC",
        padding: 8,
        margin: 4,
      }}
    >
      <h2>C1</h2>
      <C2 x={x} />
      <C4 x={x} setX={setX} />
    </div>
  );
}
