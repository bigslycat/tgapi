/* @flow */

import {
  getBotCommands,
} from './selectors';

import onCommandReceived from './onCommandReceived';
import type { Update } from '../types';

function onUpdateReceived(update: Update) {
  getBotCommands(update)
    .forEach(onCommandReceived(this, update));
}

export default onUpdateReceived;
