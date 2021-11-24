import Counter from "Components/Counter";
import { ReactDOM } from "../React";

const App = () => {
  return ReactDOM.createReactElement("div", {
    children: [Counter, Counter, Counter],
  });
};

export default App;
