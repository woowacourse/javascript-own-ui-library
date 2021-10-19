const createVDOM = (tag, attr, ...children) => {
  const element = {
    type: tag,
    key: null,
    props: {},
  };

  children.forEach((child) => {
    if (child === undefined) return;

    if (typeof child === "object") {
      const currentChildren = element.props["children"];

      if (Array.isArray(currentChildren)) {
        element.props["children"].push(child);
      } else {
        element.props["children"] = [child];
      }
    } else {
      element.props["children"] = child;
    }
  });

  if (attr) {
    for (const [key, value] of Object.entries(attr)) {
      element.props[key] = value;
    }
  }

  return element;
};

export default createVDOM;
