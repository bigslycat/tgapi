/* @flow */

/* eslint-env jest */
/* eslint flowtype/no-weak-types: off */

import fetch from 'node-fetch';

import sendRequest from './sendRequest';

jest.mock('node-fetch');

describe('sendRequest()', () => {
  it('Send GET request to given url if ags is empty', async () => {
    fetch.mockReturnValueOnce(Promise.resolve({ json: () => 'result' }));
    const res = await sendRequest('url');

    expect(res).toBe('result');
    expect(fetch).lastCalledWith('url', { method: 'GET' });
  });

  it('Send POST request to given url if ags is not empty', async () => {
    fetch.mockReturnValueOnce(Promise.resolve({ json: () => 'result' }));

    const args = { arg: 'value' };
    const res = await sendRequest('url', args);

    expect(res).toBe('result');
    expect(fetch).lastCalledWith('url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(args),
    });
  });
});
