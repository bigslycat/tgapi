/* @flow */

/* :: 
import * as t from '../types'
import * as a from './apiTypes'
import * as r from '../returnTypes'
*/

import { callMethod } from '../callMethod'

export class BotCore {
  /**
   * getUpdates
   *
   * Use this method to receive incoming updates using long polling (wiki). An
   * Array of Update objects is returned.
   */
  getUpdates(
    props: {
      /**
       * Identifier of the first update to be returned. Must be greater by one
       * than the highest among the identifiers of previously received updates.
       * By default, updates starting with the earliest unconfirmed update are
       * returned. An update is considered confirmed as soon as getUpdates is
       * called with an offset higher than its update_id. The negative offset can
       * be specified to retrieve updates starting from -offset update from the
       * end of the updates queue. All previous updates will forgotten.
       */
      offset?: number,

      /**
       * Limits the number of updates to be retrieved. Values between 1—100 are
       * accepted. Defaults to 100.
       */
      limit?: number,

      /**
       * Timeout in seconds for long polling. Defaults to 0, i.e. usual short
       * polling. Should be positive, short polling should be used for testing
       * purposes only.
       */
      timeout?: number,

      /**
       * List the types of updates you want your bot to receive. For example,
       * specify [“message”, “edited_channel_post”, “callback_query”] to only
       * receive updates of these types. See Update for a complete list of
       * available update types. Specify an empty list to receive all updates
       * regardless of type (default). If not specified, the previous setting
       * will be used.Please note that this parameter doesn't affect updates
       * created before the call to the getUpdates, so unwanted updates may be
       * received for a short period of time.
       */
      allowed_updates?: $ReadOnlyArray<string>,
    } = {},
  ): Promise<t.Result<r.GetUpdatesResult>> {
    return callMethod(this, 'getUpdates', props)
  }

  /**
   * setWebhook
   *
   * Use this method to specify a url and receive incoming updates via an
   * outgoing webhook. Whenever there is an update for the bot, we will send an
   * HTTPS POST request to the specified url, containing a JSON-serialized
   * Update. In case of an unsuccessful request, we will give up after a
   * reasonable amount of attempts. Returns True on success.
   *
   * If you'd like to make sure that the Webhook request comes from Telegram,
   * we recommend using a secret path in the URL, e.g.
   * https://www.example.com/<token>. Since nobody else knows your bot‘s token,
   * you can be pretty sure it’s us.
   */
  setWebhook(props: {
    /**
     * HTTPS url to send updates to. Use an empty string to remove webhook
     * integration
     */
    url: string,

    /**
     * Upload your public key certificate so that the root certificate in use
     * can be checked. See our self-signed guide for details.
     */
    certificate?: a.InputFile,

    /**
     * Maximum allowed number of simultaneous HTTPS connections to the webhook
     * for update delivery, 1-100. Defaults to 40. Use lower values to limit
     * the load on your bot‘s server, and higher values to increase your bot’s
     * throughput.
     */
    max_connections?: number,

    /**
     * List the types of updates you want your bot to receive. For example,
     * specify [“message”, “edited_channel_post”, “callback_query”] to only
     * receive updates of these types. See Update for a complete list of
     * available update types. Specify an empty list to receive all updates
     * regardless of type (default). If not specified, the previous setting
     * will be used.Please note that this parameter doesn't affect updates
     * created before the call to the setWebhook, so unwanted updates may be
     * received for a short period of time.
     */
    allowed_updates?: $ReadOnlyArray<string>,
  }): Promise<t.Result<r.SetWebhookResult>> {
    return callMethod(this, 'setWebhook', props)
  }

  /**
   * deleteWebhook
   *
   * Use this method to remove webhook integration if you decide to switch back
   * to getUpdates. Returns True on success. Requires no parameters.
   */
  deleteWebhook(): Promise<t.Result<r.DeleteWebhookResult>> {
    return callMethod(this, 'deleteWebhook')
  }

  /**
   * getWebhookInfo
   *
   * Use this method to get current webhook status. Requires no parameters. On
   * success, returns a WebhookInfo object. If the bot is using getUpdates,
   * will return an object with the url field empty.
   */
  getWebhookInfo(): Promise<t.Result<r.GetWebhookInfoResult>> {
    return callMethod(this, 'getWebhookInfo')
  }

  /**
   * getMe
   *
   * A simple method for testing your bot's auth token. Requires no parameters.
   * Returns basic information about the bot in form of a User object.
   */
  getMe(): Promise<t.Result<r.GetMeResult>> {
    return callMethod(this, 'getMe')
  }

  /**
   * sendMessage
   *
   * Use this method to send text messages. On success, the sent Message is
   * returned.
   */
  sendMessage(props: {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Text of the message to be sent
     */
    text: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in your bot's message.
     */
    parse_mode?: string,

    /**
     * Disables link previews for links in this message
     */
    disable_web_page_preview?: boolean,

    /**
     * Sends the message silently. Users will receive a notification with no
     * sound.
     */
    disable_notification?: boolean,

    /**
     * If the message is a reply, ID of the original message
     */
    reply_to_message_id?: number,

    /**
     * Additional interface options. A JSON-serialized object for an inline
     * keyboard, custom reply keyboard, instructions to remove reply keyboard
     * or to force a reply from the user.
     */
    reply_markup?:
      | a.InlineKeyboardMarkup
      | a.ReplyKeyboardMarkup
      | a.ReplyKeyboardRemove
      | a.ForceReply,
  }): Promise<t.Result<r.SendMessageResult>> {
    return callMethod(this, 'sendMessage', {
      ...props,
      reply_markup: props.reply_markup && JSON.stringify(props.reply_markup),
    })
  }

  /**
   * forwardMessage
   *
   * Use this method to forward messages of any kind. On success, the sent
   * Message is returned.
   */
  forwardMessage(props: {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Unique identifier for the chat where the original message was sent (or
     * channel username in the format @channelusername)
     */
    from_chat_id: number | string,

    /**
     * Sends the message silently. Users will receive a notification with no
     * sound.
     */
    disable_notification?: boolean,

    /**
     * Message identifier in the chat specified in from_chat_id
     */
    message_id: number,
  }): Promise<t.Result<r.ForwardMessageResult>> {
    return callMethod(this, 'forwardMessage', props)
  }

  /**
   * sendPhoto
   *
   * Use this method to send photos. On success, the sent Message is returned.
   */
  sendPhoto(props: {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Photo to send. Pass a file_id as String to send a photo that exists on
     * the Telegram servers (recommended), pass an HTTP URL as a String for
     * Telegram to get a photo from the Internet, or upload a new photo using
     * multipart/form-data. More info on Sending Files »
     */
    photo: a.InputFile | string,

    /**
     * Photo caption (may also be used when resending photos by file_id),
     * 0-1024 characters
     */
    caption?: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in the media caption.
     */
    parse_mode?: string,

    /**
     * Sends the message silently. Users will receive a notification with no
     * sound.
     */
    disable_notification?: boolean,

    /**
     * If the message is a reply, ID of the original message
     */
    reply_to_message_id?: number,

    /**
     * Additional interface options. A JSON-serialized object for an inline
     * keyboard, custom reply keyboard, instructions to remove reply keyboard
     * or to force a reply from the user.
     */
    reply_markup?:
      | a.InlineKeyboardMarkup
      | a.ReplyKeyboardMarkup
      | a.ReplyKeyboardRemove
      | a.ForceReply,
  }): Promise<t.Result<r.SendPhotoResult>> {
    return callMethod(this, 'sendPhoto', {
      ...props,
      reply_markup: props.reply_markup && JSON.stringify(props.reply_markup),
    })
  }

