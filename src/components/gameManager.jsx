import { useState } from "react";
import Character from "./character";

function GameManager() {
  const [round, setRound] = useState(0);
  const [lastAct, setLastAct] = useState([]);
  const [isHeroTurn, setIsHeroTurn] = useState(true);
  const [isVillainTurn, setIsVillainTurn] = useState(false);

  const hero = {
    NAME: "Home(r)", // These suggestions are so stupid
    HP: 90,
    HP_MAX: 100,
    PHY_DMG: 50,
    PHY_DEF: 20,
    MAG_DMG: 50,
    MAG_DEF: 20,

    attacks: ["Espancar", "Aparar", "Preparo"],
    spells: ["Raio", "Amaldiçoar", "Roubar Vida"],
    potions: [
      ["Cura", 2],
      ["Força", 1],
    ],
  };

  const villain = {
    NAME: "Villain Guy",
    HP: 100,
    HP_MAX: 100,
    PHY_DMG: 50,
    PHY_DEF: 20,
    MAG_DMG: 51,
    MAG_DEF: 10,

    attacks: ["Espancar", "Aparar", "Preparo"],
    spells: ["Raio", "Amaldiçoar", "Roubar Vida"],
    potions: [["Cura", 2]],
  };

  const [heroState, setHeroState] = useState(hero);
  const [villainState, setVillainState] = useState(villain);

  const charAction = (act) => {
    setLastAct([act, isHeroTurn === true ? heroState.NAME : villainState.NAME]);
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
