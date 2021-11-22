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
    if (child === undefined || child === null) return;

    // 단순 텍스트 노드
    if (typeof child === "string" || typeof child === "number") {
      element.props = { ...element.props, text: child };
    }

    // children
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
