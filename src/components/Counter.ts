import useHandler from "../lib/hooks/useHandler";

interface Props {
  onIncrease: () => void;
  onDecrease: () => void;
  onReset: () => void;
}

const Counter = ({ onIncrease, onDecrease, onReset }: Props) => {
  useHandler("click", {
    template: "button.increase-button",
    callback: onIncrease,
  });

  useHandler("click", {
    template: "button.decrease-button",
    callback: onDecrease,
  });

  useHandler("click", {
    template: "button.reset-button",
    callback: onReset,
  });

  return `
    div.btn-group
      (2)button.decrease-button
        (3)strong
          (4)text: -
      (2)button.reset-button
        (3)text: RESET
      (2)button.increase-button
        (3)strong
          (4)text: +
        
  `;
};

export default Counter;
