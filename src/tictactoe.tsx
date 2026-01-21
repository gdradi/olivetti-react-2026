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

export function TicTacToe() {
  /**
   * Il valore iniziale degli stati "board" e "currentPlayer" deve essere scelto come segue:
   *
   * - se ho un valore precedentemente salvato nel local storage, allora uso quello
   * - altrimenti, uso il valore di default (quindi una board vuota e il giocatore "X")
   */
  const boardStoredInLocalStorage = localStorage.getItem("ticTacToeBoard");
  const currentPlayerStoredInLocalStorage = localStorage.getItem("ticTacToePlayer");
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
   * Ogni volta che o board o currentPlayer cambiano, salvo i valori nel local storage
   * in modo che, se l'utente ricarica la pagina o il componente viene rimontato, i due stati
   * si inizializzino con il valore precedente
   */
  useEffect(() => {
    const boardAsString = JSON.stringify(board);
    localStorage.setItem("ticTacToeBoard", boardAsString);
    localStorage.setItem("ticTacToePlayer", currentPlayer);
  }, [board, currentPlayer]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Tic Tac Toe</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gap: "5px",
          justifyContent: "center",
          margin: "20px auto",
        }}
      >
        {board.map((cell, index) => (
          <Cell
            key={index}
            cell={cell}
            onClick={() => {
              const newBoard = [...board];
              newBoard[index] = currentPlayer;
              setBoard(newBoard);
              setCurrentPlayer(currentPlayer === "X" ? "O" : "X");

              // Gestione vincitore
              const winner = checkWinner(newBoard);
              if (winner !== null) {
                alert(`Vince ${winner}!`);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

interface CellProps {
  readonly cell: string | null;
  readonly onClick: () => void;
}

function Cell(props: CellProps) {
  const { cell, onClick } = props;
  return (
    <button
      // key={index}
      onClick={() => onClick()}
      style={{
        width: "100px",
        height: "100px",
        fontSize: "36px",
        fontWeight: "bold",
        cursor: cell != null ? "not-allowed" : "pointer",
        backgroundColor: "#f0f0f0",
        border: "2px solid #333",
      }}
      disabled={cell != null}
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
    if (board[a!] === board[b!] && board[a!] === board[c!]) {
      return board[a!];
    }
  }
  return null;
}
