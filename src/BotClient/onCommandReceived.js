/* @flow */

import BotClient from './';
import type { Update } from '../types';

const eventName = 'commandReceived';

const onCommandReceived =
  (bot: BotClient, update: Update) =>
    ([command, args]: [string, string]) => {
      const eventData = { update, command, ...args ? { args } : {} };
      bot.emit(eventName, eventData);
      bot.emit(`${eventName}${command}`, eventData);
    };

export default onCommandReceived;
