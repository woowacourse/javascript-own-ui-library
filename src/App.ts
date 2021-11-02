import Counter from "./components/Counter";
import createElement from "./myReact/createElement";

const App = () => {
  return createElement("div", { children: [createElement(Counter)] });
};

export default App;
