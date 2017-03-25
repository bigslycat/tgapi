/* @flow */

import fetch from 'node-fetch';
import Bluebird from 'bluebird';

import type { SendRequest } from './';

const Promise = Bluebird;
fetch.Promise = Promise;

const sendRequest: SendRequest =
  async (url, args) => {
    const requestParams = args ? {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(args),
    } : { method: 'GET' };

    const res = await fetch(url, requestParams);

    return res.json();
  };

export default sendRequest;
