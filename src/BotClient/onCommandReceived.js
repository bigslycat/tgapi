/* @flow */

import BotClient from './';
import createCommandEvent from './createCommandEvent';
import type { Update } from '../types';

const eventName = 'commandReceived';

const onCommandReceived =
  (bot: BotClient, update: Update) =>
    ([command, args]: [string, string]) => {
      const eventData = createCommandEvent(update, command, args);

      bot.emit(eventName, eventData);
      bot.emit(`${eventName}${command}`, eventData);
    };

export default onCommandReceived;
