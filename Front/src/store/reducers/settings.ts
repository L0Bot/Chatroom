import { createAction, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAppAsyncThunk } from '../../utils/redux';

interface SettingsState {
  isOpen: boolean
  credentials: {
    email: string
    password: string
  },
  isLoading: boolean
  pseudo: string
  error: string | null
}
const initialState: SettingsState = {
  isOpen: true,
  credentials: {
    email: 'blabla@blabla.com',
    password: 'blabla',
  },
  isLoading: false,
  pseudo: 'Pipelette',
  error: null,
};

// MONINTERFACE['propriété'] me permet de récupérer le type d'une propriété
// `type` permet de créer un type comme `interface`.
// Sauf que `interface` le type est obligatoire un objet.
// avec `type` cela peut être une simple valeur
export type KeysOfCredentials = keyof SettingsState['credentials'];

export const toggleIsOpen = createAction('settings/TOGGLE_IS_OPEN');
export const changeCredentialsField = createAction<{
  propertyKey: KeysOfCredentials
  value: string
}>('settings/CHANGE_CREDENTIALS_FIELD');

// Je créer une action asynchrone
// 1er paramètre: le nom de mon action
// 2ème paramètre: une fonction qui va être exécutée lors de l'appel de mon action

export const login = createAppAsyncThunk(
  'settings/LOGIN',
  // Dans ma fonction de callback, je ne souhaite pas utiliser le premier params
  // mais je veux le deuxième, mon paramètre étant michelisable, je décide de l'appel `_`
  // le deuxième paramètre est un objet contenant getState et dispatch
  // le _ correspondrai au donnée passé au moment du dispatch
  // dispatch(login('toto')) ==> _ === 'toto'
  async (_, thunkAPI) => {
    // Depuis mon thunk, je vais récupérer le state de mon store
    const state = thunkAPI.getState();

    // J'appel mon API
    const { data } = await axios.post(
      'http://localhost:3001/login',
      // Je passe en paramètre de ma requête les credentials de mon store
      state.settings.credentials,
    );

    // Mon API me retourne un objet avec une propriété `pseudo`
    // Je retourne ma donnée avec son type.
    // Mon reducer va connaitre le type de ma donnée et pourra la traiter
    return data as { pseudo: string };
  },
);

const settingsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(toggleIsOpen, (state) => {
      state.isOpen = !state.isOpen;
    })
    .addCase(changeCredentialsField, (state, action) => {
      // On va modifier de manière dynamique la propriété que l'on souhaite
      // stocker dans nos credentials.
      // La propriété à modifier sera stocker dans action.payload.propertyKey (michelisable)
      // Sa valeur dans action.payload.value
      state.credentials[action.payload.propertyKey] = action.payload.value;
    })
    // Dans le cas où ma requête est en cours
    .addCase(login.pending, (state) => {
      // Je réinitialise mon message d'erreur
      state.error = null;
      // J'active mon loader
      state.isLoading = true;
    })
    // Dans le cas où ma requête a échoué
    .addCase(login.rejected, (state) => {
      // Je désactive mon loader
      state.isLoading = false;
      // Je stocke l'erreur dans mon store
      state.error = 'Mauvais identifiants';
    })
    // Pour gérer le cas de mon action asynchronne, je spéficie la propriété `fulfilled` de l'action
    .addCase(login.fulfilled, (state, action) => {
      // Lorsque mon action est terminer avec success
      // je désactive mon loader
      state.isLoading = false;
      // Je stocke le pseudo de mon utilisateur dans mon store
      state.pseudo = action.payload.pseudo;
      // Je ferme mon composant settings
      state.isOpen = false;
    });
});

export default settingsReducer;
