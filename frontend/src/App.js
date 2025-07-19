import React from 'react';
import MessageSender from './components/MessageSender';
import MessageReceiver from './components/MessageReceiver';

function App() {
  return (
    <div>
      <h1>React + Flask + Kafka</h1>
      <MessageSender />
      <MessageReceiver />
    </div>
  );
}

export default App;