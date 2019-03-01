export default async (methodPromise, modelName, res, next) => {
  try {
    const data = await methodPromise;

    res.locals.data = data;
  } catch (e) {
    res.locals.modelName = modelName;
    res.locals.error = e;
  }

  next();
};
