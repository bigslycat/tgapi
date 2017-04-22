/* @flow */

import BotClient from './';
import { getPressedInlineButtonId } from './selectors';
import createButtonPressedEvent from './createButtonPressedEvent';
import createCertainButtonPressedEvent from './createCertainButtonPressedEvent';
import type { Update, CallbackQuery } from '../types';

const eventName = 'inlineButtonPressed';

const onCallbackQueryReceived =
  (bot: BotClient, update: Update, callbackQuery: CallbackQuery) => {
    bot.emit(eventName, createButtonPressedEvent(update, callbackQuery));

    const pressedInlineButtonId = getPressedInlineButtonId(update);
    if (!pressedInlineButtonId) return;

    bot.emit(
      `${eventName}/${pressedInlineButtonId}`,
      createCertainButtonPressedEvent(update, callbackQuery, pressedInlineButtonId),
    );
  };

export default onCallbackQueryReceived;
