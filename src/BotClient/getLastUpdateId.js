/* @flow */

import type { Update } from '../types';
import type { ResponseResult } from './';

const getLastUpdateId =
  (result: ResponseResult<Update[]>) =>
    (result.length ? result[result.length - 1].update_id : 0);

export default getLastUpdateId;
