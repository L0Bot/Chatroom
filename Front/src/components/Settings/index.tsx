import { X } from 'react-feather';
import cn from 'classnames';
import './styles.scss';
import { ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  KeysOfCredentials, changeCredentialsField, login, toggleIsOpen,
} from '../../store/reducers/settings';

function Settings() {
  // useAppDispatch permet de récupérer la fonction dispatch
  // On ne peu pas l'utiliser directement pour emettre des intentions / actions
  // useAppDispatch(toggleIsOpen()) JE NE PEU PAS FAIRE CA
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.settings.isOpen);
  const email = useAppSelector((state) => state.settings.credentials.email);
  const password = useAppSelector((state) => state.settings.credentials.password);
  const isLoading = useAppSelector((state) => state.settings.isLoading);
  const error = useAppSelector((state) => state.settings.error);

  function handleClickToggle() {
    // J'emet mon intention / action
    dispatch(toggleIsOpen());
  }

  const settingsClassNames = cn('settings', {
    'settings--closed': !isOpen,
  });

  function handleChangeField(event: ChangeEvent<HTMLInputElement>): void {
    const newValue = event.target.value;
    // Je dis avec le `as` TKT, je te dis moi que le type de
    // event.target.name c'est un KeysOfCredentials
    const fieldName = event.target.name as KeysOfCredentials;
    dispatch(changeCredentialsField({
      propertyKey: fieldName,
      value: newValue,
    }));
  }

  function handleSubmitLogin(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    // J'emet mon intention / action asynchrone
    dispatch(login());
  }

  return (
    <div className={settingsClassNames}>
      <button type="button" className="settings__toggle" onClick={handleClickToggle}>
        <X />
      </button>

      <form className="settings__form" onSubmit={handleSubmitLogin}>
        <input
          type="email"
          className="settings__input"
          name="email"
          value={email}
          onChange={handleChangeField}
          placeholder="Email"
        />
        <input
          type="password"
          className="settings__input"
          name="password"
          value={password}
          onChange={handleChangeField}
          placeholder="Mot de passe"
        />
        <button type="submit" className="settings__submit" disabled={isLoading}>
          Envoyer
        </button>
        {error && (
        <div className="settings__error">
          {error}
        </div>
        )}
      </form>

    </div>
  );
}

export default Settings;
