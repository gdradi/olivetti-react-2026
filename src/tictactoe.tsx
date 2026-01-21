import { useEffect, useState } from "react";

/**
 * Realizzare il gioco del Tris (Tic Tac Toe) in React
 *
 * requisiti:
 * 1. visualizzare la griglia 3x3
 * 2. premendo su una cella, a turno verrà visualizzato o "X" o "O", alternati
 * 3. non si può premere due volte su una stessa cella
 * 4. quando si riconosce un tris, evidenziarlo, segnalarlo in qualche modo
 *
 */

type Board = Array<string | null>;

type PlayerMove = {
  player: string;
  cellIndex: number;
};

export function TicTacToe() {
  /**
   * Il valore iniziale degli stati "board" e "currentPlayer" deve essere scelto come segue:
   *
   * - se ho un valore precedentemente salvato nel local storage, allora uso quello
   * - altrimenti, uso il valore di default (quindi una board vuota e il giocatore "X")
   */
  const boardStoredInLocalStorage = localStorage.getItem("ticTacToeBoard");
  const currentPlayerStoredInLocalStorage = localStorage.getItem("ticTacToePlayer");
  const movesStoredInLocalStorage = localStorage.getItem("ticTacToeMoves");
  const [board, setBoard] = useState<Board>(
    boardStoredInLocalStorage ? JSON.parse(boardStoredInLocalStorage) : [null, null, null, null, null, null, null, null, null]
  );
  /**
   * Spiegazione operatore ??
   * leggendo da sx a dx, se l'elemento esiste, viene considerato quello,
   * altrimenti si procede verso destra finchè non si trova un elemento che esiste
   */
  const [currentPlayer, setCurrentPlayer] = useState(currentPlayerStoredInLocalStorage ?? "X");

  /**
   * Per poter mostrare l'elenco delle mosse ho bisogno di una mantenere una lista apposita,
   * perchè non posso recuperare lo storico a partire dallo stato della board
   */
  const [moves, setMoves] = useState<PlayerMove[]>(movesStoredInLocalStorage ? JSON.parse(movesStoredInLocalStorage) : []);

  //#region Variabili di appoggio e informazioni derivate

  // La funzione restituisce l'array di celle vincitrici, o null se non c'è un vincitore
  const winningCells = checkWinner(board);
  // Per capire chi ha vinto, guardo cosa c'è in una qualsiasi delle celle vincitrici
  const winner = winningCells == null ? null : board[winningCells[0]!];

  //#endregion

  /**
   * Ogni volta che o board o currentPlayer cambiano, salvo i valori nel local storage
   * in modo che, se l'utente ricarica la pagina o il componente viene rimontato, i due stati
   * si inizializzino con il valore precedente
   */
  useEffect(() => {
    const boardAsString = JSON.stringify(board);
    localStorage.setItem("ticTacToeBoard", boardAsString);
    localStorage.setItem("ticTacToePlayer", currentPlayer);
    localStorage.setItem("ticTacToeMoves", JSON.stringify(moves));
  }, [board, currentPlayer, moves]);

  function reset() {
    setBoard([null, null, null, null, null, null, null, null, null]);
    setCurrentPlayer("X");
    setMoves([]);
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Tic Tac Toe</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div className="tictactoe-grid">
          {board.map((cell, index) => (
            <Cell
              key={index}
              cell={cell}
              disabled={winner != null || cell != null}
              isWinningCell={winningCells != null && winningCells.includes(index)}
              onClick={() => {
                const newBoard = [...board];
                newBoard[index] = currentPlayer;
                setBoard(newBoard);
                setMoves([...moves, { player: currentPlayer, cellIndex: index }]);
                setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
              }}
            />
          ))}
        </div>

        <div>
          {winner && <Winner winner={winner} />}
          <CurrentPlayer currentPlayer={currentPlayer} />
          <MoveList moves={moves} />
          <Controls reset={reset} />
        </div>
      </div>
    </div>
  );
}

interface CellProps {
  // null se vuota, "X" o "O" se occupata da un giocatore
  readonly cell: string | null;
  // funzione da eseguire quando la cella viene premuta
  readonly onClick: () => void;
  // booleano che rappresenta se la cella è disabilitata (non cliccabile)
  readonly disabled: boolean;
  // booleano che rappresenta se la cella è una delle celle vincenti
  readonly isWinningCell: boolean;
}

function Cell(props: CellProps) {
  const { cell, onClick, disabled, isWinningCell } = props;
  return (
    <button
      // key={index}
      onClick={() => onClick()}
      style={{
        width: "100px",
        height: "100px",
        fontSize: "36px",
        fontWeight: "bold",
        cursor: disabled ? "not-allowed" : "pointer",
        // se la cella è vincente, la coloro di verde, altrimenti biancastra
        backgroundColor: isWinningCell ? "#4CAF50" : "#f0f0f0",
        // se la cella è vincente, il testo è bianco
        color: isWinningCell ? "white" : "black",
        border: "2px solid #333",
      }}
      // se la cella ha un valore, oppure è disabilita dalle props, la disabilito
      disabled={cell != null || disabled}
    >
      {cell || ""}
    </button>
  );
}

function checkWinner(board: Array<string | null>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (board[a!] && board[a!] === board[b!] && board[a!] === board[c!]) {
      // restituisco gli indici delle celle vincenti
      return line;
    }
  }
  return null;
}

interface ControlProps {
  readonly reset: () => void;
}
function Controls(props: ControlProps) {
  const { reset } = props;
  return (
    <div className="box">
      <h2>Controls</h2>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

interface WinnerProps {
  readonly winner: string;
}

function Winner(props: WinnerProps) {
  const { winner } = props;

  return (
    <div className="box" style={{ backgroundColor: "#4CAF50", color: "white" }}>
      <h2>🎉 Vince {winner}</h2>
    </div>
  );
}

interface CurrentPlayerProps {
  readonly currentPlayer: string;
}

function CurrentPlayer(props: CurrentPlayerProps) {
  const { currentPlayer } = props;

  return (
    <div className="box">
      <h2>Current Player</h2>
      <h3>{currentPlayer}</h3>
    </div>
  );
}

interface MoveProps {
  readonly player: string;
  readonly cellIndex: number;
}

function Move(props: MoveProps) {
  const { player, cellIndex } = props;
  return (
    <div className="box">
      {player}: {cellIndex}
    </div>
  );
}

interface MoveListProps {
  readonly moves: PlayerMove[];
}

function MoveList(props: MoveListProps) {
  const { moves } = props;

  return (
    <div className="box">
      <h2>Mosse:</h2>
      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
        {moves.length === 0 ? (
          <p style={{ color: "#999" }}>Nessuna</p>
        ) : (
          moves.map((move, index) => <Move key={index} player={move.player} cellIndex={move.cellIndex} />)
        )}
      </div>
    </div>
  );
}
