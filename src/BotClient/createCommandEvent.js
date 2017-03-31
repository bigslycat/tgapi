/* @flow */

import type { CommandEvent, Update } from '../types';

const createCommandEvent =
  (update: Update, command: string, args: string): CommandEvent =>
    ({ update, command, ...args ? { args } : {} });

export default createCommandEvent;
