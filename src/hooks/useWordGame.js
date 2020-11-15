import { useState, useRef, useEffect } from "react";

function useWordGame(startingTime = 30) {
  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(startingTime);
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
    setTimeRemaining(startingTime);
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

  return {
    text,
    textareaRef,
    isTimeRunning,
    timeRemaining,
    isButtonDisabled,
    wordCount,
    startGame,
    handleChange,
  };
}

export default useWordGame;
