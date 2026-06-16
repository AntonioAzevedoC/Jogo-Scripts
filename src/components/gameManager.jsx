import { useState } from "react";
import Character from "./character";

import { villain, hero } from "./charactersData";

function GameManager() {
  const [round, setRound] = useState(0);
  const [lastAct, setLastAct] = useState([]);
  const [isHeroTurn, setIsHeroTurn] = useState(true);
  const [isVillainTurn, setIsVillainTurn] = useState(false);

  const [heroState, setHeroState] = useState(hero);
  const [villainState, setVillainState] = useState(villain);

  const charAction = (act, msg) => {
    setLastAct([
      act,
      isHeroTurn === true ? heroState.NAME : villainState.NAME,
      msg,
    ]);
    setIsHeroTurn((prev) => !prev);
    setIsVillainTurn((prev) => !prev);
  };

  return (
    <>
      <Character
        dataCha={villainState}
        setDataCha={setVillainState}
        dataOpponent={heroState}
        setDataOpponent={setHeroState}
        isHero={false}
        onAction={charAction}
        isTurn={isVillainTurn}
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
      />
    </>
  );
}

export default GameManager;
