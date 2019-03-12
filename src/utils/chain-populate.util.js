import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';

import { populations } from '../constants';
import getModelName from './get-model-name.util';

export default (exec, Model) => {
  const modelName = getModelName(Model);
  const queryPopulations = populations[modelName];

  if (isEmpty(queryPopulations)) {
    return exec;
  }

  let newExec = exec;

  forEach(queryPopulations, population => {
    newExec = newExec.populate(population);
  });

  return newExec;
};
