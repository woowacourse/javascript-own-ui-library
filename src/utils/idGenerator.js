const idGenerator = (() => {
  let id = 1;

  const getId = () => {
    return id++;
  };

  return { getId };
})();

export default idGenerator;