  /**
   * sendAudio
   *
   * Use this method to send audio files, if you want Telegram clients to
   * display them in the music player. Your audio must be in the .mp3 format.
   * On success, the sent Message is returned. Bots can currently send audio
   * files of up to 50 MB in size, this limit may be changed in the future.
   *
   * For sending voice messages, use the sendVoice method instead.
   */
  sendAudio(props: {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Audio file to send. Pass a file_id as String to send an audio file that
     * exists on the Telegram servers (recommended), pass an HTTP URL as a
     * String for Telegram to get an audio file from the Internet, or upload a
     * new one using multipart/form-data. More info on Sending Files »
     */
    audio: a.InputFile | string,

    /**
     * Audio caption, 0-1024 characters
     */
    caption?: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in the media caption.
     */
    parse_mode?: string,

    /**
     * Duration of the audio in seconds
     */
    duration?: number,

    /**
     * Performer
     */
    performer?: string,

    /**
     * Track name
     */
    title?: string,

    /**
     * Thumbnail of the file sent; can be ignored if thumbnail generation for
     * the file is supported server-side. The thumbnail should be in JPEG
     * format and less than 200 kB in size. A thumbnail‘s width and height
     * should not exceed 90. Ignored if the file is not uploaded using
     * multipart/form-data. Thumbnails can’t be reused and can be only uploaded
     * as a new file, so you can pass “attach://<file_attach_name>” if the
     * thumbnail was uploaded using multipart/form-data under
     * <file_attach_name>. More info on Sending Files »
     */
    thumb?: a.InputFile | string,

    /**
     * Sends the message silently. Users will receive a notification with no
     * sound.
     */
    disable_notification?: boolean,

    /**
     * If the message is a reply, ID of the original message
     */
    reply_to_message_id?: number,

    /**
     * Additional interface options. A JSON-serialized object for an inline
     * keyboard, custom reply keyboard, instructions to remove reply keyboard
     * or to force a reply from the user.
     */
    reply_markup?:
      | a.InlineKeyboardMarkup
      | a.ReplyKeyboardMarkup
      | a.ReplyKeyboardRemove
      | a.ForceReply,
  }): Promise<t.Result<r.SendAudioResult>> {
    return callMethod(this, 'sendAudio', {
      ...props,
      reply_markup: props.reply_markup && JSON.stringify(props.reply_markup),
    })
  }

  /**
   * sendDocument
   *
   * Use this method to send general files. On success, the sent Message is
   * returned. Bots can currently send files of any type of up to 50 MB in
   * size, this limit may be changed in the future.
   */
  sendDocument(props: {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * File to send. Pass a file_id as String to send a file that exists on the
     * Telegram servers (recommended), pass an HTTP URL as a String for
     * Telegram to get a file from the Internet, or upload a new one using
     * multipart/form-data. More info on Sending Files »
     */
    document: a.InputFile | string,

    /**
     * Thumbnail of the file sent; can be ignored if thumbnail generation for
     * the file is supported server-side. The thumbnail should be in JPEG
     * format and less than 200 kB in size. A thumbnail‘s width and height
     * should not exceed 90. Ignored if the file is not uploaded using
     * multipart/form-data. Thumbnails can’t be reused and can be only uploaded
     * as a new file, so you can pass “attach://<file_attach_name>” if the
     * thumbnail was uploaded using multipart/form-data under
     * <file_attach_name>. More info on Sending Files »
     */
    thumb?: a.InputFile | string,

    /**
     * Document caption (may also be used when resending documents by file_id),
     * 0-1024 characters
     */
    caption?: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in the media caption.
     */
    parse_mode?: string,

    /**
     * Sends the message silently. Users will receive a notification with no
     * sound.
     */
    disable_notification?: boolean,

    /**
     * If the message is a reply, ID of the original message
     */
    reply_to_message_id?: number,

    /**
     * Additional interface options. A JSON-serialized object for an inline
     * keyboard, custom reply keyboard, instructions to remove reply keyboard
     * or to force a reply from the user.
     */
    reply_markup?:
      | a.InlineKeyboardMarkup
      | a.ReplyKeyboardMarkup
      | a.ReplyKeyboardRemove
      | a.ForceReply,
  }): Promise<t.Result<r.SendDocumentResult>> {
    return callMethod(this, 'sendDocument', {
      ...props,
      reply_markup: props.reply_markup && JSON.stringify(props.reply_markup),
    })
  }

  /**
   * sendVideo
   *
   * Use this method to send video files, Telegram clients support mp4 videos
   * (other formats may be sent as Document). On success, the sent Message is
   * returned. Bots can currently send video files of up to 50 MB in size, this
   * limit may be changed in the future.
   */
  sendVideo(props: {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Video to send. Pass a file_id as String to send a video that exists on
     * the Telegram servers (recommended), pass an HTTP URL as a String for
     * Telegram to get a video from the Internet, or upload a new video using
     * multipart/form-data. More info on Sending Files »
     */
    video: a.InputFile | string,

    /**
     * Duration of sent video in seconds
     */
    duration?: number,

    /**
     * Video width
     */
    width?: number,

    /**
     * Video height
     */
    height?: number,

    /**
     * Thumbnail of the file sent; can be ignored if thumbnail generation for
     * the file is supported server-side. The thumbnail should be in JPEG
     * format and less than 200 kB in size. A thumbnail‘s width and height
     * should not exceed 90. Ignored if the file is not uploaded using
     * multipart/form-data. Thumbnails can’t be reused and can be only uploaded
     * as a new file, so you can pass “attach://<file_attach_name>” if the
     * thumbnail was uploaded using multipart/form-data under
     * <file_attach_name>. More info on Sending Files »
     */
    thumb?: a.InputFile | string,

    /**
     * Video caption (may also be used when resending videos by file_id),
     * 0-1024 characters
     */
    caption?: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in the media caption.
     */
    parse_mode?: string,

    /**
     * Pass True, if the uploaded video is suitable for streaming
     */
    supports_streaming?: boolean,

    /**
     * Sends the message silently. Users will receive a notification with no
     * sound.
     */
    disable_notification?: boolean,

    /**
     * If the message is a reply, ID of the original message
     */
    reply_to_message_id?: number,

    /**
     * Additional interface options. A JSON-serialized object for an inline
     * keyboard, custom reply keyboard, instructions to remove reply keyboard
     * or to force a reply from the user.
     */
    reply_markup?:
      | a.InlineKeyboardMarkup
      | a.ReplyKeyboardMarkup
      | a.ReplyKeyboardRemove
      | a.ForceReply,
  }): Promise<t.Result<r.SendVideoResult>> {
    return callMethod(this, 'sendVideo', {
      ...props,
      reply_markup: props.reply_markup && JSON.stringify(props.reply_markup),
    })
  }

  /**
   * sendAnimation
   *
   * Use this method to send animation files (GIF or H.264/MPEG-4 AVC video
   * without sound). On success, the sent Message is returned. Bots can
   * currently send animation files of up to 50 MB in size, this limit may be
   * changed in the future.
   */
  sendAnimation(props: {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Animation to send. Pass a file_id as String to send an animation that
     * exists on the Telegram servers (recommended), pass an HTTP URL as a
     * String for Telegram to get an animation from the Internet, or upload a
     * new animation using multipart/form-data. More info on Sending Files »
     */
    animation: a.InputFile | string,

    /**
     * Duration of sent animation in seconds
     */
    duration?: number,

    /**
     * Animation width
     */
    width?: number,

    /**
     * Animation height
     */
    height?: number,

    /**
     * Thumbnail of the file sent; can be ignored if thumbnail generation for
     * the file is supported server-side. The thumbnail should be in JPEG
     * format and less than 200 kB in size. A thumbnail‘s width and height
     * should not exceed 90. Ignored if the file is not uploaded using
     * multipart/form-data. Thumbnails can’t be reused and can be only uploaded
     * as a new file, so you can pass “attach://<file_attach_name>” if the
     * thumbnail was uploaded using multipart/form-data under
     * <file_attach_name>. More info on Sending Files »
     */
    thumb?: a.InputFile | string,

    /**
     * Animation caption (may also be used when resending animation by
     * file_id), 0-1024 characters
     */
    caption?: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in the media caption.
     */
    parse_mode?: string,

    /**
     * Sends the message silently. Users will receive a notification with no
     * sound.
     */
    disable_notification?: boolean,

    /**
     * If the message is a reply, ID of the original message
     */
    reply_to_message_id?: number,

    /**
     * Additional interface options. A JSON-serialized object for an inline
     * keyboard, custom reply keyboard, instructions to remove reply keyboard
     * or to force a reply from the user.
     */
    reply_markup?:
      | a.InlineKeyboardMarkup
      | a.ReplyKeyboardMarkup
      | a.ReplyKeyboardRemove
      | a.ForceReply,
  }): Promise<t.Result<r.SendAnimationResult>> {
    return callMethod(this, 'sendAnimation', {
      ...props,
      reply_markup: props.reply_markup && JSON.stringify(props.reply_markup),
    })
  }

