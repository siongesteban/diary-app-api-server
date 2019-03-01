export default async (methodPromise, model, res, next) => {
  try {
    const data = await methodPromise;

    res.locals.data = data;
  } catch (e) {
    res.locals.model = model;
    res.locals.error = e;
  }

  next();
};
