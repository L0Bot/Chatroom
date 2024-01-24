import cn from 'classnames';
import { useAppSelector } from '../../hooks/redux';
import './styles.scss';
import { isMineSelector } from '../../store/selectors/chat';

interface MessageProps {
  author: string;
  content: string;
}
function Message({ author, content }: MessageProps) {
  // Si l'author du message, c'est moi alors ajouter une class message--mine
  // Je récupère mon pseudo
  // Si le pseudo correspond à l'author, c'est le mien
  const isMine = useAppSelector(isMineSelector(author));

  const classNameMessage = cn('message', {
    'message--mine': isMine,
  });
  return (
    <div className={classNameMessage}>
      <div className="message__author">
        {author}
      </div>
      <div className="message__content">
        {content}
      </div>
    </div>
  );
}

export default Message;
