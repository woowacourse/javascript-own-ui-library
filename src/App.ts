import Count from "Components/Count";
import { ReactDOM } from "../React";

const App = () => {
  return ReactDOM.createElement("div", {
    children: [Count, Count, Count],
  });
};

export default App;
