import { createAction, createReducer } from '@reduxjs/toolkit';
import { IMessage } from '../../@types/chat';

interface ChatState {
  messages: IMessage[]
  inputMessage: string
}
const initialState: ChatState = {
  messages: [],
  inputMessage: '',
};

// Je créer mon action qui permettra de modifier mon inputMessage
// La nouvel valeur va être passée en paramètre, je rajoute donc le type de cette valeur
// entre mes `<>`
export const setInputMessage = createAction<string>('chat/SET_INPUT_MESSAGE');
export const addMessage = createAction<IMessage>('chat/ADD_MESSAGE');

const chatReducer = createReducer(initialState, (builder) => {
  builder
    // Je rajoute le cas de mon action
    .addCase(setInputMessage, (state, action) => {
      // Je traduit mon action en nouvelle valeur pour mon state
      // setInputMessage('Nouvelle valeur') => action.payload === 'Nouvelle valeur'
      state.inputMessage = action.payload;
    })
    .addCase(addMessage, (state, action) => {
      // action.payload contient le message renvoyer par socket.io
      // Je rajoute ce message dans ma liste des messages
      state.messages.push(action.payload);
    });

  // Avant l'utilisation de socket.io
  // .addCase(addMessage, (state) => {
  //   // Je vais calculer le prochain id à mettre dans mes messages
  //   // Je transforme mon tableau d'objet message en tableau d'identifiant
  //   const messageIds = state.messages.map((message) => message.id);
  //   // Je récupère le plus grand identifiant de mon tableau
  //   const maxId = Math.max(...messageIds);
  //   state.messages.push({
  //     // Le message que je créer va avoir pour identifiant le plus grand id + 1
  //     id: maxId + 1,
  //     author: 'Super chat',
  //     content: state.inputMessage,
  //   });
  //   // Après avoir ajouter mon message, je vide mon input
  //   state.inputMessage = '';
  // });
});

export default chatReducer;
