/* @flow */

import FormData from 'form-data'

import { getToken, getUserCallMethod } from './privates'

export const callMethod = (
  client: Object,
  method: string,
  formData?: Object,
) => {
  const token = getToken(client)
  const url = `https://api.telegram.org/bot${token}/${method}`
  const userCallMethod = getUserCallMethod(client)

  if (!formData) return userCallMethod({ url, token, method })

  const body = new FormData()

  Object.entries(formData).forEach((prop: [string, any]) => {
    if (prop[1] != null) body.append(prop[0], prop[1])
  })

  return userCallMethod({ url, token, method, body })
}
