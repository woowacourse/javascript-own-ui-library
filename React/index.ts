import Core from "./Core";
import CoreDOM from "./CoreDOM";

const React = {
  useState: Core.useState,
};

export default React;

export { CoreDOM as ReactDOM };
