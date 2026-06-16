import { useEffect, useState } from "react";
import Character from "./character";

import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import { mageVillain, hero } from "./charactersData";
import { waitTime } from "./helpers";

function GameManager() {
  // Defining window width and height, for confetti effect
  const { width, height } = useWindowSize();

  // Game state
  const [round, setRound] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [lastAct, setLastAct] = useState([]);
  const [isHeroTurn, setIsHeroTurn] = useState(true);
  const [isVillainTurn, setIsVillainTurn] = useState(false);

  // Characters state
  const [heroState, setHeroState] = useState(hero);
  const [villainState, setVillainState] = useState(mageVillain);

  // useEffect to check you player won or lost the game
  useEffect(() => {
    if (heroState.HP <= 0) setGameLost(true);
    if (villainState.HP <= 0) setGameWon(true);
  }, [JSON.stringify(heroState), JSON.stringify(villainState)]);

  // Function to handle character action
  const charAction = (act, msg) => {
    setLastAct([
      act,
      isHeroTurn === true ? heroState.NAME : villainState.NAME,
      msg,
    ]);

    // In case game is alredy won or lost, return (To prevent enemy from taking one more turn)
    if (heroState.HP <= 0 || villainState.HP <= 0) return;

    // Adding delay to switching turns, so that action messages appear
    if (isHeroTurn) {
      setIsHeroTurn((prev) => !prev);
      setTimeout(() => {
        setIsVillainTurn((prev) => !prev);
      }, waitTime);
    } else {
      setIsVillainTurn((prev) => !prev);
      setTimeout(() => {
        setIsHeroTurn((prev) => !prev);
      }, waitTime);
    }
  };

  return (
    <>
      {/* Message if game is won */}
      {gameWon && (
        <>
          <Confetti width={width} height={height} />
          <h1>Você ganhou!</h1>
        </>
      )}

      {/* Message if game is lost */}
      {gameLost && (
        <>
          <h1>Você perdeu.</h1>
        </>
      )}

      {/* Showing characters */}
      <Character
        dataCha={villainState}
        setDataCha={setVillainState}
        dataOpponent={heroState}
        setDataOpponent={setHeroState}
        isHero={false}
        onAction={charAction}
        isTurn={isVillainTurn}
        gameWon={gameWon}
        gameLost={gameLost}
      />
      <Character
        dataCha={heroState}
        setDataCha={setHeroState}
        dataOpponent={villainState}
        setDataOpponent={setVillainState}
        isHero={true}
        onAction={charAction}
        isTurn={isHeroTurn}
        lastAction={lastAct}
        gameWon={gameWon}
        gameLost={gameLost}
      />
    </>
  );
}

export default GameManager;
