/* @flow */

import { getSet } from '../util'
import type { Result } from './types'

export type APIRequest = {
  token: string,
  method: string,
  url: string,
  body?: FormData,
}

type UserCallMethod = (apiRequest: APIRequest) => Promise<Result<any>>

export const [getToken, setToken] = getSet<string>('token')
export const [getUserCallMethod, setUserCallMethod] = getSet<UserCallMethod>(
  'userCallMethod',
)
