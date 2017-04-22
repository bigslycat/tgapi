/* @flow */

import { createSelector } from 'reselect';

import type { Update, User, MessageEntity } from '../types';

const getMessage = (update: Update) => update.message || null;

const getMessageText = createSelector(
  getMessage, message => (message ? message.text : null),
);

const getMessageRawEntities = createSelector(
  getMessage, (message): MessageEntity[] => (message && message.entities ? message.entities : []),
);

type Entities = {
  textMentions: Array<[string, User]>,
  textLinks: Array<[string, string]>,
  mentions: string[],
  hashtags: string[],
  botCommands: Array<[string, string]>,
  urls: string[],
  emails: string[],
  bold: string[],
  italic: string[],
  code: string[],
  pre: string[],
};

const botCommandArgsRegExp = /^([^\n/#@])[\n/#@]|$/g;

const entitiesReduser = messageText => (entities, entity) => {
  if (typeof messageText !== 'string') return entities;

  const text = messageText.substr(entity.offset, entity.length);

  switch (entity.type) {
    case 'text_mention':
      entities.textMentions.push([text, entity.user]);
      break;
    case 'text_link':
      entities.textLinks.push([text, entity.url]);
      break;
    case 'mention':
      entities.mentions.push(text);
      break;
    case 'hashtag':
      entities.hashtags.push(text);
      break;
    case 'bot_command': {
      const botCommandArgs = messageText
        .substr(entity.offset + entity.length)
        .replace(botCommandArgsRegExp, '$1')
        .trim();

      entities.botCommands.push([text, botCommandArgs]);
      break;
    }
    case 'url':
      entities.urls.push(text);
      break;
    case 'email':
      entities.emails.push(text);
      break;
    case 'bold':
      entities.bold.push(text);
      break;
    case 'italic':
      entities.italic.push(text);
      break;
    case 'code':
      entities.code.push(text);
      break;
    case 'pre':
      entities.pre.push(text);
      break;
    default:
      // eslint-disable-next-line no-unused-expressions
      (
        entity: empty
      );
  }

  return entities;
};

const initEntitiesScope = (): Entities => ({
  textMentions: [],
  textLinks: [],
  mentions: [],
  hashtags: [],
  botCommands: [],
  urls: [],
  emails: [],
  bold: [],
  italic: [],
  code: [],
  pre: [],
});

const getMessageEntities = createSelector(
  getMessageText, getMessageRawEntities,
  (messageText, rawEntities) =>
    rawEntities.reduce(
      entitiesReduser(messageText),
      initEntitiesScope(),
    ),
);

export const getTextMentions =
  createSelector(getMessageEntities, ({ textMentions }) => textMentions);
export const getTextLinks = createSelector(getMessageEntities, ({ textLinks }) => textLinks);
export const getMentions = createSelector(getMessageEntities, ({ mentions }) => mentions);
export const getHashtags = createSelector(getMessageEntities, ({ hashtags }) => hashtags);
export const getBotCommands = createSelector(getMessageEntities, ({ botCommands }) => botCommands);
export const getUrls = createSelector(getMessageEntities, ({ urls }) => urls);
export const getEmails = createSelector(getMessageEntities, ({ emails }) => emails);
export const getBold = createSelector(getMessageEntities, ({ bold }) => bold);
export const getItalic = createSelector(getMessageEntities, ({ italic }) => italic);
export const getCode = createSelector(getMessageEntities, ({ code }) => code);
export const getPre = createSelector(getMessageEntities, ({ pre }) => pre);
