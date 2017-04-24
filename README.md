# tgapi

Telegram bot API. Flow-compatible. Without unnecessary explicit dependencies in runtime.

- [Installation](#installation)
- [Usage](#usage)
  - [Advansed usage](#advansed-usage)
  - [Webhooks](#webhooks)
- [Reaction Promises](#reaction-promises)
- [Events](#events)
  - [`updateReceived`](#updatereceived-event)
  - [`commandReceived`](#commandreceived-event)
  - [`commandReceived/<command>`](#commandreceivedcommand-event)
  - [`inlineButtonPressed`](#inlinebuttonpressed-event)
  - [`inlineButtonPressed/<buttonId>`](#inlinebuttonpressedbuttonid-event)
- [Types](#types)
  - [`CommandEvent`][CommandEvent]
  - [`ButtonPressedEvent`][ButtonPressedEvent]
  - [`CertainButtonPressedEvent`][CertainButtonPressedEvent]
- [Native API methods support](#native-api-methods-support)

## Installation

```
npm install --save tgapi
```

## Usage

```javascript

import BotClient from 'tgapi';
import sendRequest from 'tgapi/sendRequest';

const token = 'bla-bla-bla';

const bot = new BotClient(token, sendRequest);

bot.getMe()
  .then(userObject => console.log(userObject));

bot.getUpdates({ offset: 100500 })
  .then(updatesArray => console.log(updatesArray));
```

`sendRequest` is the default implementation of the method of sending http requests to Telegram
server. You can to use another. `sendRequest` must receive the bot token as first argument and
Telegram API method parameters and must returns `Promise`.

### Advansed usage

```javascript
bot.on('updateReceived', update => console.log(update));

bot.startWatchUpdates(1);
// Will check updates each 1 second and emit updateReceived event
// after each one update.
```

### Webhooks

If you want to use webhooks, you can use this http-server:

```javascript
import BotClient from 'tgapi';
import sendRequest from 'tgapi/sendRequest';
import pureServer from 'tgapi/pureServer';

const bot = new BotClient('your token', sendRequest);

const server = pureServer(bot, 'your/webhook/path');

server.listen(80, () => console.log(
  'Webhook are available on http://localhost/your/webhook/path'
));

bot.on('updateReceived', update => console.log(update));
```

## Reaction Promises

A `BotClient` instance have the method `createReaction`. Method `createReaction` creates a promise
that will be resolved if the update predicate returns `true` or will be rejected if the timeout has
expired. Timeout default value is `300000` ms (5 min). You can disable timeout by setting this value
to `0`, but it creates memory leak danger.

```javascript
const predicate = (update) => (
  update &&
  update.message &&
  update.message.text === 'Hello'
);

                // Set timeout to 10 min
bot.createReaction(1000 * 60 * 10)(predicate)
  .then(update => bot.sendMessage({
    chat_id: update.message.chat.id,
    text: 'Hi!',
  }))
  .catch(() => console.log('Nobody wants to greet me. =('));
```

## Events

### `updateReceived` event

Emitted each any update. Receives [Update](https://core.telegram.org/bots/API#update) type.

### `commandReceived` event

Emitted each any bot command. Receives [CommandEvent](#commandevent-type) type.

### `commandReceived/<command>` event

Emitted each specific bot command. Receives [CommandEvent](#commandevent-type) type. Example:

```javascript
bot.on('commandReceived/start', sendHelloMessage);
```

### `inlineButtonPressed` event

Emitted each `callback_query` update. Receives [ButtonPressedEvent](#buttonpressedevent-type) type.

### `inlineButtonPressed/<buttonId>` event

Emitted each `callback_query` update with specified `buttonId`. Receives
[CertainButtonPressedEvent](#certainbuttonpressedevent-type) type. For emit this event
`callback_query.data` must be `JSON` object winth string or number `buttonId` property:

```json
{ "buttonId": 1,
  "anyAnotherProperty": "value" }
```

## Types

- [`CommandEvent` type][CommandEvent]
  - `update` — [Update](https://core.telegram.org/bots/API#update)
  - `command` — Command text. For example `/say` for message `/say Hey you!`
  - `args` — Text after command. For example `Hey you!` for message `/say Hey you!`
- [`ButtonPressedEvent` type][ButtonPressedEvent]
- [`CertainButtonPressedEvent` type][CertainButtonPressedEvent]

## Native API methods support

- [x] `getUpdates`
- [x] `setWebhook`
- [x] `deleteWebhook`
- [x] `getWebhookInfo`
- [x] `getMe`
- [x] `sendMessage`
- [x] `forwardMessage`
- [x] `sendPhoto`
- [x] `sendAudio`
- [x] `sendDocument`
- [x] `sendSticker`
- [x] `sendVideo`
- [x] `sendVoice`
- [x] `sendLocation`
- [x] `sendVenue`
- [x] `sendContact`
- [x] `sendChatAction`
- [x] `getUserProfilePhotos`
- [x] `getFile`
- [x] `kickChatMember`
- [x] `leaveChat`
- [x] `unbanChatMember`
- [x] `getChat`
- [x] `getChatAdministrators`
- [x] `getChatMembersCount`
- [x] `getChatMember`
- [x] `answerCallbackQuery`
- [ ] `answerInlineQuery`
- [ ] `sendGame`
- [ ] `setGameScore`
- [ ] `getGameHighScores`

[CommandEvent]: src/types/index.js#L15
[ButtonPressedEvent]: src/types/index.js#L21
[CertainButtonPressedEvent]: src/types/index.js#L26
