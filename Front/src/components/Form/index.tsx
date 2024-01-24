import { ChangeEvent, FormEvent } from 'react';
import { Send } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setInputMessage } from '../../store/reducers/chat';
import { sendMessage } from '../../socket/chat';
import './styles.scss';

function Form() {
  // Je récupère la fonction dispatch qui me permettra d'emettre mes actions
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) => state.chat.inputMessage);

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    // Je dispatch mon action de modification d'inputMessage
    dispatch(setInputMessage(newValue));
  }

  function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    // J'annule le comportement par défaut du formulaire qui est de recharger la page
    event.preventDefault();

    // Je vais envoyer mon message à socket.io
    sendMessage();

    // dispatch(addMessage());
  }

  return (
    <form onSubmit={handleSubmitForm} className="form">
      <input
        className="form__input"
        placeholder="Votre message..."
        value={message}
        onChange={handleChangeInput}
      />
      <button type="submit" className="form__button">
        <Send />
      </button>
    </form>
  );
}

export default Form;
