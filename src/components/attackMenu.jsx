import { actionsMenu } from "./gameFunctions";

// Attack menu component
const AttackMenu = ({
  onAction,
  onClose,
  dataCha,
  setDataCha,
  dataOpponent,
  setDataOpponent,
}) => {
  return (
    <div className="actions attack">
      {/* Attacks */}
      {dataCha.attacks.map((atk) => {
        return (
          <button
            onClick={() => {
              actionsMenu(
                `${atk}`,
                dataCha,
                setDataCha,
                dataOpponent,
                setDataOpponent,
              );
              onAction(`${atk}`);
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