  /**
   * sendVoice
   *
   * Use this method to send audio files, if you want Telegram clients to
   * display the file as a playable voice message. For this to work, your audio
   * must be in an .ogg file encoded with OPUS (other formats may be sent as
   * Audio or Document). On success, the sent Message is returned. Bots can
   * currently send voice messages of up to 50 MB in size, this limit may be
   * changed in the future.
   */
  sendVoice(props: {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Audio file to send. Pass a file_id as String to send a file that exists
     * on the Telegram servers (recommended), pass an HTTP URL as a String for
     * Telegram to get a file from the Internet, or upload a new one using
     * multipart/form-data. More info on Sending Files »
     */
    voice: a.InputFile | string,

    /**
     * Voice message caption, 0-1024 characters
     */
    caption?: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in the media caption.
     */
    parse_mode?: string,

    /**
     * Duration of the voice message in seconds
     */
    duration?: number,

    /**
     * Sends the message silently. Users will receive a notification with no
     * sound.
     */
    disable_notification?: boolean,

    /**
     * If the message is a reply, ID of the original message
     */
    reply_to_message_id?: number,

    /**
     * Additional interface options. A JSON-serialized object for an inline
     * keyboard, custom reply keyboard, instructions to remove reply keyboard
     * or to force a reply from the user.
     */
    reply_markup?:
      | a.InlineKeyboardMarkup
      | a.ReplyKeyboardMarkup
      | a.ReplyKeyboardRemove
      | a.ForceReply,
  }): Promise<t.Result<r.SendVoiceResult>> {
    return callMethod(this, 'sendVoice', {
      ...props,
      reply_markup: props.reply_markup && JSON.stringify(props.reply_markup),
    })
  }

  /**
   * sendVideoNote
   *
   * As of v.4.0, Telegram clients support rounded square mp4 videos of up to 1
   * minute long. Use this method to send video messages. On success, the sent
   * Message is returned.
   */
  sendVideoNote(props: {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Video note to send. Pass a file_id as String to send a video note that
     * exists on the Telegram servers (recommended) or upload a new video using
     * multipart/form-data. More info on Sending Files ». Sending video notes
     * by a URL is currently unsupported
     */
    video_note: a.InputFile | string,

    /**
     * Duration of sent video in seconds
     */
    duration?: number,

    /**
     * Video width and height, i.e. diameter of the video message
     */
    length?: number,

    /**
     * Thumbnail of the file sent; can be ignored if thumbnail generation for
     * the file is supported server-side. The thumbnail should be in JPEG
     * format and less than 200 kB in size. A thumbnail‘s width and height
     * should not exceed 90. Ignored if the file is not uploaded using
     * multipart/form-data. Thumbnails can’t be reused and can be only uploaded
     * as a new file, so you can pass “attach://<file_attach_name>” if the
     * thumbnail was uploaded using multipart/form-data under
     * <file_attach_name>. More info on Sending Files »
     */
    thumb?: a.InputFile | string,

    /**
     * Sends the message silently. Users will receive a notification with no
     * sound.
     */
    disable_notification?: boolean,

    /**
     * If the message is a reply, ID of the original message
     */
    reply_to_message_id?: number,

    /**
     * Additional interface options. A JSON-serialized object for an inline
     * keyboard, custom reply keyboard, instructions to remove reply keyboard
     * or to force a reply from the user.
     */
    reply_markup?:
      | a.InlineKeyboardMarkup
      | a.ReplyKeyboardMarkup
      | a.ReplyKeyboardRemove
      | a.ForceReply,
  }): Promise<t.Result<r.SendVideoNoteResult>> {
    return callMethod(this, 'sendVideoNote', {
      ...props,
      reply_markup: props.reply_markup && JSON.stringify(props.reply_markup),
    })
  }

  /**
   * sendMediaGroup
   *
   * Use this method to send a group of photos or videos as an album. On
   * success, an array of the sent Messages is returned.
   */
  sendMediaGroup(props: {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * A JSON-serialized array describing photos and videos to be sent, must
     * include 2–10 items
     */
    media: $ReadOnlyArray<a.InputMediaPhoto | a.InputMediaVideo>,

    /**
     * Sends the messages silently. Users will receive a notification with no
     * sound.
     */
    disable_notification?: boolean,

    /**
     * If the messages are a reply, ID of the original message
     */
    reply_to_message_id?: number,
  }): Promise<t.Result<r.SendMediaGroupResult>> {
    return callMethod(this, 'sendMediaGroup', {
      ...props,
      media: props.media && JSON.stringify(props.media),
    })
  }

  /**
   * sendLocation
   *
   * Use this method to send point on the map. On success, the sent Message is
   * returned.
   */
  sendLocation(props: {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Latitude of the location
     */
    latitude: number,

    /**
     * Longitude of the location
     */
    longitude: number,

    /**
     * Period in seconds for which the location will be updated (see Live
     * Locations, should be between 60 and 86400.
     */
    live_period?: number,

    /**
     * Sends the message silently. Users will receive a notification with no
     * sound.
     */
    disable_notification?: boolean,

    /**
     * If the message is a reply, ID of the original message
     */
    reply_to_message_id?: number,

    /**
     * Additional interface options. A JSON-serialized object for an inline
     * keyboard, custom reply keyboard, instructions to remove reply keyboard
     * or to force a reply from the user.
     */
    reply_markup?:
      | a.InlineKeyboardMarkup
      | a.ReplyKeyboardMarkup
      | a.ReplyKeyboardRemove
      | a.ForceReply,
  }): Promise<t.Result<r.SendLocationResult>> {
    return callMethod(this, 'sendLocation', {
      ...props,
      reply_markup: props.reply_markup && JSON.stringify(props.reply_markup),
    })
  }

  /**
   * editMessageLiveLocation
   *
   * Use this method to edit live location messages sent by the bot or via the
   * bot (for inline bots). A location can be edited until its live_period
   * expires or editing is explicitly disabled by a call to
   * stopMessageLiveLocation. On success, if the edited message was sent by the
   * bot, the edited Message is returned, otherwise True is returned.
   */
  editMessageLiveLocation(props: {
    /**
     * Required if inline_message_id is not specified. Unique identifier for
     * the target chat or username of the target channel (in the format
     * @channelusername)
     */
    chat_id?: number | string,

    /**
     * Required if inline_message_id is not specified. Identifier of the sent
     * message
     */
    message_id?: number,

    /**
     * Required if chat_id and message_id are not specified. Identifier of the
     * inline message
     */
    inline_message_id?: string,

    /**
     * Latitude of new location
     */
    latitude: number,

    /**
     * Longitude of new location
     */
    longitude: number,

    /**
     * A JSON-serialized object for a new inline keyboard.
     */
    reply_markup?: a.InlineKeyboardMarkup,
  }): Promise<t.Result<r.EditMessageLiveLocationResult>> {
    return callMethod(this, 'editMessageLiveLocation', {
      ...props,
      reply_markup: props.reply_markup && JSON.stringify(props.reply_markup),
    })
  }

  /**
   * stopMessageLiveLocation
   *
   * Use this method to stop updating a live location message sent by the bot
   * or via the bot (for inline bots) before live_period expires. On success,
   * if the message was sent by the bot, the sent Message is returned,
   * otherwise True is returned.
   */
  stopMessageLiveLocation(
    props: {
      /**
       * Required if inline_message_id is not specified. Unique identifier for
       * the target chat or username of the target channel (in the format
       * @channelusername)
       */
      chat_id?: number | string,

      /**
       * Required if inline_message_id is not specified. Identifier of the sent
       * message
       */
      message_id?: number,

      /**
       * Required if chat_id and message_id are not specified. Identifier of the
       * inline message
       */
      inline_message_id?: string,

      /**
       * A JSON-serialized object for a new inline keyboard.
       */
      reply_markup?: a.InlineKeyboardMarkup,
    } = {},
  ): Promise<t.Result<r.StopMessageLiveLocationResult>> {
    return callMethod(this, 'stopMessageLiveLocation', {
      ...props,
      reply_markup: props.reply_markup && JSON.stringify(props.reply_markup),
    })
  }

