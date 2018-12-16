# tgapi

[![Build Status][status-img]][status-url]
[![Greenkeeper badge](https://badges.greenkeeper.io/bigslycat/tgapi.svg)](https://greenkeeper.io/)

Actual Telegram bot API JS implementation

## Installation

- npm: `npm install --save tgapi`
- yarn: `yarn add tgapi`

## Usage

### Calling bot API methods

In order to send requests to API, we need to create the `Bot` instance.
The `Bot` is an object that contains [all bot API methods][Available methods].
Each bot API method returns a promise, on successful execution of which the
result will be the response object of the API server
[described][Making requests] in the documentation.

In this example, we call [getMe][] and [sendPhoto][] methods:

```javascript
const { Bot } = require('tgapi')
const fs = require('fs')

const bot = new Bot('<your bot token>')

bot
  .getMe()
  .then(console.log)

  // { ok: true,
  //   result: {
  //     id: 12345,
  //     is_bot: true,
  //     first_name: "My awesome bot",
  //     username: "myawesomebot" } }

const chat_id = 100500
const photo = fs.createReadStream('./path/to/photo.jpg')

bot
  .sendPhoto({ chat_id, photo })
  .then(console.log)

  // { ok: true, result: { Message object } }

bot
  .sendPhoto({
    chat_id,
    photo: fs.createReadStream('./path/to/photo.jpg'),
  })
  .then(console.log)

  // { ok: true, result: { Message object } }
```

Etc. for all other [methods][Available methods].

### Serializable method parameters

Telegram requires serializing some parameters of methods. You do not need to do
this, because this is done automatically.

### Working with updates

#### As `EventEmitter`

```js
// All options are optioal
const polling = bot.polling({
  limit: 50,
  timeout: 60,
  allowedUpdates: [ ... ],
})

polling.on('update', update => { ... })
polling.on('message', message => { ... })
polling.on('error', error => { ... })
```

#### As Observable stream

```js
const { from } = require('most')

const updates$ = from(polling)

const messages$ = updates$
  .map(update => update.message)
  .filter(Boolean)
```

[API]: https://core.telegram.org/bots/API
[Making requests]: https://core.telegram.org/bots/API#making-requests
[Available methods]: https://core.telegram.org/bots/API#available-methods
[getMe]: https://core.telegram.org/bots/API#getme
[getUpdates]: https://core.telegram.org/bots/API#getupdates
[sendPhoto]: https://core.telegram.org/bots/API#sendphoto
[Update]: https://core.telegram.org/bots/API#update

[Flow]: https://flow.org/

[status-url]: https://travis-ci.org/bigslycat/tgapi
[status-img]: https://travis-ci.org/bigslycat/tgapi.svg?branch=master
