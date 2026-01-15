![React](https://blog.wildix.com/wp-content/uploads/2020/06/react-logo.jpg)

# ITS OLIVETTI 2025 - Sviluppo web e mobile - modulo React

## Argomenti

1. Evoluzione del web, dai documenti alle SPA
1. Typescript
   - Tipi primitivi, array, enum, funzioni, destructuring
   - Interfacce e strutture dati
1. Funzioni
   - map, filter
   - Funzioni pure, side effect, immutabilità
   - Lodash
1. React.js
   - Thinking in react
   - Componenti e JSX
     - Rendering condizionale
     - Rendering ciclico
   - Props e composizione
   - State
   - Hook useEffect e useMemo
   - User events
   - State lift
   - Routing
   - Interazioni client-server
1. Approfondimenti
   - TODO

## Ambiente di lavoro

- Node.JS versione LTS https://nodejs.org/it/
- Visual Studio Code https://code.visualstudio.com/

## Link utili

- Vite https://vite.dev/
- Handbook Typescript https://www.typescriptlang.org/docs/handbook/intro.html
- Equality Comparison in Javascript https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness?retiredLocale=it
- Hoisting https://developer.mozilla.org/en-US/docs/Glossary/Hoisting?retiredLocale=it
- Render in react https://beta.reactjs.org/learn/adding-interactivity

## File nel repository

- package.json: definisce la root di un progetto node. Le informazioni principali che contiene sono il nome del progetto, le dipendenze e i comandi che si possono lanciare nel progetto
- tsconfig.json: definisce la configurazione del compilatore typescript (tsc => typescript compiler). NB: è attiva la modalità strict, quindi i controlli di correttezza sono particolarmente stringenti.
- file di configurazione di prettier: Prettier (https://prettier.io/) è lo strumento per formattare e organizzare i file di riferimento per il mondo frontend react.
- file di configurazione di vite (https://vite.dev/). Vite è lo strumento che vi istanzia il server web locale con hot reload già configurato, pronto per lo sviluppo.
- src/ : cartella in cui posizionare il proprio codice sorgente

## Primo avvio

- lanciare il comando "npm install" dal terminale posizionato nella root del progetto
- lanciare il comando "dev" tramite il menu laterale di visual studio code "NPM Scripts". Se il menu non è visibile, si può abilitare dai 3 puntini a dx di explorer.
