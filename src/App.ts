import Counter from "Components/Counter";
import { ReactDOM } from "../React";

const App = () => {
  return ReactDOM.createElement("div", {
    children: [Counter, Counter, Counter],
  });
};

export default App;
