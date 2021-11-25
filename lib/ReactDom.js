const ReactDOM = {
  render: (element, rootElement) => {
    if (!rootElement) {
      console.error('$No rootElement');
      return;
    }

    rootElement.replaceChildren(element);
  },
};

export default ReactDOM;