  /**
   * sendVenue
   *
   * Use this method to send information about a venue. On success, the sent
   * Message is returned.
   */
  sendVenue(props: {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Latitude of the venue
     */
    latitude: number,

    /**
     * Longitude of the venue
     */
    longitude: number,

    /**
     * Name of the venue
     */
    title: string,

    /**
     * Address of the venue
     */
    address: string,

    /**
     * Foursquare identifier of the venue
     */
    foursquare_id?: string,

    /**
     * Foursquare type of the venue, if known. (For example,
     * “arts_entertainment/default”, “arts_entertainment/aquarium” or
     * “food/icecream”.)
     */
    foursquare_type?: string,

    /**
     * Sends the message silently. Users will receive a notification with no
     * sound.
     */
    disable_notification?: boolean,

    /**
     * If the message is a reply, ID of the original message
     */
    reply_to_message_id?: number,

    /**
     * Additional interface options. A JSON-serialized object for an inline
     * keyboard, custom reply keyboard, instructions to remove reply keyboard
     * or to force a reply from the user.
     */
    reply_markup?:
      | a.InlineKeyboardMarkup
      | a.ReplyKeyboardMarkup
      | a.ReplyKeyboardRemove
      | a.ForceReply,
  }): Promise<t.Result<r.SendVenueResult>> {
    return callMethod(this, 'sendVenue', {
      ...props,
      reply_markup: props.reply_markup && JSON.stringify(props.reply_markup),
    })
  }

  /**
   * sendContact
   *
   * Use this method to send phone contacts. On success, the sent Message is
   * returned.
   */
  sendContact(props: {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Contact's phone number
     */
    phone_number: string,

    /**
     * Contact's first name
     */
    first_name: string,

    /**
     * Contact's last name
     */
    last_name?: string,

    /**
     * Additional data about the contact in the form of a vCard, 0-2048 bytes
     */
    vcard?: string,

    /**
     * Sends the message silently. Users will receive a notification with no
     * sound.
     */
    disable_notification?: boolean,

    /**
     * If the message is a reply, ID of the original message
     */
    reply_to_message_id?: number,

    /**
     * Additional interface options. A JSON-serialized object for an inline
     * keyboard, custom reply keyboard, instructions to remove keyboard or to
     * force a reply from the user.
     */
    reply_markup?:
      | a.InlineKeyboardMarkup
      | a.ReplyKeyboardMarkup
      | a.ReplyKeyboardRemove
      | a.ForceReply,
  }): Promise<t.Result<r.SendContactResult>> {
    return callMethod(this, 'sendContact', {
      ...props,
      reply_markup: props.reply_markup && JSON.stringify(props.reply_markup),
    })
  }

  /**
   * sendChatAction
   *
   * Use this method when you need to tell the user that something is happening
   * on the bot's side. The status is set for 5 seconds or less (when a message
   * arrives from your bot, Telegram clients clear its typing status). Returns
   * True on success.
   *
   * We only recommend using this method when a response from the bot will take
   * a noticeable amount of time to arrive.
   */
  sendChatAction(props: {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Type of action to broadcast. Choose one, depending on what the user is
     * about to receive: typing for text messages, upload_photo for photos,
     * record_video or upload_video for videos, record_audio or upload_audio
     * for audio files, upload_document for general files, find_location for
     * location data, record_video_note or upload_video_note for video notes.
     */
    action: string,
  }): Promise<t.Result<r.SendChatActionResult>> {
    return callMethod(this, 'sendChatAction', props)
  }

  /**
   * getUserProfilePhotos
   *
   * Use this method to get a list of profile pictures for a user. Returns a
   * UserProfilePhotos object.
   */
  getUserProfilePhotos(props: {
    /**
     * Unique identifier of the target user
     */
    user_id: number,

    /**
     * Sequential number of the first photo to be returned. By default, all
     * photos are returned.
     */
    offset?: number,

    /**
     * Limits the number of photos to be retrieved. Values between 1—100 are
     * accepted. Defaults to 100.
     */
    limit?: number,
  }): Promise<t.Result<r.GetUserProfilePhotosResult>> {
    return callMethod(this, 'getUserProfilePhotos', props)
  }

  /**
   * getFile
   *
   * Use this method to get basic info about a file and prepare it for
   * downloading. For the moment, bots can download files of up to 20MB in
   * size. On success, a File object is returned. The file can then be
   * downloaded via the link
   * https://api.telegram.org/file/bot<token>/<file_path>, where <file_path> is
   * taken from the response. It is guaranteed that the link will be valid for
   * at least 1 hour. When the link expires, a new one can be requested by
   * calling getFile again.
   */
  getFile(props: {
    /**
     * File identifier to get info about
     */
    file_id: string,
  }): Promise<t.Result<r.GetFileResult>> {
    return callMethod(this, 'getFile', props)
  }

  /**
   * kickChatMember
   *
   * Use this method to kick a user from a group, a supergroup or a channel. In
   * the case of supergroups and channels, the user will not be able to return
   * to the group on their own using invite links, etc., unless unbanned first.
   * The bot must be an administrator in the chat for this to work and must
   * have the appropriate admin rights. Returns True on success.
   */
  kickChatMember(props: {
    /**
     * Unique identifier for the target group or username of the target
     * supergroup or channel (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Unique identifier of the target user
     */
    user_id: number,

    /**
     * Date when the user will be unbanned, unix time. If user is banned for
     * more than 366 days or less than 30 seconds from the current time they
     * are considered to be banned forever
     */
    until_date?: number,
  }): Promise<t.Result<r.KickChatMemberResult>> {
    return callMethod(this, 'kickChatMember', props)
  }

  /**
   * unbanChatMember
   *
   * Use this method to unban a previously kicked user in a supergroup or
   * channel. The user will not return to the group or channel automatically,
   * but will be able to join via link, etc. The bot must be an administrator
   * for this to work. Returns True on success.
   */
  unbanChatMember(props: {
    /**
     * Unique identifier for the target group or username of the target
     * supergroup or channel (in the format @username)
     */
    chat_id: number | string,

    /**
     * Unique identifier of the target user
     */
    user_id: number,
  }): Promise<t.Result<r.UnbanChatMemberResult>> {
    return callMethod(this, 'unbanChatMember', props)
  }

  /**
   * restrictChatMember
   *
   * Use this method to restrict a user in a supergroup. The bot must be an
   * administrator in the supergroup for this to work and must have the
   * appropriate admin rights. Pass True for all boolean parameters to lift
   * restrictions from a user. Returns True on success.
   */
  restrictChatMember(props: {
    /**
     * Unique identifier for the target chat or username of the target
     * supergroup (in the format @supergroupusername)
     */
    chat_id: number | string,

    /**
     * Unique identifier of the target user
     */
    user_id: number,

    /**
     * Date when restrictions will be lifted for the user, unix time. If user
     * is restricted for more than 366 days or less than 30 seconds from the
     * current time, they are considered to be restricted forever
     */
    until_date?: number,

    /**
     * Pass True, if the user can send text messages, contacts, locations and
     * venues
     */
    can_send_messages?: boolean,

    /**
     * Pass True, if the user can send audios, documents, photos, videos, video
     * notes and voice notes, implies can_send_messages
     */
    can_send_media_messages?: boolean,

    /**
     * Pass True, if the user can send animations, games, stickers and use
     * inline bots, implies can_send_media_messages
     */
    can_send_other_messages?: boolean,

    /**
     * Pass True, if the user may add web page previews to their messages,
     * implies can_send_media_messages
     */
    can_add_web_page_previews?: boolean,
  }): Promise<t.Result<r.RestrictChatMemberResult>> {
    return callMethod(this, 'restrictChatMember', props)
  }

