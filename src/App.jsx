import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001"); // Replace with your server URL

function App() {
  const [typing, setTyping] = useState("");

  useEffect(() => {
    socket.on("typing", (data) => {
      setTyping(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleTyping = (event) => {
    const data = event.target.value;
    setTyping(data);
    socket.emit("typing", data);
  };

  return (
    <div>
      <h1>Multiplayer Typing Game</h1>
      <input
        type="text"
        placeholder="Type here..."
        value={typing}
        onChange={handleTyping}
      />
      <p>{typing && `Someone is typing: ${typing}`}</p>
    </div>
  );
}

export default App;
