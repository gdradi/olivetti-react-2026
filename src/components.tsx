import type { ReactNode } from "react";

export function HelloWorld() {
  return (
    <div>
      <h1 style={{ color: "red", fontSize: "24px" }}>Hello, World!</h1>
      <h1 className="title">Hello world 2</h1>
      <div>Sottotitolo</div>
      <UserInfo name="Giacomo" surname="Rossi" />
      <UserInfo name="Luca" surname="Rossi" />
    </div>
  );
}

interface UserInfoProps {
  readonly name: string;
  readonly surname: string;
}

export function UserInfo(props: UserInfoProps) {
  const { name, surname } = props;

  // Tecnica di render condizionale con variabile di appoggio
  let var1: ReactNode = null;
  if (name.length > 5) {
    var1 = <div>nome lungo</div>;
  }

  return (
    <div>
      Ciao {name} {surname}
      {/* Tecnica di render condizionale con && */}
      {name.length < 5 && <div>nome corto</div>}
      {var1}
      {/* Render condizionale con operatore ternario */}
      <div>{surname.length === 2 ? <div>cognome di due lettere</div> : <div>cognome maggiore di due lettere</div>}</div>
    </div>
  );
}

function NumberVisualizer(props: { readonly number: number }) {
  return (
    <div>
      {props.number} {props.number % 2 === 0 ? "(pari)" : "(dispari)"}
    </div>
  );
}

export function ListVisualizer() {
  const numberList = [1, 2, 3, 4, 4];
  return (
    <div>
      {numberList
        .filter((n) => {
          return n % 2 === 0;
        })
        .map((n, index) => {
          return <NumberVisualizer number={n} key={index} />;
        })}
    </div>
  );
}
