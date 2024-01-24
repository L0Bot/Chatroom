import { useEffect, useRef } from 'react';
import Message from '../Message';
import { useAppSelector } from '../../hooks/redux';
import './styles.scss';
import { subscribeToNewMessage, unsubscribeToNewMessage } from '../../socket/chat';
import { getMessagesSelector } from '../../store/selectors/chat';
import { useSound } from '../../hooks/sound';
import messageSound from '../../assets/messageSound.mp3';

function Messages() {
  // useAppSelector va nous permettre d'aller récupérer les données de notre store
  // on lui passe une fonction de callback qui a partir des données de notre store
  // retourne ce que l'on souhaite récupérer dans notre composant
  const messages = useAppSelector(getMessagesSelector);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const playSound = useSound(messageSound);

  // On va scroller en bas de la liste des messages à chaque fois que l'on reçoit un nouveau message
  useEffect(() => {
    // on utilise un optional chaining pour gérer le cas où messagesEndRef.current serait null.
    // Si il est null, le scrollIntoView ne sera pas appelé
    messagesEndRef.current?.scrollIntoView(false);
  }, [messages]);

  useEffect(() => {
    // Mon son est joué à chaque fois que je reçois un nouveau message
    playSound();
  }, [messages, playSound]);

  // Quand j'arrive sur mon composant messages
  useEffect(() => {
    // Je vais m'abonner à mes nouveaux messages reçus depuis socket
    subscribeToNewMessage();

    // Pour résilier mon abonnement, je vais retourner une fonction qui sera appelée
    // lorsque mon composant sera détruit
    return () => unsubscribeToNewMessage();
  }, []);

  return (
    <div className="messages">
      {messages.map((message) => (
        <Message
          // on oublie pas le key qui est obligatoire pour map !
          key={message.id}
          author={message.author}
          content={message.content}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Messages;
