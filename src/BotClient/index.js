/* @flow */

import EventEmitter from 'events';

import onUpdateReceived from './onUpdateReceived';
import getLastUpdateId from './getLastUpdateId';

import type {
  Update, UpdateType, WebhookInfo, InputFile, User, Message, InlineKeyboardMarkup,
  ReplyKeyboardMarkup, ReplyKeyboardRemove, ForceReply, UserProfilePhotos, Chat, ChatMember,
} from '../types';

declare class Timeout {
  ref(): this,
  unref(): this,
}

export type SetTimeout =
  // eslint-disable-next-line flowtype/no-weak-types
  <U: Array<*>>(callback?: (...rest: U) => any, ms?: number, ...args: U) => Timeout;

export type ClearTimeout = (timeout: Timeout) => void;

declare var setInterval: SetTimeout;
declare var clearInterval: ClearTimeout;

export type ResponseSuccessful<R> = { ok: true, result: R };
export type ResponseError = { ok: false, error_code: number, description: string };
export type Response<R> = ResponseError | ResponseSuccessful<R>;
export type ResponseResult<R> = R;
export type ResponseResultPromise<R> = Promise<ResponseResult<R>>;
export type ResponseSuccessfulPromise<R> = Promise<ResponseSuccessful<R>>;
export type ResponsePromise<R> = Promise<Response<R>>;

// eslint-disable-next-line flowtype/no-weak-types
export type SendRequestArgs = { [key: string]: any };

// eslint-disable-next-line flowtype/no-weak-types
export type SendRequest = (url: string, args?: SendRequestArgs) => ResponsePromise<any>;

export type MethodName = (
  'getUpdates' | 'setWebhook' | 'deleteWebhook' | 'getWebhookInfo' |

  'getMe' | 'sendMessage' | 'forwardMessage' | 'sendPhoto' | 'sendAudio' | 'sendDocument' |
  'sendSticker' | 'sendVideo' | 'sendVoice' | 'sendLocation' | 'sendVenue' | 'sendContact' |
  'sendChatAction' | 'getUserProfilePhotos' | 'getFile' | 'kickChatMember' | 'leaveChat' |
  'unbanChatMember' | 'getChat' | 'getChatAdministrators' | 'getChatMembersCount' |
  'getChatMember' | 'answerCallbackQuery' |

  'editMessageText' | 'editMessageCaption' | 'editMessageReplyMarkup' | 'answerInlineQuery' |

  'sendGame' | 'setGameScore' | 'getGameHighScores'
);

type SendCommon = {
  chat_id: number | string,
  disable_notification?: boolean,
  reply_to_message_id?: number,
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply,
};

class BotClient extends EventEmitter {
  token: string;
  sendRequest: SendRequest;

  lastUpdateId: number = 0;
  watchUpdatesInterval: null | Timeout = null;

  constructor(token: string, sendRequest: SendRequest) {
    super();

    Object.defineProperties(this, {
      token: { value: token, enumerable: true },
      sendRequest: { value: sendRequest, enumerable: true },
    });

    this.on('updateReceived', onUpdateReceived);
  }

  async callMethod(methodName: MethodName, args?: SendRequestArgs) {
    const response = await this.sendRequest(
      `https://api.telegram.org/bot${this.token}/${methodName}`, args,
    );

    if (!response.ok) throw response;

    return response.result;
  }

  lastUpdateIdRefresh(updates: ResponseResult<Update[]>) {
    if (updates.length) this.lastUpdateId = getLastUpdateId(updates);
  }

  publishUpdates(updates: ResponseResult<Update[]>) {
    updates.forEach(update => this.emit('updateReceived', update));
  }

  pullUpdates = async () => {
    try {
      this.publishUpdates(await this.getUpdates());
    } catch (error) {
      this.emit('getUpdatesError', error);
    }
  };

  startWatchUpdates(interval?: number = 5) {
    this.stopWatchUpdates();
    this.watchUpdatesInterval = setInterval(this.pullUpdates, interval * 1000);
  }

  stopWatchUpdates() {
    if (!this.watchUpdatesInterval) return;

    clearInterval(this.watchUpdatesInterval);
    this.watchUpdatesInterval = null;
  }

  async getUpdates({
    offset = this.lastUpdateId + 1, ...args
  }: {
    offset?: number,
    limit?: number,
    timeout?: number,
    allowed_updates?: UpdateType[],
  } = {}): ResponseResultPromise<Update[]> {
    const response: ResponseResult<Update[]> = await this.callMethod(
      'getUpdates', { ...args, offset },
    );

    this.lastUpdateIdRefresh(response);
    return response;
  }

  setWebhook(args: {
    url: string,
    certificate?: InputFile,
    max_connections?: number,
    allowed_updates?: UpdateType[],
  }): ResponseResultPromise<true> {
    return this.callMethod('setWebhook', args);
  }

  deleteWebhook(): ResponseResultPromise<true> {
    return this.callMethod('deleteWebhook');
  }

  getWebhookInfo(): ResponseResultPromise<WebhookInfo> {
    return this.callMethod('getWebhookInfo');
  }


  getMe(): ResponseResultPromise<User> {
    return this.callMethod('getMe');
  }

  sendMessage(args: SendCommon & {
    text: string,
    parse_mode?: 'Markdown' | 'HTML',
    disable_web_page_preview?: boolean,
  }): ResponseResultPromise<Message> {
    return this.callMethod('sendMessage', args);
  }

