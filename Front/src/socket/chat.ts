/* eslint-disable import/prefer-default-export */
import { IMessage } from '../@types/chat';
import store from '../store';
import { addMessage, setInputMessage } from '../store/reducers/chat';
import { socket } from './io';

export const sendMessage = () => {
  // Pour envoyer le message j'ai besoin de récupérer mes informations
  // Toutes mes informations sont stockées dans mon store
  const state = store.getState();
  // J'ai besoin de mon pseudo et de mon message
  const author = state.settings.pseudo;
  const content = state.chat.inputMessage;

  // J'utilise socket pour envoyer mon message au serveur
  socket.emit('send_message', {
    author,
    content,
  });

  // Je vide mon input après avoir envoyé mon message
  store.dispatch(setInputMessage(''));
};

export const subscribeToNewMessage = () => {
  // Je m'abonne au nouveau message
  socket.on('new_message', (message: IMessage) => {
    // Quand je reçois un nouveau message, je l'ajoute à mon store
    store.dispatch(addMessage(message));
  });
};

export const unsubscribeToNewMessage = () => {
  // Je me désabonne au nouveau message
  socket.off('new_message');
};
