import createElement from "../myReact/createElement";
import hook from "../myReact/hook";

const RANGE_DEFAULT_VALUE = 5;

const Counter = () => {
  const [value, setValue] = hook.useState<number>(0);
  const [range, setRange] = hook.useState<number>(RANGE_DEFAULT_VALUE);

  const handleRange = ({ target }: InputEvent) => {
    setRange((target as HTMLInputElement).valueAsNumber);
  };

  return createElement("div", {
    props: { className: "container" },
    children: [
      createElement("span", {
        props: { className: "count" },
        children: [value.toString()],
      }),
      createElement("input", {
        props: {
          type: "range",
          value: range,
          onChange: handleRange,
          step: 1,
          min: 1,
          max: 10,
        },
      }),
      createElement("div", {
        props: { className: "btn-group" },
        children: [
          createElement("button", {
            props: { onClick: () => setValue(value - range) },

            children: [
              createElement("strong", {
                children: ["-"],
              }),
            ],
          }),
          createElement("button", {
            props: { onClick: () => setValue(0) },
            children: [
              createElement("strong", {
                children: ["RESET"],
              }),
            ],
          }),
          createElement("button", {
            props: { onClick: () => setValue(value + range) },
            children: [createElement("strong", { children: ["+"] })],
          }),
        ],
      }),
    ],
  });
};

export default Counter;
