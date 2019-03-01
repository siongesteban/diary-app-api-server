export default async (methodPromise, entity, res, next) => {
  try {
    const data = await methodPromise;

    res.locals.data = data;
  } catch (e) {
    res.locals.entity = entity;
    res.locals.error = e;
  }

  next();
};
