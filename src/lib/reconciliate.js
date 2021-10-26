let isMarked = false;

const isPrimitive = (test) => test !== Object(test);

const deepEqual = (prevDom, newDom) => {
  if (isPrimitive(prevDom) && isPrimitive(newDom)) {
    return prevDom === newDom;
  }

  if (prevDom.type !== newDom.type) {
    return false;
  }

  if (Object.keys(prevDom)?.length != Object.keys(newDom)?.length) {
    return false;
  }

  for (const key in prevDom) {
    if (newDom.hasOwnProperty(key)) {
      if (!deepEqual(prevDom[key], newDom[key])) {
        // element type이라면
        if (newDom.type && !isMarked) {
          newDom['marked'] = true;
          isMarked = true;
        }
        return false;
      }
    }
  }

  return true;
};

const reconciliate = (prevDom, newDom) => {
  isMarked = false;

  const markedDom = { ...newDom };
  const isEqual = deepEqual(prevDom, markedDom);

  return { isEqual, markedDom };
};

export default reconciliate;
