/* @flow */

/* eslint-env jest */
/* eslint flowtype/no-weak-types: off */

import BotClient from './';
import getLastUpdateId from './getLastUpdateId';
import type { SetTimeout, ClearTimeout } from './';

jest.useFakeTimers();

declare var setInterval: SetTimeout;
declare var clearInterval: ClearTimeout;

jest.mock('./getLastUpdateId');

type Descriptor = {
  writable: boolean,
  configurable: boolean,
  enumerable: boolean,
  value: any,
};

type DescriptorParams = {
  writable?: boolean,
  configurable?: boolean,
  enumerable?: boolean,
  value?: any,
};

const defaultDescriptor = {
  writable: false,
  configurable: false,
  enumerable: false,
  value: undefined,
};

const createDescriptor =
  (params: DescriptorParams): Descriptor =>
    ({ ...defaultDescriptor, ...params });

const plainCallMethods = [
  // [methodName: string, description: string, isHaveArgs: void | true],
  ['setWebhook', 'Specifies a url and receive incoming updates via an outgoing webhook', true],
  ['deleteWebhook', 'Removes webhook integration if you decide to switch back to getUpdates'],
  ['getWebhookInfo', 'Gets current webhook status'],
  ['getMe', 'Returns basic information about the bot'],
  ['sendMessage', 'Sends text messages', true],
  ['forwardMessage', 'Forwards messages of any kind', true],
  ['sendPhoto', 'Sends photos', true],
  ['sendAudio', 'Sends audio files', true],
  ['sendDocument', 'Sends general files', true],
  ['sendSticker', 'Sends .webp stickers', true],
  ['sendVideo', 'Sends video files', true],
  ['sendVoice', 'Sends audio files', true],
  ['sendLocation', 'Sends point on the map', true],
  ['sendVenue', 'Sends information about a venue', true],
  ['sendContact', 'Sends phone contacts', true],
  ['sendChatAction', 'Tells the user that something is happening on the bot\'s side', true],
  ['getUserProfilePhotos', 'Gets a list of profile pictures for a user', true],
  ['getFile', 'Gets basic info about a file and prepare it for downloading', true],
  ['kickChatMember', 'Kicks a user from a group or a supergroup', true],
  ['leaveChat', 'Leaves a group, supergroup or channel', true],
  ['unbanChatMember', 'Unbans a previously kicked user in a supergroup', true],
  ['getChat', 'Gets up to date information about the chat', true],
  ['getChatAdministrators', 'Gets a list of administrators in a chat', true],
  ['getChatMembersCount', 'Gets the number of members in a chat', true],
  ['getChatMember', 'Gets information about a member of a chat', true],
  ['answerCallbackQuery', 'Sends answers to callback queries sent from inline keyboards', true],
  ['editMessageText', 'Edits text and game messages sent by the bot or via the bot', true],
  ['editMessageCaption', 'Edits captions of messages sent by the bot or via the bot', true],
  ['editMessageReplyMarkup',
    'Edits only the reply markup of messages sent by the bot or via the bot', true],
];

