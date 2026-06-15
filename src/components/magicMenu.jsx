import { actionsMenu } from "./gameFunctions";

// Magic menu component
const MagicMenu = ({
  onAction,
  onClose,
  dataCha,
  setDataCha,
  dataOpponent,
  setDataOpponent,
}) => {
  return (
    <div className="actions spells">
      {/* Spells */}
      {dataCha.spells.map((mag) => {
        return (
          <button
            key={mag}
            onClick={() => {
              actionsMenu(
                `${mag}`,
                dataCha,
                setDataCha,
                dataOpponent,
                setDataOpponent,
              );
              onAction(`${mag}`);
              onClose();
            }}
          >
            {mag}
          </button>
        );
      })}
      {/* Return button */}
      <button onClick={() => onClose()}>Voltar</button>
    </div>
  );
};

export default MagicMenu;
