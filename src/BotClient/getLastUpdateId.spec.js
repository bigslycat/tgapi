/* @flow */

/* eslint-env jest */
/* eslint flowtype/no-weak-types: off */

import getLastUpdateId from './getLastUpdateId';

describe('getLastUpdateId()', () => {
  it('Returns a last update id if the input array is not empty', () => {
    const length = 3;

    const lastUpdateId = getLastUpdateId(
      Array.from({ length }, (v, index) => ({
        update_id: index + 1,
        message: (
          null: any
        ),
      })),
    );

    expect(lastUpdateId).toBe(length);
    expect(getLastUpdateId([])).toBe(0);
  });

  it('Returns "0" if the input array is not empty', () => {
    expect(getLastUpdateId([])).toBe(0);
  });
});
