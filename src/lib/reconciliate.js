const deepEqual = (prevDom, newDom) => {
  if (typeof prevDom !== 'object' || prevDom === null || typeof newDom !== 'object' || newDom === null) {
    return false;
  }

  if (Object.keys(prevDom).length != Object.keys(newDom).length) return false;

  for (const prop in prevDom) {
    if (newDom.hasOwnProperty(prop)) {
      if (!deepEqual(prevDom[prop], newDom[prop])) {
        return false;
      }
    } else {
      return false;
    }
  }

  return true;
};

const reconciliate = (prevDom, newDom) => {
  console.log(deepEqual(prevDom, newDom));
};

export default reconciliate;
