import Form from '../Form';
import Messages from '../Messages';
import Settings from '../Settings';
import './styles.scss';

function App() {
  return (
    <div className="app">
      <Settings />
      <Messages />
      <Form />
    </div>
  );
}

export default App;
