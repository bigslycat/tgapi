/* @flow */

import {
  getBotCommands,
  getCallbackQuery,
} from './selectors';

import onCommandReceived from './onCommandReceived';
import onInlineButtonPressed from './onInlineButtonPressed';

import type { Update } from '../types';

function onUpdateReceived(update: Update) {
  getBotCommands(update)
    .forEach(onCommandReceived(this, update));

  const callbackQuery = getCallbackQuery(update);
  if (callbackQuery) onInlineButtonPressed(this, update, callbackQuery);
}

export default onUpdateReceived;
