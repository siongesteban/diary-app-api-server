import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';

export default (exec, populations) => {
  if (isEmpty(populations)) {
    return exec;
  }

  let newExec = exec;

  forEach(populations, population => {
    newExec = newExec.populate(population);
  });

  return newExec;
};
