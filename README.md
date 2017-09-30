# tgapi

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
const photo = fs.createReadStream('./path/to/photo.jpg')

client
  .sendPhoto({ chat_id, photo })
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
const observer = {
  next: update => console.log('Update id is', update.update_id),
  error: console.error,
}

const options = {
  timeout: 2,
  allowedUpdates: [
    'message',
    'edited_message',
  ],
}

const unsubscribe = tg.createUpdateSubscription(client, observer, options)
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
[Subject][] from rxjs. In addition, there is another tool that can simplify the work with updates
in the [Observable streams][rx]:

`createUpdateObserver() => UpdateObserver`

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
