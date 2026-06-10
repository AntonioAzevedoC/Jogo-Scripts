import { useState } from "react";

import AttackMenu from "./attackMenu";
import MagicMenu from "./magicMenu";
import PotionsMenu from "./potionsMenu";

export default function Character({
  dataCha,
  setDataCha,
  dataOpponent,
  setDataOpponent,
  isHero,
  onAction,
  isTurn,
}) {
  // State for menus
  const [attackMenu, setAttackMenu] = useState(false);
  const [magicMenu, setMagicMenu] = useState(false);
  const [potionsMenu, setPotionsMenu] = useState(false);

  // Defining life bar percentage
  const lifePercent = Math.max(0, dataCha.HP) + "%";

  // Function to open attack menu
  const openAttackMenu = () => {
    setAttackMenu(true);
  };

  // Function to open magic menu
  const openMagicMenu = () => {
    setMagicMenu(true);
  };

  // Function to open potion menu
  const openPotionsMenu = () => {
    setPotionsMenu(true);
  };

  // Function to close menus
  const closeMenus = () => {
    setAttackMenu(false);
    setPotionsMenu(false);
    setMagicMenu(false);
  };

  return (
    <div className="character">
      {/* HP bar */}
      <div className="life-bar">
        <div className="life-fill" style={{ width: lifePercent }}></div>
        <span className="life-text">{dataCha.HP}</span>
      </div>

      {/* Character art */}
      <div className="sprite">Desenho Personagem</div>
      <h1>
        {dataCha.NAME} - Nome do {isHero ? "Herói" : "Vilão"}
      </h1>

      {/* Main Menu */}
      {isHero && !attackMenu && !magicMenu && !potionsMenu && (
        <div className="actions">
          <button
            disabled={!isTurn}
            onClick={() => openAttackMenu(setDataCha, setDataOpponent)}
          >
            Atacar
          </button>
          <button disabled={!isTurn} onClick={() => openMagicMenu()}>
            Magias
          </button>
          <button disabled={!isTurn} onClick={() => openPotionsMenu()}>
            Usar Poção
          </button>
          <button disabled={!isTurn} onClick={() => onAction("Flee")}>
            Fugir
          </button>
        </div>
      )}

      {/* Attack Menu */}
      {attackMenu && isTurn && (
        <AttackMenu
          onAction={onAction}
          onClose={closeMenus}
          dataCha={dataCha}
          setDataCha={setDataCha}
          dataOpponent={dataOpponent}
          setDataOpponent={setDataOpponent}
        />
      )}

      {/* Spell Menu */}
      {magicMenu && isTurn && (
        <MagicMenu
          onAction={onAction}
          onClose={closeMenus}
          dataCha={dataCha}
          setDataCha={setDataCha}
          dataOpponent={dataOpponent}
          setDataOpponent={setDataOpponent}
        />
      )}

      {/* Potions Menu */}
      {potionsMenu && isTurn && (
        <PotionsMenu
          onAction={onAction}
          onClose={closeMenus}
          dataCha={dataCha}
          setDataCha={setDataCha}
        />
      )}
    </div>
  );
}

// After action, change turns
// Enemy takes a random action, add weights to actions
// Also change turns after enemy turn
// Add win and lose condition (HP = 0)
// Add three different enemies to choose from, and page to choose enemy
// Add some art
