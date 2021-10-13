import useState from "../lib/hooks/useState";
import Counter from "./Counter";

const App = () => {
  const [count, setCount] = useState(0);

  const onIncrease = () => {
    setCount(count + 1);
  };

  const onDecrease = () => {
    setCount(count - 1);
  };

  const onReset = () => {
    setCount(0);
  };

  return `
    div.container
      (1)span.count
        (2)text: ${count}
      (1)${Counter({
        onIncrease,
        onDecrease,
        onReset,
      })}
  `;
};

export default App;
