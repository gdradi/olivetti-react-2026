console.log("ciao da lezione1");

let num1: number = 5;
let str1: string = "ciao";
let bool1: boolean = false;

let num2: number;
num2 = 5;

let num3 = 4;
num3 = false;

let array1: number[] = [1, 2, 3, 4];
let array2: Array<number> = [2, 3, 4];
let arrayStr1 = ["a", "b", 4, "d"];
let v1: string | number = "str";

const num4 = 6;
// num4 = 7;

const array3 = [1, 2, 3];
const array4 = array3;
console.log("array3", array3);
console.log("array4", array4);
// array3 = [4, 7];
array4.push(8);
console.log("array3", array3);
console.log("array4", array4);

let number1 = 10;
const number2 = number1;
console.log("number1", number1);
console.log("number2", number2);
number1 = 30;
console.log("number1", number1);
console.log("number2", number2);

// Strict null
if (number1 === number2) {
  console.log("number1 and number2 are equal");
} else if (number1 === 10) {
  console.log("aa");
} else {
  console.log("number1 and number2 are not equal");
}

switch (number1) {
  case 1:
    console.log("1");
    break;
  default:
    console.log("default");
}

for (let i = 0; i < array1.length; i++) {
  console.log(array1[i]);
}

for (let item of arrayStr1) {
  console.log(item);
}

function sum(num1: number, num2: number) {
  const v = num1 + num2;
  return v;
}

const sum2 = (num1: number, num2: number) => {
  return num1 + num2;
};

// ? segnala un parametro come opzionale
const sum3 = function (num1: number, num2?: number | null) {
  // Se si deve intercettare sia il null che l'undefined, va bene utilizzare la comparison NON strict, quindi
  // != oppure ==
  // in tutti gli altri casi, va usata la strict (!== o ===)
  if (num2 != null) {
    return num1 + num2;
  } else {
    return num1;
  }
};

sum3(1, 2);
sum3(1, undefined);
sum3(1);
sum3(1, null);

console.log(sum(3, 4));
console.log(sum2(5, 6));
sum3(7, 8);

enum WeekDays {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

const miaVar1: WeekDays = WeekDays.Monday;
function f(p: WeekDays) {
  console.log(p);
}

// Interfacce

interface Color {
  name: string;
  value: string;
}

interface Point {
  readonly x: number;
  readonly y: number;
  readonly name: string;
  readonly opposite?: Point | null;
  readonly color: Color;
}

let point1: Point = { x: 0, y: 0, name: "origin", opposite: null, color: { name: "red", value: "#ff0000" } };
let point2: Point = point1;
let point3: Point = point1;
// let point4: Point = { x: 0, y: 0 };
// point1.x = 2;

point1 = { x: 2, y: 0, name: "origin", opposite: null, color: { name: "red", value: "#ff0000" } };

console.log("point1", point1);
console.log("point2", point2);
console.log("point3", point3);
// console.log("point4", point4);
