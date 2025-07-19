import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MessageReceiver() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const interval = setInterval(async () => {
            const response = await axios.get('http://localhost:5000/receive');
            setMessages(response.data);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h3>Messages:</h3>
            <ul>
                {messages.map((msg, idx) => (
                    <li key={idx}>{msg.text}</li>
                ))}
            </ul>
        </div>
    );
}

export default MessageReceiver;