  /**
   * promoteChatMember
   *
   * Use this method to promote or demote a user in a supergroup or a channel.
   * The bot must be an administrator in the chat for this to work and must
   * have the appropriate admin rights. Pass False for all boolean parameters
   * to demote a user. Returns True on success.
   */
  promoteChatMember(props: {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Unique identifier of the target user
     */
    user_id: number,

    /**
     * Pass True, if the administrator can change chat title, photo and other
     * settings
     */
    can_change_info?: boolean,

    /**
     * Pass True, if the administrator can create channel posts, channels only
     */
    can_post_messages?: boolean,

    /**
     * Pass True, if the administrator can edit messages of other users and can
     * pin messages, channels only
     */
    can_edit_messages?: boolean,

    /**
     * Pass True, if the administrator can delete messages of other users
     */
    can_delete_messages?: boolean,

    /**
     * Pass True, if the administrator can invite new users to the chat
     */
    can_invite_users?: boolean,

    /**
     * Pass True, if the administrator can restrict, ban or unban chat members
     */
    can_restrict_members?: boolean,

    /**
     * Pass True, if the administrator can pin messages, supergroups only
     */
    can_pin_messages?: boolean,

    /**
     * Pass True, if the administrator can add new administrators with a subset
     * of his own privileges or demote administrators that he has promoted,
     * directly or indirectly (promoted by administrators that were appointed
     * by him)
     */
    can_promote_members?: boolean,
  }): Promise<t.Result<r.PromoteChatMemberResult>> {
    return callMethod(this, 'promoteChatMember', props)
  }

  /**
   * exportChatInviteLink
   *
   * Use this method to generate a new invite link for a chat; any previously
   * generated link is revoked. The bot must be an administrator in the chat
   * for this to work and must have the appropriate admin rights. Returns the
   * new invite link as String on success.
   */
  exportChatInviteLink(props: {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,
  }): Promise<t.Result<r.ExportChatInviteLinkResult>> {
    return callMethod(this, 'exportChatInviteLink', props)
  }

  /**
   * setChatPhoto
   *
   * Use this method to set a new profile photo for the chat. Photos can't be
   * changed for private chats. The bot must be an administrator in the chat
   * for this to work and must have the appropriate admin rights. Returns True
   * on success.
   */
  setChatPhoto(props: {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * New chat photo, uploaded using multipart/form-data
     */
    photo: a.InputFile,
  }): Promise<t.Result<r.SetChatPhotoResult>> {
    return callMethod(this, 'setChatPhoto', props)
  }

  /**
   * deleteChatPhoto
   *
   * Use this method to delete a chat photo. Photos can't be changed for
   * private chats. The bot must be an administrator in the chat for this to
   * work and must have the appropriate admin rights. Returns True on success.
   */
  deleteChatPhoto(props: {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,
  }): Promise<t.Result<r.DeleteChatPhotoResult>> {
    return callMethod(this, 'deleteChatPhoto', props)
  }

  /**
   * setChatTitle
   *
   * Use this method to change the title of a chat. Titles can't be changed for
   * private chats. The bot must be an administrator in the chat for this to
   * work and must have the appropriate admin rights. Returns True on success.
   */
  setChatTitle(props: {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * New chat title, 1-255 characters
     */
    title: string,
  }): Promise<t.Result<r.SetChatTitleResult>> {
    return callMethod(this, 'setChatTitle', props)
  }

  /**
   * setChatDescription
   *
   * Use this method to change the description of a supergroup or a channel.
   * The bot must be an administrator in the chat for this to work and must
   * have the appropriate admin rights. Returns True on success.
   */
  setChatDescription(props: {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * New chat description, 0-255 characters
     */
    description?: string,
  }): Promise<t.Result<r.SetChatDescriptionResult>> {
    return callMethod(this, 'setChatDescription', props)
  }

  /**
   * pinChatMessage
   *
   * Use this method to pin a message in a supergroup or a channel. The bot
   * must be an administrator in the chat for this to work and must have the
   * ‘can_pin_messages’ admin right in the supergroup or ‘can_edit_messages’
   * admin right in the channel. Returns True on success.
   */
  pinChatMessage(props: {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Identifier of a message to pin
     */
    message_id: number,

    /**
     * Pass True, if it is not necessary to send a notification to all chat
     * members about the new pinned message. Notifications are always disabled
     * in channels.
     */
    disable_notification?: boolean,
  }): Promise<t.Result<r.PinChatMessageResult>> {
    return callMethod(this, 'pinChatMessage', props)
  }

  /**
   * unpinChatMessage
   *
   * Use this method to unpin a message in a supergroup or a channel. The bot
   * must be an administrator in the chat for this to work and must have the
   * ‘can_pin_messages’ admin right in the supergroup or ‘can_edit_messages’
   * admin right in the channel. Returns True on success.
   */
  unpinChatMessage(props: {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,
  }): Promise<t.Result<r.UnpinChatMessageResult>> {
    return callMethod(this, 'unpinChatMessage', props)
  }

  /**
   * leaveChat
   *
   * Use this method for your bot to leave a group, supergroup or channel.
   * Returns True on success.
   */
  leaveChat(props: {
    /**
     * Unique identifier for the target chat or username of the target
     * supergroup or channel (in the format @channelusername)
     */
    chat_id: number | string,
  }): Promise<t.Result<r.LeaveChatResult>> {
    return callMethod(this, 'leaveChat', props)
  }

  /**
   * getChat
   *
   * Use this method to get up to date information about the chat (current name
   * of the user for one-on-one conversations, current username of a user,
   * group or channel, etc.). Returns a Chat object on success.
   */
  getChat(props: {
    /**
     * Unique identifier for the target chat or username of the target
     * supergroup or channel (in the format @channelusername)
     */
    chat_id: number | string,
  }): Promise<t.Result<r.GetChatResult>> {
    return callMethod(this, 'getChat', props)
  }

  /**
   * getChatAdministrators
   *
   * Use this method to get a list of administrators in a chat. On success,
   * returns an Array of ChatMember objects that contains information about all
   * chat administrators except other bots. If the chat is a group or a
   * supergroup and no administrators were appointed, only the creator will be
   * returned.
   */
  getChatAdministrators(props: {
    /**
     * Unique identifier for the target chat or username of the target
     * supergroup or channel (in the format @channelusername)
     */
    chat_id: number | string,
  }): Promise<t.Result<r.GetChatAdministratorsResult>> {
    return callMethod(this, 'getChatAdministrators', props)
  }

  /**
   * getChatMembersCount
   *
   * Use this method to get the number of members in a chat. Returns Int on
   * success.
   */
  getChatMembersCount(props: {
    /**
     * Unique identifier for the target chat or username of the target
     * supergroup or channel (in the format @channelusername)
     */
    chat_id: number | string,
  }): Promise<t.Result<r.GetChatMembersCountResult>> {
    return callMethod(this, 'getChatMembersCount', props)
  }

  /**
   * getChatMember
   *
   * Use this method to get information about a member of a chat. Returns a
   * ChatMember object on success.
   */
  getChatMember(props: {
    /**
     * Unique identifier for the target chat or username of the target
     * supergroup or channel (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Unique identifier of the target user
     */
    user_id: number,
  }): Promise<t.Result<r.GetChatMemberResult>> {
    return callMethod(this, 'getChatMember', props)
  }

  /**
   * setChatStickerSet
   *
   * Use this method to set a new group sticker set for a supergroup. The bot
   * must be an administrator in the chat for this to work and must have the
   * appropriate admin rights. Use the field can_set_sticker_set optionally
   * returned in getChat requests to check if the bot can use this method.
   * Returns True on success.
   */
  setChatStickerSet(props: {
    /**
     * Unique identifier for the target chat or username of the target
     * supergroup (in the format @supergroupusername)
     */
    chat_id: number | string,

    /**
     * Name of the sticker set to be set as the group sticker set
     */
    sticker_set_name: string,
  }): Promise<t.Result<r.SetChatStickerSetResult>> {
    return callMethod(this, 'setChatStickerSet', props)
  }

  /**
   * deleteChatStickerSet
   *
   * Use this method to delete a group sticker set from a supergroup. The bot
   * must be an administrator in the chat for this to work and must have the
   * appropriate admin rights. Use the field can_set_sticker_set optionally
   * returned in getChat requests to check if the bot can use this method.
   * Returns True on success.
   */
  deleteChatStickerSet(props: {
    /**
     * Unique identifier for the target chat or username of the target
     * supergroup (in the format @supergroupusername)
     */
    chat_id: number | string,
  }): Promise<t.Result<r.DeleteChatStickerSetResult>> {
    return callMethod(this, 'deleteChatStickerSet', props)
  }