const tests = [
  ['constructor', [
    ['Creates instance', () => {
      const token = 'token';
      const sendRequest: any = 'sendRequest';
      const bot = new BotClient(token, sendRequest);

      expect(Object.getOwnPropertyDescriptor(bot, 'token'))
        .toEqual(createDescriptor({ enumerable: true, value: token }));

      expect(Object.getOwnPropertyDescriptor(bot, 'sendRequest'))
        .toEqual(createDescriptor({ enumerable: true, value: sendRequest }));
    }],
  ]],
  ['createReaction', [
    ['Creates a promise that will be resolved if the update predicate returns true', async () => {
      const bot = {
        createReaction: BotClient.prototype.createReaction,
        on: jest.fn(),
        removeListener: jest.fn(),
      };

      const predicate = jest.fn().mockReturnValueOnce(true);

      const promise = bot.createReaction()(predicate);

      const listener = bot.on.mock.calls[0][1];

      listener('UPDATE');

      const result = await promise;

      expect(bot.on.mock.calls[0][0]).toBe('updateReceived');
      expect(predicate).lastCalledWith('UPDATE');
      expect(bot.on).lastCalledWith('updateReceived', listener);
      expect(result).toBe('UPDATE');
    }],
    ['Creates a promise that will be rejected if the timeout has expired', async () => {
      const bot = {
        createReaction: BotClient.prototype.createReaction,
        on: jest.fn(),
        removeListener: jest.fn(),
      };

      const predicate = jest.fn().mockReturnValueOnce(true);

      const promise = bot.createReaction()(predicate);

      expect.assertions(1);
      jest.runAllTimers();

      try {
        await promise;
      } catch (e) {
        expect(e).toEqual(new Error('timeout'));
      }
    }],
  ]],
  ['callMethod', [
    ['Call any bot API method', async () => {
      const result = 'result';
      const response = { ok: true, result };
      const error: any = { ok: false };
      const methodName: any = 'methodName';
      const args: any = 'args';

      const bot = {
        token: 'token',
        sendRequest: jest.fn()
          .mockReturnValueOnce(Promise.resolve(response))
          .mockReturnValueOnce(Promise.resolve(error)),
        method: BotClient.prototype.callMethod,
      };

      const url: any = `https://api.telegram.org/bot${bot.token}/${methodName}`;

      expect.assertions(3);

      expect(await bot.method(methodName, args)).toEqual(result);
      expect(bot.sendRequest)
        .lastCalledWith(url, args);

      try {
        await bot.method(methodName, args);
      } catch (e) {
        expect(e).toEqual(error);
      }
    }],
  ]],
  ['lastUpdateIdRefresh', [
    ['Updates lastUpdateId property', () => {
      (
        getLastUpdateId: any
      ).mockReturnValueOnce(1);

      const bot = {
        lastUpdateId: 0,
        lastUpdateIdRefresh: BotClient.prototype.lastUpdateIdRefresh,
      };

      bot.lastUpdateIdRefresh([]);

      expect(bot.lastUpdateId).toBe(0);
      expect(getLastUpdateId).toHaveBeenCalledTimes(0);

      bot.lastUpdateIdRefresh(([null]: any));

      expect(bot.lastUpdateId).toBe(1);
      expect(getLastUpdateId).toHaveBeenCalledTimes(1);
    }],
  ]],
  ['publishUpdates', [
    ['Emit a given updates as separate "updateReceived" events', () => {
      const bot = {
        emit: jest.fn(),
        publishUpdates: BotClient.prototype.publishUpdates,
      };

      const updates: any = ['update1', 'update2', 'update3'];

      bot.publishUpdates(updates);

      expect(bot.emit.mock.calls)
        .toEqual(updates.map(update => ['updateReceived', update]));
    }],
  ]],
  ['pullUpdates', [
    ['Get last updates from the server and publish it', async () => {
      const result = 'result';
      const error = 'error';

      const bot = Object.assign(new (BotClient: any)(), {
        emit: jest.fn(),
        getUpdates: jest.fn()
          .mockImplementationOnce(async () => result)
          // eslint-disable-next-line no-throw-literal
          .mockImplementationOnce(async () => { throw error }),
        publishUpdates: jest.fn(),
      });

      await bot.pullUpdates();

      expect(bot.publishUpdates).lastCalledWith(result);
      expect(bot.emit).toHaveBeenCalledTimes(0);

      bot.publishUpdates.mockReset();

      await bot.pullUpdates();

      expect(bot.publishUpdates).toHaveBeenCalledTimes(0);
      expect(bot.emit).lastCalledWith('getUpdatesError', error);
    }],
  ]],
  ['startWatchUpdates', [
    ['Starts updates watcher', () => {
      const bot = {
        watchUpdatesInterval: null,
        stopWatchUpdates: jest.fn(),
        pullUpdates: 'pullUpdates',
        startWatchUpdates: BotClient.prototype.startWatchUpdates,
      };

      setInterval.mockReturnValueOnce('firstInterval');
      setInterval.mockReturnValueOnce('secondInterval');

      bot.startWatchUpdates();

      expect(bot.stopWatchUpdates).toHaveBeenCalledTimes(1);
      expect(setInterval).lastCalledWith(bot.pullUpdates, 5000);
      expect(bot.watchUpdatesInterval).toEqual('firstInterval');

      bot.startWatchUpdates(1);

      expect(bot.stopWatchUpdates).toHaveBeenCalledTimes(2);
      expect(setInterval).lastCalledWith(bot.pullUpdates, 1000);
      expect(bot.watchUpdatesInterval).toEqual('secondInterval');
    }],
  ]],
  ['stopWatchUpdates', [
    ['Stops updates watcher', () => {
      const bot: any = {
        watchUpdatesInterval: null,
        stopWatchUpdates: BotClient.prototype.stopWatchUpdates,
      };

      bot.stopWatchUpdates();

      expect(clearInterval).toHaveBeenCalledTimes(0);
      expect(bot.watchUpdatesInterval).toBe(null);

      bot.watchUpdatesInterval = true;

      bot.stopWatchUpdates();

      expect(clearInterval).toHaveBeenCalledTimes(1);
      expect(clearInterval).lastCalledWith(true);
      expect(bot.watchUpdatesInterval).toBe(null);
    }],
  ]],
  ['getUpdates', [
    ['Gets updates from', async () => {
      const result = 'result';

      const bot: any = {
        lastUpdateId: 1,
        callMethod: jest.fn(() => result),
        getUpdates: BotClient.prototype.getUpdates,
        lastUpdateIdRefresh: jest.fn(),
      };

      expect(await bot.getUpdates()).toEqual(result);
      expect(bot.callMethod).toHaveBeenCalledTimes(1);
      expect(bot.callMethod).lastCalledWith('getUpdates', { offset: bot.lastUpdateId + 1 });
      expect(bot.lastUpdateIdRefresh).toHaveBeenCalledTimes(1);
      expect(bot.lastUpdateIdRefresh).lastCalledWith(result);

      expect(await bot.getUpdates({ offset: 100500 })).toEqual(result);
      expect(bot.callMethod).toHaveBeenCalledTimes(2);
      expect(bot.callMethod).lastCalledWith('getUpdates', { offset: 100500 });
      expect(bot.lastUpdateIdRefresh).toHaveBeenCalledTimes(2);
      expect(bot.lastUpdateIdRefresh).lastCalledWith(result);
    }],
  ]],
];

