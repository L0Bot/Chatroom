/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
import { RootState } from '..';

export const isMineSelector = (author: string) => (state: RootState) => {
  return state.settings.pseudo === author;
};

export const getMessagesSelector = (state: RootState) => {
  return state.chat.messages;
};