  /**
   * answerCallbackQuery
   *
   * Use this method to send answers to callback queries sent from inline
   * keyboards. The answer will be displayed to the user as a notification at
   * the top of the chat screen or as an alert. On success, True is returned.
   */
  answerCallbackQuery(props: {
    /**
     * Unique identifier for the query to be answered
     */
    callback_query_id: string,

    /**
     * Text of the notification. If not specified, nothing will be shown to the
     * user, 0-200 characters
     */
    text?: string,

    /**
     * If true, an alert will be shown by the client instead of a notification
     * at the top of the chat screen. Defaults to false.
     */
    show_alert?: boolean,

    /**
     * URL that will be opened by the user's client. If you have created a Game
     * and accepted the conditions via @Botfather, specify the URL that opens
     * your game – note that this will only work if the query comes from a
     * callback_game button.Otherwise, you may use links like
     * t.me/your_bot?start=XXXX that open your bot with a parameter.
     */
    url?: string,

    /**
     * The maximum amount of time in seconds that the result of the callback
     * query may be cached client-side. Telegram apps will support caching
     * starting in version 3.14. Defaults to 0.
     */
    cache_time?: number,
  }): Promise<t.Result<r.AnswerCallbackQueryResult>> {
    return callMethod(this, 'answerCallbackQuery', props)
  }

  /**
   * editMessageText
   *
   * Use this method to edit text and game messages sent by the bot or via the
   * bot (for inline bots). On success, if edited message is sent by the bot,
   * the edited Message is returned, otherwise True is returned.
   */
  editMessageText(props: {
    /**
     * Required if inline_message_id is not specified. Unique identifier for
     * the target chat or username of the target channel (in the format
     * @channelusername)
     */
    chat_id?: number | string,

    /**
     * Required if inline_message_id is not specified. Identifier of the sent
     * message
     */
    message_id?: number,

    /**
     * Required if chat_id and message_id are not specified. Identifier of the
     * inline message
     */
    inline_message_id?: string,

    /**
     * New text of the message
     */
    text: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in your bot's message.
     */
    parse_mode?: string,

    /**
     * Disables link previews for links in this message
     */
    disable_web_page_preview?: boolean,

    /**
     * A JSON-serialized object for an inline keyboard.
     */
    reply_markup?: a.InlineKeyboardMarkup,
  }): Promise<t.Result<r.EditMessageTextResult>> {
    return callMethod(this, 'editMessageText', {
      ...props,
      reply_markup: props.reply_markup && JSON.stringify(props.reply_markup),
    })
  }

  /**
   * editMessageCaption
   *
   * Use this method to edit captions of messages sent by the bot or via the
   * bot (for inline bots). On success, if edited message is sent by the bot,
   * the edited Message is returned, otherwise True is returned.
   */
  editMessageCaption(
    props: {
      /**
       * Required if inline_message_id is not specified. Unique identifier for
       * the target chat or username of the target channel (in the format
       * @channelusername)
       */
      chat_id?: number | string,

      /**
       * Required if inline_message_id is not specified. Identifier of the sent
       * message
       */
      message_id?: number,

      /**
       * Required if chat_id and message_id are not specified. Identifier of the
       * inline message
       */
      inline_message_id?: string,

      /**
       * New caption of the message
       */
      caption?: string,

      /**
       * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
       * fixed-width text or inline URLs in the media caption.
       */
      parse_mode?: string,

      /**
       * A JSON-serialized object for an inline keyboard.
       */
      reply_markup?: a.InlineKeyboardMarkup,
    } = {},
  ): Promise<t.Result<r.EditMessageCaptionResult>> {
    return callMethod(this, 'editMessageCaption', {
      ...props,
      reply_markup: props.reply_markup && JSON.stringify(props.reply_markup),
    })
  }

  /**
   * editMessageMedia
   *
   * Use this method to edit animation, audio, document, photo, or video
   * messages. If a message is a part of a message album, then it can be edited
   * only to a photo or a video. Otherwise, message type can be changed
   * arbitrarily. When inline message is edited, new file can't be uploaded.
   * Use previously uploaded file via its file_id or specify a URL. On success,
   * if the edited message was sent by the bot, the edited Message is returned,
   * otherwise True is returned.
   */
  editMessageMedia(props: {
    /**
     * Required if inline_message_id is not specified. Unique identifier for
     * the target chat or username of the target channel (in the format
     * @channelusername)
     */
    chat_id?: number | string,

    /**
     * Required if inline_message_id is not specified. Identifier of the sent
     * message
     */
    message_id?: number,

    /**
     * Required if chat_id and message_id are not specified. Identifier of the
     * inline message
     */
    inline_message_id?: string,

    /**
     * A JSON-serialized object for a new media content of the message
     */
    media: a.InputMedia,

    /**
     * A JSON-serialized object for a new inline keyboard.
     */
    reply_markup?: a.InlineKeyboardMarkup,
  }): Promise<t.Result<r.EditMessageMediaResult>> {
    return callMethod(this, 'editMessageMedia', {
      ...props,
      media: props.media && JSON.stringify(props.media),
      reply_markup: props.reply_markup && JSON.stringify(props.reply_markup),
    })
  }

  /**
   * editMessageReplyMarkup
   *
   * Use this method to edit only the reply markup of messages sent by the bot
   * or via the bot (for inline bots).  On success, if edited message is sent
   * by the bot, the edited Message is returned, otherwise True is returned.
   */
  editMessageReplyMarkup(
    props: {
      /**
       * Required if inline_message_id is not specified. Unique identifier for
       * the target chat or username of the target channel (in the format
       * @channelusername)
       */
      chat_id?: number | string,

      /**
       * Required if inline_message_id is not specified. Identifier of the sent
       * message
       */
      message_id?: number,

      /**
       * Required if chat_id and message_id are not specified. Identifier of the
       * inline message
       */
      inline_message_id?: string,

      /**
       * A JSON-serialized object for an inline keyboard.
       */
      reply_markup?: a.InlineKeyboardMarkup,
    } = {},
  ): Promise<t.Result<r.EditMessageReplyMarkupResult>> {
    return callMethod(this, 'editMessageReplyMarkup', {
      ...props,
      reply_markup: props.reply_markup && JSON.stringify(props.reply_markup),
    })
  }

  /**
   * deleteMessage
   *
   * Use this method to delete a message, including service messages, with the
   * following limitations:
   *
   * - A message can only be deleted if it was sent less than 48 hours ago.
   *
   * - Bots can delete outgoing messages in private chats, groups, and
   * supergroups.
   *
   * - Bots granted can_post_messages permissions can delete outgoing messages
   * in channels.
   *
   * - If the bot is an administrator of a group, it can delete any message
   * there.
   *
   * - If the bot has can_delete_messages permission in a supergroup or a
   * channel, it can delete any message there.
   *
   * Returns True on success.
   */
  deleteMessage(props: {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Identifier of the message to delete
     */
    message_id: number,
  }): Promise<t.Result<r.DeleteMessageResult>> {
    return callMethod(this, 'deleteMessage', props)
  }

  /**
   * sendSticker
   *
   * Use this method to send .webp stickers. On success, the sent Message is
   * returned.
   */
  sendSticker(props: {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Sticker to send. Pass a file_id as String to send a file that exists on
     * the Telegram servers (recommended), pass an HTTP URL as a String for
     * Telegram to get a .webp file from the Internet, or upload a new one
     * using multipart/form-data. More info on Sending Files »
     */
    sticker: a.InputFile | string,

    /**
     * Sends the message silently. Users will receive a notification with no
     * sound.
     */
    disable_notification?: boolean,

    /**
     * If the message is a reply, ID of the original message
     */
    reply_to_message_id?: number,

    /**
     * Additional interface options. A JSON-serialized object for an inline
     * keyboard, custom reply keyboard, instructions to remove reply keyboard
     * or to force a reply from the user.
     */
    reply_markup?:
      | a.InlineKeyboardMarkup
      | a.ReplyKeyboardMarkup
      | a.ReplyKeyboardRemove
      | a.ForceReply,
  }): Promise<t.Result<r.SendStickerResult>> {
    return callMethod(this, 'sendSticker', {
      ...props,
      reply_markup: props.reply_markup && JSON.stringify(props.reply_markup),
    })
  }

