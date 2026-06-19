import { usePotion } from "./gameFunctions";

// Potions menu component
const PotionsMenu = ({ onAction, onClose, dataCha, setDataCha }) => {
  return (
    <div className="actions">
      {/* Potions */}
      {dataCha.potions.map(([pot, qnt]) => {
        if (qnt === 0) return; // Potion doesn't appear if the quantity is zero
        return (
          <button
            key={pot}
            onClick={() => {
              usePotion(`${pot}`, qnt, dataCha, setDataCha);
              onAction(`Poção de ${pot}`);
              onClose();
            }}
          >
            {pot} x{qnt}
          </button>
        );
      })}
      {/* Return button */}
      <button onClick={() => onClose()}>Voltar</button>
    </div>
  );
};

export default PotionsMenu;
