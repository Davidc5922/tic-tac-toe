import React, { useEffect, useState } from "react";
import "./Home.css";
import "./cuadricula.css";
import Reset from "../Reset/Reset.jsx";

export default function Home() {
  const announcer = document.querySelector(".announcer");
  const [board, setboard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [isGameActive, setisGameActive] = useState(true);
  const [scoreX, setscoreX] = useState(
    getCookie("scoreX") == null ? 0 : parseInt(getCookie("scoreX"))
  );
  const [scoreO, setscoreO] = useState(
    getCookie("scoreO") == null ? 0 : parseInt(getCookie("scoreO"))
  );
  const [pc, setpc] = useState(false);

  let currentPlayer = "X";

  const PLAYERX_WON = "PLAYERX_WON";
  const PLAYERO_WON = "PLAYERO_WON";
  const TIE = "TIE";

  function setCookie(name, value, days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      var expires = "expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + ";" + expires + "path=/";
  }

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function deleteCookie(name) {
    setCookie(name, "", 0);
  }

  function vertodas() {
    alert(document.cookie);
  }
  const isValidAction = (tile) => {
    if (tile.innerText === "X" || tile.innerText === "O") {
      return false;
    }

    return true;
  };

  const updateBoard = (index) => {
    board[index] = currentPlayer;
    setboard(board);
    console.log(board[index]);
  };

  const changePlayer = () => {
    var playerDisplay = document.querySelector(".display-player");
    let figura = currentPlayer === "O" ? "X" : "O";

    playerDisplay.classList.remove(`player${figura}`);
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
  };

  const userAction = (tile) => {
    var div = document.getElementById(`tile${tile}`);
    console.log(tile);
    console.log(div);

    if (isValidAction(div) && isGameActive == true) {
      div.innerText = currentPlayer;
      div.classList.add(`player${currentPlayer}`);
      updateBoard(tile);
      handleResultValidation();
      currentPlayer = currentPlayer === "X" ? "O" : "X";

      changePlayer();
      return true;
    }
    return false;
  };

  /*  tiles.forEach((tile, index) => {
    tile.addEventListener("click", () => userAction(tile, index));
  });
 */
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const announce = (type) => {
    let announcer = document.querySelector(".announcer");
    switch (type) {
      case PLAYERO_WON:
        setscoreO(scoreO + 1);
        announcer.innerHTML =
          '<h1>Player <span class="playerO">O</span> Won</h1>';
        announcer.classList.remove("hide");

        setCookie("scoreO", scoreO + 1, 5);
        break;

      case PLAYERX_WON:
        setscoreX(scoreX + 1);

        announcer.innerHTML =
          '<h1>Player <span class="playerX">X</span> Won</h1>';
        announcer.classList.remove("hide");
        setCookie("scoreX", scoreX + 1, 5);
        break;
      case TIE:
        announcer.innerHTML = "<h1>tie</h1>";
        announcer.classList.remove("hide");
    }
  };
  function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
      setisGameActive(false);
      return;
    }

    if (!board.includes("")) announce(TIE);
  }
  function cookies() {
    let O = getCookie("scoreO");
    console.log(O);
    setscoreO(O);
  }
  const Resetall = () => {
    var playerDisplay = document.querySelector(".display-player");
    let announcer = document.querySelector(".announcer");
    let tiles = Array.from(document.querySelectorAll(".tile"));

    setboard(["", "", "", "", "", "", "", "", ""]);
    setisGameActive(true);
    tiles.forEach((tile) => {
      tile.innerText === "X"
        ? tile.classList.remove("playerX")
        : tile.classList.remove("playerO");
      tile.innerText = "";
    });
    playerDisplay.innerText === "X"
      ? playerDisplay.classList.remove("playerX")
      : playerDisplay.classList.remove("playerO");
    playerDisplay.classList.add("playerX");
    playerDisplay.innerText = "x";
    announcer.classList.add("hide");
  };
  function resetCont() {
    Resetall();
    setCookie("scoreX", "0", 0);
    setCookie("scoreO", "0", 0);
    setscoreX(0);
    setscoreO(0);
  }
  const Pcactive = () => {
    if (pc == false) {
      for (let i = 0; i <= 8; i++) {
        let num = Math.floor(Math.random() * 9) + 1 - 1;
        if (userAction(num)) {
          console.log(currentPlayer);

          setpc(true);
          break;
        } else {
          continue;
        }
      }
    }
  };
  return (
    <div className="Home">
      <div>
        <h1>tic tac toe</h1>
      </div>
      <div>
        <input
          type="radio"
          onClick={() => {
            Pcactive();
          }}
        />
      </div>
      <div className="container_all">
        <div>
          <div className="display">
            <h1>
              Player <span className="display-player playerX tile">X</span> trun
            </h1>
          </div>
          <div className="container">
            <div
              className="tiles "
              id="tiles0"
              onClick={() => {
                userAction(0);
              }}
            >
              <div id="tile0" className="tile"></div>
            </div>
            <div
              className="tiles"
              id="tiles1"
              onClick={() => {
                userAction(1);
              }}
            >
              <div id="tile1" className="tile"></div>
            </div>
            <div
              className="tiles"
              id="tiles2"
              onClick={() => {
                userAction(2);
              }}
            >
              <div id="tile2" className="tile"></div>
            </div>
            <div
              className="tiles"
              id="tiles3"
              onClick={() => {
                userAction(3);
              }}
            >
              <div id="tile3" className="tile"></div>
            </div>
            <div
              className="tiles"
              id="tiles4"
              onClick={() => {
                userAction(4);
              }}
            >
              <div id="tile4" className="tile"></div>
            </div>
            <div
              className="tiles"
              id="tiles5"
              onClick={() => {
                userAction(5);
              }}
            >
              <div id="tile5" className="tile"></div>
            </div>
            <div
              className="tiles"
              id="tiles6"
              onClick={() => {
                userAction(6);
              }}
            >
              <div id="tile6" className="tile"></div>
            </div>
            <div
              className="tiles"
              id="tiles7"
              onClick={() => {
                userAction(7);
              }}
            >
              <div id="tile7" className="tile"></div>
            </div>
            <div
              className="tiles"
              id="tiles8"
              onClick={() => {
                userAction(8);
              }}
            >
              <div id="tile8" className="tile"></div>
            </div>
          </div>
          <div id="marcador" className="display announcer hide"></div>
        </div>
        <div>
          <div className="contador">
            <div className="scoreX  score">
              <h1 className="playerX">X</h1>
              <h1>
                {getCookie("scoreX") == null ? scoreX : getCookie("scoreX")}
              </h1>
            </div>
            <div className="scoreO  score">
              <h1 className="playerO">O</h1>
              <h1>
                {getCookie("scoreO") == null ? scoreO : getCookie("scoreO")}
              </h1>
            </div>
            <button
              onClick={() => {
                resetCont();
              }}
              className="X"
            >
              X
            </button>
          </div>
        </div>
      </div>

      <div>
        <Reset
          onReset={() => {
            Resetall();
          }}
        />
      </div>
    </div>
  );
}