  /**
   * getStickerSet
   *
   * Use this method to get a sticker set. On success, a StickerSet object is
   * returned.
   */
  getStickerSet(props: {
    /**
     * Name of the sticker set
     */
    name: string,
  }): Promise<t.Result<r.GetStickerSetResult>> {
    return callMethod(this, 'getStickerSet', props)
  }

  /**
   * uploadStickerFile
   *
   * Use this method to upload a .png file with a sticker for later use in
   * createNewStickerSet and addStickerToSet methods (can be used multiple
   * times). Returns the uploaded File on success.
   */
  uploadStickerFile(props: {
    /**
     * User identifier of sticker file owner
     */
    user_id: number,

    /**
     * Png image with the sticker, must be up to 512 kilobytes in size,
     * dimensions must not exceed 512px, and either width or height must be
     * exactly 512px. More info on Sending Files »
     */
    png_sticker: a.InputFile,
  }): Promise<t.Result<r.UploadStickerFileResult>> {
    return callMethod(this, 'uploadStickerFile', props)
  }

  /**
   * createNewStickerSet
   *
   * Use this method to create new sticker set owned by a user. The bot will be
   * able to edit the created sticker set. Returns True on success.
   */
  createNewStickerSet(props: {
    /**
     * User identifier of created sticker set owner
     */
    user_id: number,

    /**
     * Short name of sticker set, to be used in t.me/addstickers/ URLs (e.g.,
     * animals). Can contain only english letters, digits and underscores. Must
     * begin with a letter, can't contain consecutive underscores and must end
     * in “_by_<bot username>”. <bot_username> is case insensitive. 1-64
     * characters.
     */
    name: string,

    /**
     * Sticker set title, 1-64 characters
     */
    title: string,

    /**
     * Png image with the sticker, must be up to 512 kilobytes in size,
     * dimensions must not exceed 512px, and either width or height must be
     * exactly 512px. Pass a file_id as a String to send a file that already
     * exists on the Telegram servers, pass an HTTP URL as a String for
     * Telegram to get a file from the Internet, or upload a new one using
     * multipart/form-data. More info on Sending Files »
     */
    png_sticker: a.InputFile | string,

    /**
     * One or more emoji corresponding to the sticker
     */
    emojis: string,

    /**
     * Pass True, if a set of mask stickers should be created
     */
    contains_masks?: boolean,

    /**
     * A JSON-serialized object for position where the mask should be placed on
     * faces
     */
    mask_position?: a.MaskPosition,
  }): Promise<t.Result<r.CreateNewStickerSetResult>> {
    return callMethod(this, 'createNewStickerSet', {
      ...props,
      mask_position: props.mask_position && JSON.stringify(props.mask_position),
    })
  }

  /**
   * addStickerToSet
   *
   * Use this method to add a new sticker to a set created by the bot. Returns
   * True on success.
   */
  addStickerToSet(props: {
    /**
     * User identifier of sticker set owner
     */
    user_id: number,

    /**
     * Sticker set name
     */
    name: string,

    /**
     * Png image with the sticker, must be up to 512 kilobytes in size,
     * dimensions must not exceed 512px, and either width or height must be
     * exactly 512px. Pass a file_id as a String to send a file that already
     * exists on the Telegram servers, pass an HTTP URL as a String for
     * Telegram to get a file from the Internet, or upload a new one using
     * multipart/form-data. More info on Sending Files »
     */
    png_sticker: a.InputFile | string,

    /**
     * One or more emoji corresponding to the sticker
     */
    emojis: string,

    /**
     * A JSON-serialized object for position where the mask should be placed on
     * faces
     */
    mask_position?: a.MaskPosition,
  }): Promise<t.Result<r.AddStickerToSetResult>> {
    return callMethod(this, 'addStickerToSet', {
      ...props,
      mask_position: props.mask_position && JSON.stringify(props.mask_position),
    })
  }

  /**
   * setStickerPositionInSet
   *
   * Use this method to move a sticker in a set created by the bot to a
   * specific position . Returns True on success.
   */
  setStickerPositionInSet(props: {
    /**
     * File identifier of the sticker
     */
    sticker: string,

    /**
     * New sticker position in the set, zero-based
     */
    position: number,
  }): Promise<t.Result<r.SetStickerPositionInSetResult>> {
    return callMethod(this, 'setStickerPositionInSet', props)
  }

  /**
   * deleteStickerFromSet
   *
   * Use this method to delete a sticker from a set created by the bot. Returns
   * True on success.
   */
  deleteStickerFromSet(props: {
    /**
     * File identifier of the sticker
     */
    sticker: string,
  }): Promise<t.Result<r.DeleteStickerFromSetResult>> {
    return callMethod(this, 'deleteStickerFromSet', props)
  }

  /**
   * answerInlineQuery
   *
   * Use this method to send answers to an inline query. On success, True is
   * returned.
   *
   * No more than 50 results per query are allowed.
   */
  answerInlineQuery(props: {
    /**
     * Unique identifier for the answered query
     */
    inline_query_id: string,

    /**
     * A JSON-serialized array of results for the inline query
     */
    results: $ReadOnlyArray<a.InlineQueryResult>,

    /**
     * The maximum amount of time in seconds that the result of the inline
     * query may be cached on the server. Defaults to 300.
     */
    cache_time?: number,

    /**
     * Pass True, if results may be cached on the server side only for the user
     * that sent the query. By default, results may be returned to any user who
     * sends the same query
     */
    is_personal?: boolean,

    /**
     * Pass the offset that a client should send in the next query with the
     * same text to receive more results. Pass an empty string if there are no
     * more results or if you don‘t support pagination. Offset length can’t
     * exceed 64 bytes.
     */
    next_offset?: string,

    /**
     * If passed, clients will display a button with specified text that
     * switches the user to a private chat with the bot and sends the bot a
     * start message with the parameter switch_pm_parameter
     */
    switch_pm_text?: string,

    /**
     * Deep-linking parameter for the /start message sent to the bot when user
     * presses the switch button. 1-64 characters, only A-Z, a-z, 0-9, _ and -
     * are allowed.Example: An inline bot that sends YouTube videos can ask the
     * user to connect the bot to their YouTube account to adapt search results
     * accordingly. To do this, it displays a ‘Connect your YouTube account’
     * button above the results, or even before showing any. The user presses
     * the button, switches to a private chat with the bot and, in doing so,
     * passes a start parameter that instructs the bot to return an oauth link.
     * Once done, the bot can offer a switch_inline button so that the user can
     * easily return to the chat where they wanted to use the bot's inline
     * capabilities.
     */
    switch_pm_parameter?: string,
  }): Promise<t.Result<r.AnswerInlineQueryResult>> {
    return callMethod(this, 'answerInlineQuery', {
      ...props,
      results: props.results && JSON.stringify(props.results),
    })
  }