const coveredMethods = plainCallMethods
  .map(([methodName]) => methodName).concat(
    tests.map(([methodName]) => methodName),
  );

const uncoveredMethods = Object.getOwnPropertyNames(BotClient.prototype)
  .filter((propName) => {
    const prop = (BotClient.prototype: any)[propName];

    return (
      typeof prop === 'function' &&
      !coveredMethods.includes(propName)
    );
  });

describe('Class BotClient', () => {
  tests.forEach(
    ([methodName, methodTests]: any) => describe(`${methodName}()`, () => {
      methodTests.forEach(
        ([description, methodTest]) =>
          it(description, methodTest),
      );
    }),
  );

  plainCallMethods.forEach(
    ([methodName, description, args]) =>
      describe(`${methodName}()`, () =>
        it(description, () => {
          const expected = 'result';

          const bot = {
            callMethod: jest.fn().mockReturnValueOnce(expected),
            method: (BotClient.prototype: any)[methodName],
          };

          const result = bot.method(args);
          expect(bot.callMethod).lastCalledWith(...[methodName].concat(args || []));
          expect(bot.callMethod).toHaveBeenCalledTimes(1);
          expect(result).toBe(expected);
        }),
      ),
  );

  it('Haven\'t any uncovered method', () => {
    expect(uncoveredMethods).toEqual([]);
  });
});
