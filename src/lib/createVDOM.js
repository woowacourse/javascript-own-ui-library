const createVDOM = (tag, attr, ...children) => {
  const element = {
    type: tag,
    key: null,
    props: {},
  };

  // 속성 부여
  if (attr) {
    for (const [key, value] of Object.entries(attr)) {
      element.props[key] = value;
    }
  }

  children.forEach((child) => {
    if (child === undefined) return;

    if (typeof child === "string" || typeof child === "number") {
      element.props = { ...element.props, text: child };
    }

    if (typeof child === "object") {
      const currentChildren = element.props["children"];

      if (Array.isArray(currentChildren)) {
        element.props["children"] = [...currentChildren, child];
      } else {
        element.props["children"] = [child];
      }
    }
  });

  return element;
};

export default createVDOM;
