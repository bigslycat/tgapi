/* @flow */

import needle from 'needle'
import { mapObjIndexed } from 'ramda'

import type {
  Res,
  BotAPIClient,
} from './generatedTypes'

export interface Client extends BotAPIClient {
  +token: string,
}

type RequestBody = { [prop: string]: any }

const prepareBody = mapObjIndexed(
  (value, key) => {
    if (key === 'reply_markup') return JSON.stringify(value)
    if (value instanceof Buffer) return { buffer: value, content_type: 'application/octet-stream' }
    return value
  },
)

const sendRequest =
  (token: string) => (methodName: string) =>
    (params?: RequestBody): Res<any> => needle(
      'post', `https://api.telegram.org/bot${token}/${methodName}`,
      params && prepareBody(params), { multipart: true },
    ).then(res => res.body)

export default (token: string): Client => {
  const createMethod = sendRequest(token)

  return {
    get token(): string { return token },

    getMe: createMethod('getMe'),
    getUpdates: createMethod('getUpdates'),
    setWebhook: createMethod('setWebhook'),
    sendMessage: createMethod('sendMessage'),
    forwardMessage: createMethod('forwardMessage'),
    sendPhoto: createMethod('sendPhoto'),
    sendAudio: createMethod('sendAudio'),
    sendDocument: createMethod('sendDocument'),
    sendVideo: createMethod('sendVideo'),
    sendVoice: createMethod('sendVoice'),
    sendVideoNote: createMethod('sendVideoNote'),
    sendMediaGroup: createMethod('sendMediaGroup'),
    sendLocation: createMethod('sendLocation'),
    editMessageLiveLocation: createMethod('editMessageLiveLocation'),
    stopMessageLiveLocation: createMethod('stopMessageLiveLocation'),
    sendVenue: createMethod('sendVenue'),
    sendContact: createMethod('sendContact'),
    sendChatAction: createMethod('sendChatAction'),
    getUserProfilePhotos: createMethod('getUserProfilePhotos'),
    getFile: createMethod('getFile'),
    kickChatMember: createMethod('kickChatMember'),
    unbanChatMember: createMethod('unbanChatMember'),
    restrictChatMember: createMethod('restrictChatMember'),
    promoteChatMember: createMethod('promoteChatMember'),
    exportChatInviteLink: createMethod('exportChatInviteLink'),
    setChatPhoto: createMethod('setChatPhoto'),
    deleteChatPhoto: createMethod('deleteChatPhoto'),
    setChatTitle: createMethod('setChatTitle'),
    setChatDescription: createMethod('setChatDescription'),
    pinChatMessage: createMethod('pinChatMessage'),
    unpinChatMessage: createMethod('unpinChatMessage'),
    leaveChat: createMethod('leaveChat'),
    getChat: createMethod('getChat'),
    getChatAdministrators: createMethod('getChatAdministrators'),
    getChatMembersCount: createMethod('getChatMembersCount'),
    getChatMember: createMethod('getChatMember'),
    setChatStickerSet: createMethod('setChatStickerSet'),
    deleteChatStickerSet: createMethod('deleteChatStickerSet'),
    answerCallbackQuery: createMethod('answerCallbackQuery'),
    editMessageText: createMethod('editMessageText'),
    editMessageCaption: createMethod('editMessageCaption'),
    editMessageReplyMarkup: createMethod('editMessageReplyMarkup'),
    deleteMessage: createMethod('deleteMessage'),
    sendSticker: createMethod('sendSticker'),
    getStickerSet: createMethod('getStickerSet'),
    uploadStickerFile: createMethod('uploadStickerFile'),
    createNewStickerSet: createMethod('createNewStickerSet'),
    addStickerToSet: createMethod('addStickerToSet'),
    setStickerPositionInSet: createMethod('setStickerPositionInSet'),
    deleteStickerFromSet: createMethod('deleteStickerFromSet'),
    answerInlineQuery: createMethod('answerInlineQuery'),
    sendInvoice: createMethod('sendInvoice'),
    answerShippingQuery: createMethod('answerShippingQuery'),
    answerPreCheckoutQuery: createMethod('answerPreCheckoutQuery'),
    sendGame: createMethod('sendGame'),
    setGameScore: createMethod('setGameScore'),
    getGameHighScores: createMethod('getGameHighScores'),
  }
}
