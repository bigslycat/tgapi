/* @flow */

import getMethodURL from './helpers/getMethodURL'

import type {
  Res,
  BotAPIClient,
} from './generatedTypes'

export type SendRequest = (url: string, body?: Object) => Res<any>

export interface Client extends BotAPIClient {
  +token: string,
}

export default (token: string, sendRequest: SendRequest): Client => {
  const getUrl = getMethodURL(token)

  const createMethod = (methodName: string) => {
    const url = getUrl(methodName)
    return (params?: Object): Res<any> => sendRequest(url, params)
  }

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
    sendLocation: createMethod('sendLocation'),
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