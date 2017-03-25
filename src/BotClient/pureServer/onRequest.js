/* @flow */

import http from 'http';

import BotClient from '../';
import streamReducer from '../../helpers/streamReducer';
import type { Response } from '../';
import type { Update } from '../../types';

const onRequest = (url: string, bot: BotClient) =>
    (req: http.IncomingMessage, res: http.ServerResponse) => {
      if (
        req.method !== 'POST' ||
        req.url !== url
      ) return;

      const data = streamReducer();

      req.on('data', data);
      req.on('end', () => {
        try {
          const request: Response<Update[]> = JSON.parse(data.toString());
          if (request.ok) bot.publishUpdates(request.result);
        } finally {
          res.end();
        }
      });
    };

export default onRequest;
