/* @flow */

import onCommandReceived from './onCommandReceived';
import { getBotCommands } from './selectors';
import type { Update } from '../types';

function onUpdateReceived(update: Update) {
  getBotCommands(update)
    .forEach(onCommandReceived(this, update));
}

export default onUpdateReceived;
