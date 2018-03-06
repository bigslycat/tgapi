# tgapi [![Build Status][status-img]][status-url]

Actual Telegram bot API with Rx-driven updates and full Flow type coverage

## Installation

- npm: `npm install --save tgapi`
- yarn: `yarn add tgapi`

## Usage

### Calling bot API methods

In order to send requests to API, we need to create the API client instance.
To do this, you need to use the `createBotClient` function:

`createBotClient(token: string) => Client`

The `Client` is an object that contains the immutable `token` property and
[all bot API methods][Available methods]. Each method returns a promise, on successful execution of
which the result will be the response object of the API server [described][Making requests] in the
documentation.

In this example, we call [getMe][] and [sendPhoto][] methods:

```javascript
const tg = require('tgapi')
const fs = require('fs')

const client = tg.createBotClient('<your bot token>')

client
  .getMe()
  .then(console.log)

  // { ok: true,
  //   result: {
  //     id: 12345,
  //     is_bot: true,
  //     first_name: "My awesome bot",
  //     username: "myawesomebot" } }

const chat_id = 100500
const photo = fs.readFileSync('./path/to/photo.jpg')

client
  .sendPhoto({ chat_id, photo })
  .then(console.log)

  // { ok: true, result: { Message object } }

client
  .sendPhoto({ chat_id, photo: {
    file: './path/to/photo.jpg',
    content_type: 'image/jpeg',
  } })
  .then(console.log)

  // { ok: true, result: { Message object } }
```

Etc. for all other [methods][Available methods].

### Working with updates

#### Long polling

`createUpdateSubscription(client, observer, options?: Options) => unsubscribeFn`

- `client` — *required* bot api client instance
- `observer` — *required* `Object`
  - `observer.next` — *required* `Function`, receives [Update][] object
  - `observer.error` — *optional* `Function`, receives error
- `options` — *optional* `Object`
  - `options.timeout` — *optional* `number`, long polling [timeout][getUpdates]
  - `options.allowedUpdates` — *optional* `Array<string>`, allowed [update types][getUpdates]

```javascript
const listener = (err, update) => {
  if (err) console.error(err)
  else console.log('Update id is', update.update_id)
}

const options = {
  timeout: 60,
  allowedUpdates: [
    'message',
    'edited_message',
  ],
}

const unsubscribe = tg.createUpdateSubscription(client, listener, options)
```

#### [Express][] or [Connect][] middleware

`createMiddleware(observer)`

- `observer` — *required* `Object`
  - `observer.next` — *required* `Function`, receives [Update][] object
  - `observer.error` — *optional* `Function`, receives error

```javascript
const app = express()

app.post(
  '/secret/bot/path',
  tg.createMiddleware(observer),
)

app.listen(3000)
```

#### Pure node [HTTP][] server

```javascript
const server = tg.createWebhookServer(observer, '/secret/bot/path')

server.listen(3000)
```

#### Rx

Obviously, you can use any observer for handling updates. For example, the instance of the
[Subject][] from [rxjs][]. In addition, there is another tool that can simplify the work with
updates in the [Observable streams][rx]:

`createUpdateObserver() => UpdateObserver`

```javascript
const observer = {
  next: update => console.log('Update id is', update.update_id),
  error: console.error,
}

const options = { timeout: 60 }

const unsubscribe = tg.createUpdateSubscription(client, observer, options)
```

##### UpdateObserver instance

100% [Flow][] coverage. Have methods `next`, `error`, `complete` like classic Observer.
In addition, `UpdateObserver` have this `Observable` instances:

- `update$` — `Observable` of all types updates
- `message$` — `Observable` of `message` updates
- `editedMessage$` — `Observable` of `editedMessage` updates
- `channelPost$` — `Observable` of `channelPost` updates
- `editedChannelPost$` — `Observable` of `editedChannelPost` updates
- `inlineQuery$` — `Observable` of `inlineQuery` updates
- `chosenInlineResult$` — `Observable` of `chosenInlineResult` updates
- `callbackQuery$` — `Observable` of `callbackQuery` updates
- `shippingQuery$` — `Observable` of `shippingQuery` updates
- `preCheckoutQuery$` — `Observable` of `preCheckoutQuery` updates

Each update in all Observables is supplemented by the `type` field, which can be one of the
following values:

- `message`
- `edited_message`
- `channel_post`
- `edited_channel_post`
- `inline_query`
- `chosen_inline_result`
- `callback_query`
- `shipping_query`
- `pre_checkout_query`

```javascript
const { Observable } = require('rxjs')

const tg = require('tgapi')

const client = tg.createBotClient('<your bot token>')
const observer = tg.createUpdateObserver()

// Create subscriber that get updates by long polling using bot client
// and emit it to observer
const unsubscribe = tg.createUpdateSubscription(client, observer)

// Our helpers
const equals = left => right => left === right
const isHaveText = message => !!message.text
const isHaveEntities = message => !!message.entities
const isBotCommand = entity => entity.type === 'bot_command'
const getEntityValue = text => entity => text.substr(entity.offset, entity.length)
const getCommands = message => message.entities
  .filter(isBotCommand)
  .map(getEntityValue(message.text))

// Using updates observer

// Subscribe to text messages and print it
observer.message$
  .pluck('message')
  .pluck('text')
  .filter(Boolean)
  .subscribe(
    text => console.log('New message: %s!', text),
  )

// Subscribe to /go_sleep command and turn off long polling after reseived first of
observer.message$
  .pluck('message')
  .filter(isHaveText)
  .filter(isHaveEntities)
  .map(getCommands)
  .mergeMap(Observable.from)
  .filter(equals('/go_sleep'))
  .do(() => console.log('Good night my darling'))
  .subscribe(unsubscribe)
```

[API]: https://core.telegram.org/bots/API
[Making requests]: https://core.telegram.org/bots/API#making-requests
[Available methods]: https://core.telegram.org/bots/API#available-methods
[getMe]: https://core.telegram.org/bots/API#getme
[getUpdates]: https://core.telegram.org/bots/API#getupdates
[sendPhoto]: https://core.telegram.org/bots/API#sendphoto
[Update]: https://core.telegram.org/bots/API#update

[Express]: https://github.com/expressjs/express
[Connect]: https://github.com/senchalabs/connect
[HTTP]: https://nodejs.org/api/http.html

[Subject]: http://reactivex.io/rxjs/class/es6/Subject.js~Subject.html
[rx]: http://reactivex.io/
[Flow]: https://flow.org/
[rxjs]: https://github.com/ReactiveX/rxjs

[status-url]: https://travis-ci.org/bigslycat/tgapi
[status-img]: https://travis-ci.org/bigslycat/tgapi.svg?branch=master
