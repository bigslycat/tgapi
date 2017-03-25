/* @flow */

type StreamReducer = (newData: Buffer) => StreamReducer;

const streamReducer = () => {
  const scope: string[] = [];

  const push: StreamReducer = (newData: Buffer) => {
    scope.push(newData.toString());
    return push;
  };

  // eslint-disable-next-line flowtype/no-weak-types
  (push: any).toString = () => scope.join('');

  return push;
};

export default streamReducer;
