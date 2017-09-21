/* @flow */

export default (
  (token: string) => (methodName: string): string =>
    `https://api.telegram.org/bot${token}/${methodName}`
)
