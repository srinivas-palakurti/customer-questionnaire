import { helper } from '@ember/component/helper';
import { equal } from 'assert';

export default helper(function ifCondition(params) {
  return  equal(params[0], params[1]);
});

