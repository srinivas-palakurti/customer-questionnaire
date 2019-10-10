import { helper } from '@ember/component/helper';
import { equal } from 'assert';

export default helper(function ifCondition(params) {
  return  equal(params[0], params[1]);
});


// export function ifCondition([arg1, arg2]) {
//   console.log(arg1); // => "hello"
//   console.log(arg2); // => "world"
// };

// export default helper(myHelper);
