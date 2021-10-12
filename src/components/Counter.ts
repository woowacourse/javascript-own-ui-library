import createElement from "../myReact/createElement";
import hook from "../myReact/hook";

const Counter = () => {
  const [value, setValue] = hook.useState<number>(0);

  return createElement("div", {
    props: { className: "container" },
    children: [
      createElement("span", {
        props: { className: "count" },
        children: [value.toString()],
      }),
      createElement("div", {
        props: { className: "btn-group" },
        children: [
          createElement("button", {
            props: { onClick: () => setValue(value - 1) },
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
            props: { onClick: () => setValue(value + 1) },
            children: [createElement("strong", { children: ["+"] })],
          }),
        ],
      }),
    ],
  });
};

export default Counter;