  forwardMessage(args: {
    chat_id: number | string,
    from_chat_id: number | string,
    disable_notification?: boolean,
    message_id: number,
  }) {
    return this.callMethod('forwardMessage', args);
  }

  sendPhoto(args: SendCommon & {
    photo: InputFile | string,
    caption?: string,
  }): ResponseResultPromise<Message> {
    return this.callMethod('sendPhoto', args);
  }

  sendAudio(args: SendCommon & {
    audio: InputFile | string,
    caption?: string,
    duration?: number,
    performer?: string,
    title?: string,
  }): ResponseResultPromise<Message> {
    return this.callMethod('sendAudio', args);
  }

  sendDocument(args: SendCommon & {
    document: InputFile | string,
    caption?: string,
  }): ResponseResultPromise<Message> {
    return this.callMethod('sendDocument', args);
  }

  sendSticker(args: SendCommon & {
    sticker: InputFile | string,
  }): ResponseResultPromise<Message> {
    return this.callMethod('sendSticker', args);
  }

  sendVideo(args: SendCommon & {
    video: InputFile | string,
    duration?: number,
    width?: number,
    height?: number,
    caption?: string,
  }): ResponseResultPromise<Message> {
    return this.callMethod('sendVideo', args);
  }

  sendVoice(args: SendCommon & {
    voice: InputFile | string,
    caption?: string,
    duration?: number,
  }): ResponseResultPromise<Message> {
    return this.callMethod('sendVoice', args);
  }

  sendLocation(args: SendCommon & {
    latitude: number,
    longitude: number,
  }): ResponseResultPromise<Message> {
    return this.callMethod('sendLocation', args);
  }

  sendVenue(args: SendCommon & {
    latitude: number,
    longitude: number,
    title: string,
    address: string,
    foursquare_id?: string,
  }): ResponseResultPromise<Message> {
    return this.callMethod('sendVenue', args);
  }

  sendContact(args: SendCommon & {
    phone_number: string,
    first_name: string,
    last_name?: string,
  }): ResponseResultPromise<Message> {
    return this.callMethod('sendContact', args);
  }

  sendChatAction(args: {
    chat_id: number | string,
    action: 'typing' | 'upload_photo' | 'record_video' | 'upload_video' | 'record_audio' |
      'upload_audio' | 'upload_document' | 'find_location',
  }): ResponseResultPromise<true> {
    return this.callMethod('sendChatAction', args);
  }

  getUserProfilePhotos(args: {
    user_id: number,
    offset?: number,
    limit?: number,
  }): ResponseResultPromise<UserProfilePhotos> {
    return this.callMethod('getUserProfilePhotos', args);
  }

  getFile(args: { file_id: string }): ResponseResultPromise<File> {
    return this.callMethod('getFile', args);
  }

  kickChatMember(args: {
    chat_id: number | string,
    user_id: number,
  }): ResponseResultPromise<true> {
    return this.callMethod('kickChatMember', args);
  }

  leaveChat(args: {
    chat_id: number | string,
  }): ResponseResultPromise<true> {
    return this.callMethod('leaveChat', args);
  }

  unbanChatMember(args: {
    chat_id: number | string,
    user_id: number,
  }): ResponseResultPromise<true> {
    return this.callMethod('unbanChatMember', args);
  }

  getChat(args: {
    chat_id: number | string,
  }): ResponseResultPromise<Chat> {
    return this.callMethod('getChat', args);
  }

  getChatAdministrators(args: {
    chat_id: number | string,
  }): ResponseResultPromise<ChatMember[]> {
    return this.callMethod('getChatAdministrators', args);
  }

  getChatMembersCount(args: {
    chat_id: number | string,
  }): ResponseResultPromise<number> {
    return this.callMethod('getChatMembersCount', args);
  }

  getChatMember(args: {
    chat_id: number | string,
    user_id: number,
  }): ResponseResultPromise<ChatMember> {
    return this.callMethod('getChatMember', args);
  }

  answerCallbackQuery(args: {
    callback_query_id: string,
    text?: string,
    show_alert?: boolean,
    url?: string,
    cache_time?: number,
  }): ResponseResultPromise<true> {
    return this.callMethod('answerCallbackQuery', args);
  }

  editMessageText(args: ({
    chat_id: number | string,
    message_id: number,
    inline_message_id?: string,
  } | {
    chat_id?: number | string,
    message_id?: number,
    inline_message_id: string,
  }) & {
    text: string,
    parse_mode?: 'Markdown' | 'HTML',
    disable_web_page_preview?: boolean,
    reply_markup?: InlineKeyboardMarkup,
  }): ResponseResultPromise<Message | true> {
    return this.callMethod('editMessageText', args);
  }

  editMessageCaption(args: ({
    chat_id: number | string,
    message_id: number,
    inline_message_id?: string,
  } | {
    chat_id?: number | string,
    message_id?: number,
    inline_message_id: string,
  }) & {
    caption?: string,
    reply_markup?: InlineKeyboardMarkup,
  }): ResponseResultPromise<Message | true> {
    return this.callMethod('editMessageCaption', args);
  }

  editMessageReplyMarkup(args: ({
    chat_id: number | string,
    message_id: number,
    inline_message_id?: string,
  } | {
    chat_id?: number | string,
    message_id?: number,
    inline_message_id: string,
  }) & {
    reply_markup?: InlineKeyboardMarkup,
  }): ResponseResultPromise<Message | true> {
    return this.callMethod('editMessageReplyMarkup', args);
  }
}

export default BotClient;
