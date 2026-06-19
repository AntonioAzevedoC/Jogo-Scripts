import GameManager from "./components/gameManager";

import { villains } from "./components/charactersData";

import "./App.css";
import { useState } from "react";

function App() {
  // State for battle
  const [battleStarted, setBattleStarted] = useState(false);
  const [opponentID, setOpponentID] = useState();

  // Function to start battle
  const startBattle = (enemyID) => {
    setBattleStarted(true);
    setOpponentID(enemyID);
  };

  // Main page component
  return (
    <>
      {!battleStarted && (
        <div className="__game-page">
          <h2>Escolha seu inimigo</h2>
          {villains.map((enemy) => {
            return (
              <button
                key={enemy.NAME}
                onClick={() => startBattle(enemy.ID)}
                type="button"
              >
                <div className="__enemy-card">
                  <img src={enemy.IMAGE}></img>
                  <p>{enemy.NAME}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* {console.log(setBattleStarted)} */}

      {battleStarted && (
        <GameManager idOpponent={opponentID} battleRestart={setBattleStarted} />
      )}
    </>
  );
}

export default App;
