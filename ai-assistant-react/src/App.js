import React, { useState } from "react";
import "./App.css";

function App() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");

    const sendMessage = async () => {
        if (userInput.trim() === "") return;

        const userMessage = { sender: "user", text: userInput };
        setMessages([...messages, userMessage]);
        setUserInput("");

        const aiResponse = await fetchAIResponse(userInput);
        const aiMessage = { sender: "ai", text: aiResponse };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
    };

    const fetchAIResponse = async (message) => {
        const response = await fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer YOUR_OPENAI_API_KEY`
            },
            body: JSON.stringify({
                prompt: message,
                max_tokens: 50
            })
        });
        const data = await response.json();
        return data.choices[0].text.trim();
    };

    return (
        <div className="App">
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default App;
