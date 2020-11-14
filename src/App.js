import React, { useEffect, useRef, useState } from "react";
import "./styles/style.css";

function App() {
  const START_TIME = 5;
  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(START_TIME);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const textareaRef = useRef(null);

  function handleChange(event) {
    const { value } = event.target;
    setText(value);
  }

  function countWords(text) {
    const wordArr = text.trim().split(" ");
    const filteredWordArr = wordArr.filter((word) => word !== "");
    return filteredWordArr.length;
  }

  function startGame() {
    setIsTimeRunning(true);
    setTimeRemaining(START_TIME);
    setIsButtonDisabled(true);
    setWordCount(0);
    setText("");
    textareaRef.current.disabled = false;
    textareaRef.current.focus();
  }

  function endGame() {
    setIsTimeRunning(false);
    const numWords = countWords(text);
    setWordCount(numWords);
    setIsButtonDisabled(false);
  }

  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      endGame();
      return;
    }
  }, [timeRemaining, isTimeRunning]);

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
