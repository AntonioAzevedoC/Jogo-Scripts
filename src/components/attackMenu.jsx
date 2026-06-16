import { actionsMenu } from "./gameFunctions";

// Attack menu component
const AttackMenu = ({
  onAction,
  onClose,
  dataCha,
  setDataCha,
  dataOpponent,
  setDataOpponent,
  closeMenus,
}) => {
  return (
    <div className="actions attack">
      {/* Attacks */}
      {dataCha.attacks.map((atk) => {
        return (
          <button
            key={atk}
            onClick={() => {
              const msg = actionsMenu(
                `${atk}`,
                dataCha,
                setDataCha,
                dataOpponent,
                setDataOpponent,
              );
              onAction(`${atk}`, msg);
              onClose();
            }}
          >
            {atk}
          </button>
        );
      })}
      {/* Return button */}
      <button onClick={() => onClose()}>Voltar</button>
    </div>
  );
};

export default AttackMenu;
