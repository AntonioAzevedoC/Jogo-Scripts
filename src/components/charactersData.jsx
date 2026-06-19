import imgMage from "../assets/hero.png";
import imgBarb from "../assets/hero.png";
import imgAss from "../assets/hero.png";

export const hero = {
  ID: 3689,
  NAME: "Home(r)", // These suggestions are so stupid
  HP: 100,
  HP_MAX: 100,
  PHY_DMG: 50,
  PHY_DEF: 20,
  MAG_DMG: 50,
  MAG_DEF: 20,
  fled: false,

  attacks: ["Espancar", "Aparar", "Preparo"],
  spells: ["Raio", "Amaldiçoar", "Roubar Vida"],
  potions: [
    ["Cura", 2],
    ["Força", 1],
  ],
};

const mageVillain = {
  ID: 400,
  NAME: "Marvolo, o mago",
  HP: 80,
  HP_MAX: 80,
  PHY_DMG: 10,
  PHY_DEF: 15,
  MAG_DMG: 60,
  MAG_DEF: 60,
  IMAGE: imgMage,

  attacks: ["Espancar", "Aparar", "Preparo"],
  spells: ["Raio", "Bola de Fogo", "Roubar Vida"],
  potions: [["Cura", 2]],
};

const barbVillain = {
  ID: 401,
  NAME: "Bjorn, o bárbaro",
  HP: 170,
  HP_MAX: 170,
  PHY_DMG: 60,
  PHY_DEF: 20,
  MAG_DMG: 20,
  MAG_DEF: 10,
  IMAGE: imgBarb,

  attacks: ["Espancar", "Aparar", "Preparo"],
  potions: [["Cura", 1]],
};

// import hero from "../assets";

const assassinVillain = {
  ID: 402,
  NAME: "Assassino, o assassino",
  HP: 90,
  HP_MAX: 90,
  PHY_DMG: 70,
  PHY_DEF: 20,
  MAG_DMG: 10,
  MAG_DEF: 10,
  IMAGE: imgAss,

  attacks: ["Espancar", "Aparar", "Preparo"],
  potions: [["Cura", 2]],
};

export const villains = [mageVillain, barbVillain, assassinVillain];
