/* @flow */

import type {
  InlineQuery,
  ChosenInlineResult,
} from './inlineMode';

import type {
  Game,
  CallbackGame,
} from './games';

type UpdateBaseType = { update_id: number };

export type Update = UpdateBaseType & (
  { message: Message } |
  { edited_message: Message } |
  { channel_post: Message } |
  { edited_channel_post: Message } |
  { inline_query: InlineQuery } |
  { chosen_inline_result: ChosenInlineResult } |
  { callback_query: CallbackQuery }
);

export type UpdateType = 'message' | 'edited_message' | 'channel_post' | 'edited_channel_post' |
                         'inline_query' | 'chosen_inline_result' | 'callback_query';

export type WebhookInfo = {
  url: string,
  has_custom_certificate: boolean,
  pending_update_count: number,
  last_error_date?: number,
  last_error_message?: string,
  max_connections?: number,
  allowed_updates?: UpdateType[],
};

export type User = {
  id: number,
  first_name: string,
  last_name?: string,
  username?: string,
};

export type Chat = {
  id: number,
  type: 'private' | 'group' | 'supergroup' | 'channel',
  title?: string,
  username?: string,
  first_name?: string,
  last_name?: string,
  all_members_are_administrators?: boolean,
};

export type Message = {
  message_id: number,
  from?: User,
  date: number,
  chat: Chat,
  forward_from?: User,
  forward_from_chat?: Chat,
  forward_from_message_id?: number,
  forward_date?: number,
  reply_to_message?: Message,
  edit_date?: number,
  text?: string,
  entities?: MessageEntity[],
  audio?: Audio,
  document?: Document,
  game?: Game,
  photo?: PhotoSize[],
  sticker?: Sticker,
  video?: Video,
  voice?: Voice,
  caption?: string,
  contact?: Contact,
  location?: Location,
  venue?: Venue,
  new_chat_member?: User,
  left_chat_member?: User,
  new_chat_title?: string,
  new_chat_photo?: PhotoSize[],
  delete_chat_photo?: true,
  group_chat_created?: true,
  supergroup_chat_created?: true,
  channel_chat_created?: true,
  migrate_to_chat_id?: number,
  migrate_from_chat_id?: number,
  pinned_message?: Message,
};

type MessageEntityBaseType = {
  offset: number,
  length: number,
};

export type MessageEntity = MessageEntityBaseType & (
  { type: 'mention' | 'hashtag' | 'bot_command' | 'url' |
          'email' | 'bold' | 'italic' | 'code' | 'pre' }
  | { type: 'text_link', url: string }
  | { type: 'text_mention', user: User }
);

export type PhotoSize = {
  file_id: string,
  width: number,
  height: number,
  file_size?: number,
};

export type Audio = {
  file_id: string,
  duration: number,
  performer?: string,
  title?: string,
  mime_type?: string,
  file_size?: number,
};

export type Document = {
  file_id: string,
  thumb?: PhotoSize,
  file_name?: string,
  mime_type?: string,
  file_size?: number,
};

export type Sticker = {
  file_id: string,
  width: number,
  height: number,
  thumb?: PhotoSize,
  emoji?: string,
  file_size?: number,
};

export type Video = {
  file_id: string,
  width: number,
  height: number,
  duration: number,
  thumb?: PhotoSize,
  mime_type?: string,
  file_size?: number,
};

export type Voice = {
  file_id: string,
  duration: number,
  mime_type?: string,
  file_size?: number,
};

export type Contact = {
  phone_number: string,
  first_name: string,
  last_name?: string,
  user_id?: number,
};

export type Location = {
  longitude: number,
  latitude: number,
};

export type Venue = {
  location: Location,
  title: string,
  address: string,
  foursquare_id?: string,
};

export type UserProfilePhotos = {
  total_count: number,
  photos: PhotoSize[][],
};

export type File = {
  file_id: string,
  file_size?: number,
  file_path?: string,
};

export type ReplyKeyboardMarkup = {
  keyboard: KeyboardButton[][],
  resize_keyboard?: boolean,
  one_time_keyboard?: boolean,
  selective?: boolean,
};

export type KeyboardButton = {
  text: string,
  request_contact?: boolean,
  request_location?: boolean,
};

export type ReplyKeyboardRemove = {
  remove_keyboard: true,
  selective?: boolean,
};

export type InlineKeyboardMarkup = {
  inline_keyboard: InlineKeyboardButton[][],
};

export type InlineKeyboardButton = {
  text: string,
  url?: string,
  callback_data?: string,
  switch_inline_query?: string,
  switch_inline_query_current_chat?: string,
  callback_game?: CallbackGame,
};

export type CallbackQuery = {
  id: string,
  from: User,
  message?: Message,
  inline_message_id?: string,
  chat_instance: string,
  data?: string,
  game_short_name?: string,
};

export type ForceReply = {
  force_reply: true,
  selective?: boolean,
};

export type ChatMember = {
  user: User,
  status: 'creator' | 'administrator' | 'member' | 'left' | 'kicked',
};

export type ResponseParameters = {
  migrate_to_chat_id?: number,
  retry_after?: number,
};

export type InputFile = string;
