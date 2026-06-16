import { getRandomInt } from "./helpers";

function arraysEqual(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}

function searchForArray(bigArray, searchArray) {
  return bigArray.findIndex((a) => arraysEqual(a, searchArray));
}

// Function to remove potion from inventory
const removePotion = (data, potion, qnt) => {
  // Find index of the potion
  const potionIndex = searchForArray(data.potions, [potion, qnt]);

  // Alter the quantity of the potion
  if (qnt - 1 <= 0) {
    data.potions.splice(potionIndex, 1); // Remove potion if quantuty is 0 or less
  } else data.potions[potionIndex] = [potion, qnt - 1]; // Subtract potion quantity by one

  // Returning updated inventory
  return data;
};

// function to use potion
export const usePotion = (potion, qnt, data, setData) => {
  // Applying effect of the potion
  switch (potion) {
    case "Cura":
      data.HP += 30;
      break;
    case "Força":
      data.PHY_DMG += 30;
      break;
  }

  if (data.HP > data.HP_MAX) data.HP = data.HP_MAX;

  // removing potion from inventory
  const updatedData = removePotion(data, potion, qnt);

  // Save the changes
  setData(updatedData);
};

// Function for actions
export const actionsMenu = (
  attType,
  dataCha,
  setDataCha,
  dataOpponent,
  setDataOpponent,
) => {
  switch (attType) {
    case "Espancar":
      // Reduce opponent HP by character physical attack minus the opponent's physical defence
      dataOpponent.HP -= dataCha.PHY_DMG - dataOpponent.PHY_DEF;
      break;
    case "Aparar":
      // Reduce opponent HP by half character attack, raise physical defence by 10
      dataOpponent.HP -= dataCha.PHY_DMG / 2;
      dataCha.PHY_DEF += 5;
      break;
    case "Preparo":
      // 20% chance to Improve all character stats by 10
      if (getRandomInt(1, 5) === 5) {
        dataCha.PHY_DEF += 10;
        dataCha.PHY_DMG += 10;
        dataCha.MAG_DMG += 10;
        dataCha.MAG_DEF += 10;
      }
      break;
    case "Raio":
      // Reduce opponent HP by character magic attack minus the opponent's magic defence
      // Reduce opponent magical defence by 5
      dataOpponent.HP -= dataCha.MAG_DMG - dataOpponent.MAG_DEF;
      dataOpponent.MAG_DEF -= 10;
      break;
    case "Bola de Fogo":
      // Reduce opponent HP by character magic attack minus the opponent's magic defence
      // Reduce physical magical defence by 5
      dataOpponent.HP -= dataCha.MAG_DMG - dataOpponent.MAG_DEF;
      dataOpponent.PHY_DEF -= 10;
      break;
    case "Amaldiçoar":
      // Reduce opponent defence and magical defence by 10
      dataOpponent.PHY_DEF -= 10;
      dataOpponent.MAG_DEF -= 10;
      break;
    case "Roubar Vida":
      // Reduce opponent HP by half character magic attack, raise HP by the same amount minus the magic defence
      dataOpponent.HP -= dataCha.MAG_DMG / 2 - dataOpponent.MAG_DEF;
      dataCha.HP += dataCha.MAG_DMG / 2 - dataOpponent.MAG_DEF;
      break;
    case "Fugir":
      // 20% Chance of being able to run away
      if (getRandomInt(1, 5) === 5) return "e conseguiu.";
      else return "e falhou.";
      break;
  }

  if (dataCha.HP >= dataCha.HP_MAX) dataCha.HP = dataCha.HP_MAX;

  setDataCha(dataCha);
  setDataOpponent(dataOpponent);

  return null;
};
