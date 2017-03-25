/* @flow */

import http from 'http';
import { resolve } from 'url';

import BotClient from '../';
import onRequest from './onRequest';

const startServer = (bot: BotClient, listenUrl?: string = '') => {
  const server = http.createServer();
  const url = resolve('/', listenUrl);
  server.on('request', onRequest(url, bot));
  return server;
};

export default startServer;
