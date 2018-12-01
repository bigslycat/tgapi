/* @flow */

import { BotCore } from './generated'
import * as types from './types'
import * as privates from './privates'
import * as polling from './PollingSubscriber'
import { callMethod } from './defaultCallMethod'

export type Config =
  | string
  | {
      +token: string,
      +callMethod?: privates.APIRequest => Promise<types.Result<any>>,
    }

export class Bot extends BotCore {
  constructor(config: Config) {
    super()

    if (typeof config == 'string') {
      privates.setToken(this, config)
      privates.setUserCallMethod(this, callMethod)
    } else {
      privates.setToken(this, config.token)
      privates.setUserCallMethod(this, config.callMethod || callMethod)
    }
  }

  setToken(token: string): Bot {
    privates.setToken(this, token)
    return this
  }

  get token(): string {
    return privates.getToken(this)
  }

  polling(
    options: $Diff<polling.Options, { bot: BotCore }> = {},
  ): polling.PollingSubscriber {
    return new polling.PollingSubscriber({
      ...options,
      bot: this,
    })
  }
}
