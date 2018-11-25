/* @flow */

export const getSet = <T>(
  keyName?: string,
): [(instance: Object) => T, (instance: Object, value: T) => T] => {
  const key = Symbol(keyName)
  return [
    (instance: Object): any => instance[key],
    // eslint-disable-next-line no-param-reassign
    (instance: Object, value: any): any => (instance[key] = value),
  ]
}