  /**
   * sendInvoice
   *
   * Use this method to send invoices. On success, the sent Message is returned.
   */
  sendInvoice(props: {
    /**
     * Unique identifier for the target private chat
     */
    chat_id: number,

    /**
     * Product name, 1-32 characters
     */
    title: string,

    /**
     * Product description, 1-255 characters
     */
    description: string,

    /**
     * Bot-defined invoice payload, 1-128 bytes. This will not be displayed to
     * the user, use for your internal processes.
     */
    payload: string,

    /**
     * Payments provider token, obtained via Botfather
     */
    provider_token: string,

    /**
     * Unique deep-linking parameter that can be used to generate this invoice
     * when used as a start parameter
     */
    start_parameter: string,

    /**
     * Three-letter ISO 4217 currency code, see more on currencies
     */
    currency: string,

    /**
     * Price breakdown, a list of components (e.g. product price, tax,
     * discount, delivery cost, delivery tax, bonus, etc.)
     */
    prices: $ReadOnlyArray<a.LabeledPrice>,

    /**
     * JSON-encoded data about the invoice, which will be shared with the
     * payment provider. A detailed description of required fields should be
     * provided by the payment provider.
     */
    provider_data?: string,

    /**
     * URL of the product photo for the invoice. Can be a photo of the goods or
     * a marketing image for a service. People like it better when they see
     * what they are paying for.
     */
    photo_url?: string,

    /**
     * Photo size
     */
    photo_size?: number,

    /**
     * Photo width
     */
    photo_width?: number,

    /**
     * Photo height
     */
    photo_height?: number,

    /**
     * Pass True, if you require the user's full name to complete the order
     */
    need_name?: boolean,

    /**
     * Pass True, if you require the user's phone number to complete the order
     */
    need_phone_number?: boolean,

    /**
     * Pass True, if you require the user's email address to complete the order
     */
    need_email?: boolean,

    /**
     * Pass True, if you require the user's shipping address to complete the
     * order
     */
    need_shipping_address?: boolean,

    /**
     * Pass True, if user's phone number should be sent to provider
     */
    send_phone_number_to_provider?: boolean,

    /**
     * Pass True, if user's email address should be sent to provider
     */
    send_email_to_provider?: boolean,

    /**
     * Pass True, if the final price depends on the shipping method
     */
    is_flexible?: boolean,

    /**
     * Sends the message silently. Users will receive a notification with no
     * sound.
     */
    disable_notification?: boolean,

    /**
     * If the message is a reply, ID of the original message
     */
    reply_to_message_id?: number,

    /**
     * A JSON-serialized object for an inline keyboard. If empty, one 'Pay
     * total price' button will be shown. If not empty, the first button must
     * be a Pay button.
     */
    reply_markup?: a.InlineKeyboardMarkup,
  }): Promise<t.Result<r.SendInvoiceResult>> {
    return callMethod(this, 'sendInvoice', {
      ...props,
      reply_markup: props.reply_markup && JSON.stringify(props.reply_markup),
    })
  }

  /**
   * answerShippingQuery
   *
   * If you sent an invoice requesting a shipping address and the parameter
   * is_flexible was specified, the Bot API will send an Update with a
   * shipping_query field to the bot. Use this method to reply to shipping
   * queries. On success, True is returned.
   */
  answerShippingQuery(props: {
    /**
     * Unique identifier for the query to be answered
     */
    shipping_query_id: string,

    /**
     * Specify True if delivery to the specified address is possible and False
     * if there are any problems (for example, if delivery to the specified
     * address is not possible)
     */
    ok: boolean,

    /**
     * Required if ok is True. A JSON-serialized array of available shipping
     * options.
     */
    shipping_options?: $ReadOnlyArray<a.ShippingOption>,

    /**
     * Required if ok is False. Error message in human readable form that
     * explains why it is impossible to complete the order (e.g. "Sorry,
     * delivery to your desired address is unavailable'). Telegram will display
     * this message to the user.
     */
    error_message?: string,
  }): Promise<t.Result<r.AnswerShippingQueryResult>> {
    return callMethod(this, 'answerShippingQuery', {
      ...props,
      shipping_options:
        props.shipping_options && JSON.stringify(props.shipping_options),
    })
  }

  /**
   * answerPreCheckoutQuery
   *
   * Once the user has confirmed their payment and shipping details, the Bot
   * API sends the final confirmation in the form of an Update with the field
   * pre_checkout_query. Use this method to respond to such pre-checkout
   * queries. On success, True is returned. Note: The Bot API must receive an
   * answer within 10 seconds after the pre-checkout query was sent.
   */
  answerPreCheckoutQuery(props: {
    /**
     * Unique identifier for the query to be answered
     */
    pre_checkout_query_id: string,

    /**
     * Specify True if everything is alright (goods are available, etc.) and
     * the bot is ready to proceed with the order. Use False if there are any
     * problems.
     */
    ok: boolean,

    /**
     * Required if ok is False. Error message in human readable form that
     * explains the reason for failure to proceed with the checkout (e.g.
     * "Sorry, somebody just bought the last of our amazing black T-shirts
     * while you were busy filling out your payment details. Please choose a
     * different color or garment!"). Telegram will display this message to the
     * user.
     */
    error_message?: string,
  }): Promise<t.Result<r.AnswerPreCheckoutQueryResult>> {
    return callMethod(this, 'answerPreCheckoutQuery', props)
  }

  /**
   * setPassportDataErrors
   *
   * Informs a user that some of the Telegram Passport elements they provided
   * contains errors. The user will not be able to re-submit their Passport to
   * you until the errors are fixed (the contents of the field for which you
   * returned the error must change). Returns True on success.
   *
   * Use this if the data submitted by the user doesn't satisfy the standards
   * your service requires for any reason. For example, if a birthday date
   * seems invalid, a submitted document is blurry, a scan shows evidence of
   * tampering, etc. Supply some details in the error message to make sure the
   * user knows how to correct the issues.
   */
  setPassportDataErrors(props: {
    /**
     * User identifier
     */
    user_id: number,

    /**
     * A JSON-serialized array describing the errors
     */
    errors: $ReadOnlyArray<a.PassportElementError>,
  }): Promise<t.Result<r.SetPassportDataErrorsResult>> {
    return callMethod(this, 'setPassportDataErrors', {
      ...props,
      errors: props.errors && JSON.stringify(props.errors),
    })
  }

  /**
   * sendGame
   *
   * Use this method to send a game. On success, the sent Message is returned.
   */
  sendGame(props: {
    /**
     * Unique identifier for the target chat
     */
    chat_id: number,

    /**
     * Short name of the game, serves as the unique identifier for the game.
     * Set up your games via Botfather.
     */
    game_short_name: string,

    /**
     * Sends the message silently. Users will receive a notification with no
     * sound.
     */
    disable_notification?: boolean,

    /**
     * If the message is a reply, ID of the original message
     */
    reply_to_message_id?: number,

    /**
     * A JSON-serialized object for an inline keyboard. If empty, one ‘Play
     * game_title’ button will be shown. If not empty, the first button must
     * launch the game.
     */
    reply_markup?: a.InlineKeyboardMarkup,
  }): Promise<t.Result<r.SendGameResult>> {
    return callMethod(this, 'sendGame', {
      ...props,
      reply_markup: props.reply_markup && JSON.stringify(props.reply_markup),
    })
  }

  /**
   * setGameScore
   *
   * Use this method to set the score of the specified user in a game. On
   * success, if the message was sent by the bot, returns the edited Message,
   * otherwise returns True. Returns an error, if the new score is not greater
   * than the user's current score in the chat and force is False.
   */
  setGameScore(props: {
    /**
     * User identifier
     */
    user_id: number,

    /**
     * New score, must be non-negative
     */
    score: number,

    /**
     * Pass True, if the high score is allowed to decrease. This can be useful
     * when fixing mistakes or banning cheaters
     */
    force?: boolean,

    /**
     * Pass True, if the game message should not be automatically edited to
     * include the current scoreboard
     */
    disable_edit_message?: boolean,

    /**
     * Required if inline_message_id is not specified. Unique identifier for
     * the target chat
     */
    chat_id?: number,

    /**
     * Required if inline_message_id is not specified. Identifier of the sent
     * message
     */
    message_id?: number,

    /**
     * Required if chat_id and message_id are not specified. Identifier of the
     * inline message
     */
    inline_message_id?: string,
  }): Promise<t.Result<r.SetGameScoreResult>> {
    return callMethod(this, 'setGameScore', props)
  }

  /**
   * getGameHighScores
   *
   * Use this method to get data for high score tables. Will return the score
   * of the specified user and several of his neighbors in a game. On success,
   * returns an Array of GameHighScore objects.
   */
  getGameHighScores(props: {
    /**
     * Target user id
     */
    user_id: number,

    /**
     * Required if inline_message_id is not specified. Unique identifier for
     * the target chat
     */
    chat_id?: number,

    /**
     * Required if inline_message_id is not specified. Identifier of the sent
     * message
     */
    message_id?: number,

    /**
     * Required if chat_id and message_id are not specified. Identifier of the
     * inline message
     */
    inline_message_id?: string,
  }): Promise<t.Result<r.GetGameHighScoresResult>> {
    return callMethod(this, 'getGameHighScores', props)
  }
}
