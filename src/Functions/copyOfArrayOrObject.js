const copyOfArrayOrObject = (array) => {
  return JSON.parse(JSON.stringify(array));
};

export default copyOfArrayOrObject;
