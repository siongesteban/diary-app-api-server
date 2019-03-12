export default Model => {
  const { constructor: { modelName } } = new Model({});

  return modelName;
};
