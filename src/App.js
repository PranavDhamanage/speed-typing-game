import React from "react";
import "./styles/style.css";
import useWordGame from "./hooks/useWordGame.js";

function App() {
  const {
    text,
    textareaRef,
    isTimeRunning,
    timeRemaining,
    isButtonDisabled,
    wordCount,
    startGame,
    handleChange,
  } = useWordGame(10);

  return (
    <div className="App">
      <h1>How fast do you type?</h1>
      <textarea
        value={text}
        ref={textareaRef}
        disabled={!isTimeRunning}
        onChange={handleChange}
        className="typing-area"
      />
      <h4 className="time">Time remaining : {timeRemaining}s</h4>
      <button disabled={isButtonDisabled} className="btn" onClick={startGame}>
        start
      </button>
      <h1 className="word-count">Word Count : {wordCount} </h1>
    </div>
  );
}

export default App;
