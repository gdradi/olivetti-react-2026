//#region Interfacce per strutture dati

interface Persona {
  nome: string;
  readonly cognome: string;
  readonly eta?: number | null;
}

interface Studente extends Persona {
  readonly matricola: string;
}

let studente1: Studente = {
  nome: "Mario",
  cognome: "Rossi",
  matricola: "12345",
  eta: 20,
};
let persona1: Persona = {
  nome: "Luigi",
  cognome: "Verdi",
  eta: 30,
};

let persona2: Persona = persona1;
// Lo studente è anche una persona, quindi posso
// utilizzare uno studente come persona
let persona3: Persona = studente1;

// La persona non è per froza uno studente, l'ereditarietà
// non è bidirezionale
// let studente2: Studente = persona1;

function stampaPersona(p: Persona) {
  // Interpolazione di stringhe in javascript
  console.log(`${p.nome} ${p.cognome} - ${p.eta} anni`);
}

stampaPersona(persona1);
stampaPersona(studente1);

//#endregion

//#region Interfacce funzionali

function moltiplica(a: number, b: number) {
  return a * b;
}

function moltiplicaConCiclo(a: number, b: number) {
  let result = 0;
  for (let i = 0; i < b; i++) {
    result += a;
  }
  return result;
}

// Questa è una interfaccia funzionale:
// a e b sono i parametri in ingresso
// : number indica il tipo dell'output (return)
interface FunzioneMoltiplicazione {
  (a: number, b: number): number;
}

let f1: FunzioneMoltiplicazione = moltiplica;
let f2: FunzioneMoltiplicazione = moltiplicaConCiclo;

console.log(moltiplica(3, 4));
console.log(moltiplicaConCiclo(3, 4));

interface FunzioneStampa {
  (p: Persona): void;
}

interface PersonaConStampa {
  nome: string;
  cognome: string;
  //   stampa: FunzioneStampa;
  stampa: (p: Persona) => void;
}

//#endregion

//#region Utility

let persona4: Persona = {
  // i 3 puntini si chiamano operatore spread
  // assegna alle proprietà di persona4 i valori
  // delle proprietà di persona1
  ...persona1,
  // sovrascrive la proprietà nome
  // con un valore custom che scelgo io
  nome: "nuovo nome",
};
// è equivalente a:
let persona5: Persona = {
  nome: "nuovo nome",
  cognome: persona1.cognome,
  eta: persona1.eta,
};

console.log(persona1);
persona1.nome = "Pippo";
console.log("Persona 5", persona5);

// Deconstruct

// let cognomePersona1 = persona1.cognome;
// let cognome = persona1.cognome;
console.log(persona1.cognome);

let { cognome: cognomePersona1, nome: nomePersona1 } = persona1;
let { cognome, nome } = persona2;
console.log(nomePersona1, cognomePersona1);
console.log(cognome, nome);

// Operazioni con i booleani
let b1 = true;
let b2 = true;
let b3 = true;
let or = b1 || b2;
// La catena, se tutti i booleani sono true => vale l'ultimo elemento della catena
// se c'è almeno un booleano false => vale false
let and = b1 && b2 && b3 && "ciao";
console.log(and);

let ternario = b1 ? (b2 ? "b1 e b2 veri" : "b1 vero b2 false") : "falso";

// Funzione map
// trasforma un array in un altro, applicando
// una funzione di trasformazione
//
// l'array iniziale rimane invariato
let arrayIniziale = [2, 4, 6, 8, 10];
let arrayTrasformato = arrayIniziale.map((x) => x + 1);
console.log("arrayIniziale", arrayIniziale);
console.log("arrayTrasformato", arrayTrasformato);

// Funzione filter
// crea un nuovo array mantenendo solo quegli elementi che
// rispettano il filtro, cioè quegli elementi
// per cui la funzione filtro restituisce true
let arrayFiltrato = arrayIniziale.filter((x) => x > 5);
console.log("arrayFiltrato", arrayFiltrato);

//#endregion
