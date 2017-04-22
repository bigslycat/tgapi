/* @flow */

import type { CertainButtonPressedEvent, CallbackQuery, Update } from '../types';

type CreateCertainButtonPressedEvent =
  (update: Update, callbackQuery: CallbackQuery, pressedInlineButtonId: string | number) =>
    CertainButtonPressedEvent;

const createCertainButtonPressedEvent: CreateCertainButtonPressedEvent =
  (update, callbackQuery, pressedInlineButtonId) =>
    ({ update, callbackQuery, pressedInlineButtonId });

export default createCertainButtonPressedEvent;
