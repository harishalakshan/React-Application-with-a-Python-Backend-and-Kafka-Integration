import React, { useState } from 'react';
import axios from 'axios';

function MessageSender() {
    const [message, setMessage] = useState('');

    const sendMessage = async () => {
        await axios.post('http://localhost:5000/send', { text: message });
        setMessage('');
    };

    return (
        <div>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default MessageSender;