import { Component } from "../lib/@types/types";
import useState from "../lib/hooks/useState";

const Root: Component = () => {
  // 그러네 여기서 이미 실행이 되야 하네 함수 컴포넌트가

  // return {
  //   template:
  //     "div#rootDivId.rootDivClass.rootDivClass2$background-color: red$width: 100px$height: 100px",
  //   eventHandlers: [],
  //   children: [],
  // };

  const [testText, setTestText] = useState<string>("test1");
  const [testText2, setTestText2] = useState<string>("test2");

  setTimeout(() => {
    setTestText("hehheheheheeh");
  }, 2000);

  return `
    div#id1.class1.class2$background-color: red$width: 100px$height: 100px
      (1)div#id2$background-color: blue$width: 50px$height: 50px
        (2)div#id2$background-color: tomato$width: 20px$height: 20px
        (2)div#id2$background-color: tomato$width: 20px$height: 20px
          (3)text: ${testText}
      (1)div#id3$background-color: green$width: 50px$height: 50px
  `;
};

export default Root;
