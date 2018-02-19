/* @flow */

import rp from 'request-promise'

import type {
  Res,
  BotAPIClient,
} from './generatedTypes'

export interface Client extends BotAPIClient {
  +token: string,
}

type RequestBody = { [prop: string]: any }

const sendRequest =
  (url: string, body?: RequestBody): Res<any> => rp({
    uri: url,
    json: true,
    formData: body,
  })

const getMethodURL =
  (token: string) => (methodName: string): string =>
    `https://api.telegram.org/bot${token}/${methodName}`

export default (token: string): Client => {
  const getUrl = getMethodURL(token)

  const createMethod = (methodName: string) => {
    const url = getUrl(methodName)
    return (params?: RequestBody): Res<any> => sendRequest(url, params)
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
