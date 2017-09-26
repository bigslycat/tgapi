/* @flow */

/* :: import { Observable } from 'rxjs/Observable' */

import type {
  Update,
  Message,
  InlineQuery,
  ChosenInlineResult,
  CallbackQuery,
  ShippingQuery,
  PreCheckoutQuery,
} from './generatedTypes'

export type UpdateType = (
  'message' | 'edited_message' | 'channel_post' | 'edited_channel_post' |
  'inline_query' | 'chosen_inline_result' |
  'callback_query' | 'shipping_query' | 'pre_checkout_query'
)

export type MessageUpdate = {
  type: 'message',
  update_id: number,
  message: Message,
}

export type EditedMessageUpdate = {
  type: 'edited_message',
  update_id: number,
  edited_message: Message,
}

export type ChannelPostUpdate = {
  type: 'channel_post',
  update_id: number,
  channel_post: Message,
}

export type EditedChannelPostUpdate = {
  type: 'edited_channel_post',
  update_id: number,
  edited_channel_post: Message,
}

export type InlineQueryUpdate = {
  type: 'inline_query',
  update_id: number,
  inline_query: InlineQuery,
}

export type ChosenInlineResultUpdate = {
  type: 'chosen_inline_result',
  update_id: number,
  chosen_inline_result: ChosenInlineResult,
}

export type CallbackQueryUpdate = {
  type: 'callback_query',
  update_id: number,
  callback_query: CallbackQuery,
}

export type ShippingQueryUpdate = {
  type: 'shipping_query',
  update_id: number,
  shipping_query: ShippingQuery,
}

export type PreCheckoutQueryUpdate = {
  type: 'pre_checkout_query',
  update_id: number,
  pre_checkout_query: PreCheckoutQuery,
}

export type TypedUpdate = (
  MessageUpdate |
  EditedMessageUpdate |
  ChannelPostUpdate |
  EditedChannelPostUpdate |
  InlineQueryUpdate |
  ChosenInlineResultUpdate |
  CallbackQueryUpdate |
  ShippingQueryUpdate |
  PreCheckoutQueryUpdate
)

export interface UpdateHandler {
  emit: (update: Update) => mixed,
}

export interface RxUpdateHandler extends UpdateHandler {
    update$: Observable<TypedUpdate>,

    message$: Observable<MessageUpdate>,
    editedMessage$: Observable<EditedMessageUpdate>,
    channelPost$: Observable<ChannelPostUpdate>,
    editedChannelPost$: Observable<EditedChannelPostUpdate>,
    inlineQuery$: Observable<InlineQueryUpdate>,
    chosenInlineResult$: Observable<ChosenInlineResultUpdate>,
    callbackQuery$: Observable<CallbackQueryUpdate>,
    shippingQuery$: Observable<ShippingQueryUpdate>,
    preCheckoutQuery$: Observable<PreCheckoutQueryUpdate>,
}

export type SpecRawType = {
  name: string,
  description: string[],
  fieldsData: string[][],
  fieldHeaders: string[],
}

export type SpecRawUnion = {
  name: string,
  description: string[],
  types: string[],
}

export type SpecRaw = {
  types: SpecRawType[],
  unions: SpecRawUnion[],
}

export type MethodSpec = {
  type: 'method',
  name: string,
  description: string[],
  fields: Array<{
    parameters: string,
    type: string,
    required: string,
    description: string,
  }>,
}

export type TypeSpecField = {
  field: string,
  type: string,
  description: string,
}

export type TypeSpec = {
  type: 'typedef',
  name: string,
  description: string[],
  fields: TypeSpecField[],
}

export type UnionSpec = {
  type: 'union',
  name: string,
  description: string[],
  types: string[],
}

export type UnknownSpec = {
  type: 'unknown',
  name: string,
  description: string[],
  fields: Array<{
    [key: string]: string,
  }>,
}

export type Spec = (
  MethodSpec |
  TypeSpec |
  UnionSpec |
  UnknownSpec
)

export type HttpStatusCode = (
  100 | 101 | 102 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 226 | 300 | 301 | 302 | 303 |
  304 | 305 | 306 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 |
  411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 422 | 423 | 424 | 426 | 428 | 429 | 431 | 434 |
  449 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 509 | 510 | 511 | 520 | 521 | 522 |
  523 | 524 | 525 | 526
)

export type HTTPStatusMessage = (
  'Continue' | 'Switching Protocols' | 'Processing' | 'OK' | 'Created' | 'Accepted' | 'Non' |
  'No Content' | 'Reset Content' | 'Partial Content' | 'Multi' | 'IM Used' | 'Multiple Choices' |
  'Moved Permanently' | 'Found' | 'See Other' | 'Not Modified' | 'Use Proxy' |
  'RESERVED in RFC 2616' | 'Temporary Redirect' | 'Permanent Redirect' | 'Bad Request' |
  'Unauthorized' | 'Payment Required' | 'Forbidden' | 'Not Found' | 'Method Not Allowed' |
  'Not Acceptable' | 'Proxy Authentication Required' | 'Request Timeout' | 'Conflict' | 'Gone' |
  'Length Required' | 'Precondition Failed' | 'Payload Too Large' | 'URI Too Long' |
  'Unsupported Media Type' | 'Range Not Satisfiable' | 'Expectation Failed' | 'I’m a teapot' |
  'Unprocessable Entity' | 'Locked' | 'Failed Dependency' | 'Upgrade Required' |
  'Precondition Required' | 'Too Many Requests' | 'Request Header Fields Too Large' |
  'Requested host unavailable' | 'Retry With' | 'Unavailable For Legal Reasons' |
  'Internal Server Error' | 'Not Implemented' | 'Bad Gateway' | 'Service Unavailable' |
  'Gateway Timeout' | 'HTTP Version Not Supported' | 'Variant Also Negotiates' |
  'Insufficient Storage' | 'Bandwidth Limit Exceeded' | 'Not Extended' |
  'Network Authentication Required' | 'Unknown Error' | 'Web Server Is Down' |
  'Connection Timed Out' | 'Origin Is Unreachable' | 'A Timeout Occurred' |
  'SSL Handshake Failed' | 'Invalid SSL Certificate'
)
