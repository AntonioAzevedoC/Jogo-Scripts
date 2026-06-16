import { useEffect, useState } from "react";

import TypewriterComponent from "typewriter-effect";

import AttackMenu from "./attackMenu";
import MagicMenu from "./magicMenu";
import PotionsMenu from "./potionsMenu";

import { actionsMenu } from "./gameFunctions";
import { usePotion } from "./gameFunctions";

import { getRandomInt } from "./helpers";

export default function Character({
  dataCha,
  setDataCha,
  dataOpponent,
  setDataOpponent,
  isHero,
  onAction,
  isTurn,
  lastAction,
}) {
  // State for menus
  const [attackMenu, setAttackMenu] = useState(false);
  const [magicMenu, setMagicMenu] = useState(false);
  const [potionsMenu, setPotionsMenu] = useState(false);
  const [lastActionMsg, setLastActionMsg] = useState("");

  // State for enemy action
  const [enemyTookAction, setEnemyTookAction] = useState(false);

  // Defining life bar percentage
  const lifePercent = Math.max(0, dataCha.HP) + "%";

  // Defining enemy actions
  useEffect(() => {
    // If enemy HP is bellow thirty percent, use healing potion
    // Else, use either a spell or an attack depending the biggest one out of MAG_DMG and PHY_DMG
    if (!isHero && isTurn) {
      if (dataCha.HP <= dataCha.HP_MAX * 0.3 && dataCha.potions.length !== 0) {
        onAction(`Poção de ${dataCha.potions[0][0]}`);
        usePotion(
          dataCha.potions[0][0],
          dataCha.potions[0][1],
          dataCha,
          setDataCha,
        );
      } else if (dataCha.PHY_DMG >= dataCha.MAG_DMG) {
        const i = getRandomInt(0, 2);
        onAction(`${dataCha.attacks[i]}`);
        actionsMenu(
          `${dataCha.attacks[i]}`,
          dataCha,
          setDataCha,
          dataOpponent,
          setDataOpponent,
        );
      } else if (dataCha.MAG_DMG > dataCha.PHY_DMG) {
        const i = getRandomInt(0, 2);
        onAction(`${dataCha.spells[i]}`);
        actionsMenu(
          `${dataCha.spells[i]}`,
          dataCha,
          setDataCha,
          dataOpponent,
          setDataOpponent,
        );
      }
    }
  }, [isTurn]);

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
    setEnemyTookAction(false);
    setAttackMenu(false);
    setPotionsMenu(false);
    setMagicMenu(false);
  };

  // Function to create last action message
  useEffect(() => {
    if (lastAction?.length && lastAction?.length !== 0) {
      const action = lastAction[0];
      const user = lastAction[1];
      const msg = lastAction[2];

      if (action === "Fugir") setLastActionMsg(`${user} tentou fugir, ${msg}`);
      else setLastActionMsg(`${lastAction[1]} usou ${lastAction[0]}`);
    }
  }, [lastAction]);

  // Returning character component
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
      {!attackMenu && !magicMenu && !potionsMenu && (
        <div className="actions">
          {isTurn && (
            <>
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
              <button
                disabled={!isTurn}
                onClick={() => {
                  const msg = actionsMenu(
                    `Fugir`,
                    dataCha,
                    setDataCha,
                    dataOpponent,
                    setDataOpponent,
                  );
                  onAction(`Fugir`, msg);
                }}
              >
                Fugir
              </button>
            </>
          )}
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

      {/* If turn is over, show message */}
      {lastActionMsg !== "" && !isTurn ? (
        <div className="messages">
          <h2>
            <TypewriterComponent
              options={{
                strings: [lastActionMsg],
                autoStart: true,
                delay: 40,
                loop: true,
                skipAddStyles: true,
                pauseFor: 20000,
              }}
            />
          </h2>
        </div>
      ) : null}
    </div>
  );
}

// Add win and lose condition (HP = 0)
// Add three different enemies to choose from, and page to choose enemy
// Add some art

// DONE:

// After action, change turns
// Also change turns after enemy turn
// Enemy takes a random action, add weights to actions
// Add "flee" function
