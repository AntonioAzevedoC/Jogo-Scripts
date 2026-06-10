import { useState } from "react";
import Character from "./character";

function GameManager() {
  const [round, setRound] = useState(0);
  const [isHeroTurn, setIsHeroTurn] = useState(true);
  const [isVillainTurn, setIsVillainTurn] = useState(false);
  const hero = {
    NAME: "Home(r)", // These suggestions are so stupid
    HP: 100,
    PHY_DMG: 50,
    PHY_DEF: 20,
    MAG_DMG: 50,
    MAG_DEF: 20,
    SPEED: 100, // Whoever has greater speed acts first, if one character has more than double the speed of the other, it acts twice

    attacks: ["Espancar", "Aparar", "Preparo"],
    spells: ["Raio", "Amaldiçoar", "Roubar Vida"],
    potions: [
      ["Cura", 2],
      ["Velocidade", 1],
    ],
  };

  const villain = {
    NAME: "Villain Guy",
    HP: 200,
    PHY_DMG: 50,
    PHY_DEF: 20,
    MAG_DMG: 50,
    MAG_DEF: 20,
    SPEED: 100, // Whoever has greater speed acts first, if one character has more than double the speed of the other, it acts twice

    attacks: ["Espancar", "Aparar", "Preparo"],
    spells: ["Raio", "Amaldiçoar", "Preparo"],
    potions: [
      ["Cura", 2],
      ["Velocidade", 1],
    ],
  };

  const [heroState, setHeroState] = useState(hero);
  const [villainState, setVillainState] = useState(villain);

  const charAction = (act) => {
    console.log(act);
    return act;
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
      />
    </>
  );
}

export default GameManager;
