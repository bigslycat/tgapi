/* @flow */

import type { ButtonPressedEvent, CallbackQuery, Update } from '../types';

type CreateButtonPressedEvent =
  (update: Update, callbackQuery: CallbackQuery) =>
    ButtonPressedEvent;

const createButtonPressedEvent: CreateButtonPressedEvent =
  (update, callbackQuery) =>
    ({ update, callbackQuery });

export default createButtonPressedEvent;
