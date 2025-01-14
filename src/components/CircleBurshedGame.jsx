import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePause, faPowerOff, faCirclePlay } from '@fortawesome/free-solid-svg-icons';

const CircleBurshedGame = () => {
  const [balloons, setBalloons] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  const [difficulty, setDifficulty] = useState("easy"); 
    const [speed, setSpeed] = useState(2000);
  const [alertMessage, setAlertMessage] = useState("");  

  useEffect(() => {
    if (gameStarted && !gamePaused && lives > 0) {
      const interval = setInterval(() => {
        spawnBalloon();
      }, speed);
      return () => clearInterval(interval);
    }
  }, [gameStarted, gamePaused, speed]);

  useEffect(() => {
    if (lives <= 0) {
      setAlertMessage(`Game Over! Your score: ${score}`);
      setTimeout(() => resetGame(), 2000); 
    }
  }, [lives]);

const spawnBalloon = () => {
  const id = Date.now();
  const randomX = Math.random() * 80 + 10; // 10% to 90% of the screen width
  const randomY = Math.random() * 80 + 10; // 10% to 90% of the screen height

  // Add a new balloon with a "missed" flag
  setBalloons((prev) => [...prev, { id, x: randomX, y: randomY, missed: false }]);

  // Remove balloon after a delay if not popped
  setTimeout(() => {
    setBalloons((prev) => {
      const balloonIndex = prev.findIndex((balloon) => balloon.id === id);
      if (balloonIndex !== -1 && !prev[balloonIndex].missed) {
        // Mark the balloon as missed and decrement lives
        prev[balloonIndex].missed = true;
        setLives((prevLives) => Math.max(prevLives - 1, 0)); // Ensure lives don't go below 0
      }
      return prev.filter((balloon) => balloon.id !== id); // Remove the balloon
    });
  }, 1000); // Balloon disappears in 2 seconds
};

const popBalloon = (id) => {
  setBalloons((prev) => {
    const balloonIndex = prev.findIndex((balloon) => balloon.id === id);
    if (balloonIndex !== -1) {
      prev[balloonIndex].missed = true; // Mark as "popped" to avoid decrementing lives
    }
    return prev.filter((balloon) => balloon.id !== id); // Remove the balloon
  });
  setScore((prev) => prev + 1);
};


  const startGame = () => {
    setGameStarted(true);
    setGamePaused(false);
    setScore(0);
    setLives(3);
    setBalloons([]);
    setAlertMessage("");
    setSpeed(difficulty === "easy" ? 1500 : difficulty === "medium" ? 1200 : 800);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGamePaused(false);
    setScore(0);
    setLives(3);
    setBalloons([]);
    setAlertMessage("");
    };
    
   const togglePauseResume = () => {
    setGamePaused((prev) => {
        const newPausedState = !prev;
        setAlertMessage(newPausedState ? "Paused" : "Resumed");
        setTimeout(() => {
      setAlertMessage("");
    }, 1000);
      return newPausedState;
    });
  };

  return (
      <div className="relative h-[300px] w-full bg-blue-400">
          
        {alertMessage && (
        <div className="absolute top-[40%] left-[30%] w-[44vw] bg-yellow-500 text-black text-center py-2 font-bold z-10">
          {alertMessage}
        </div>
        )}
          

      {/* Score and Lives */}
      <div className="absolute top-2 right-4 text-lg font-bold">
        Score: {score} | Lives: {lives}
      </div>

      {/* Difficulty Selector */}
      <div className="absolute text-sm bottom-2 left-4">
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="p-1 border rounded"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Start Button */}
      {!gameStarted && (
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
          <button
            onClick={startGame}
            className="px-3 py-2 font-Quile text-xl uppercase tracking-widest bg-blue-800 text-white rounded-lg"
          >
            Start
          </button>
        </div>
      )}

      {/* Stop and Resume Buttons */}
      {gameStarted && (
        <div className="absolute top-0 left-2 text-[2rem]">
          <button
            onClick={togglePauseResume}
            className='px-4 py-2 rounded-lg'>
            <FontAwesomeIcon icon={gamePaused ? faCirclePlay : faCirclePause} />
          </button>
          <button
            onClick={resetGame}
            className="px-4 py-2 text-white rounded-lg"
          >
            <FontAwesomeIcon icon={faPowerOff} />
          </button>
        </div>
      )}

      {/* Balloons */}
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          onClick={() => popBalloon(balloon.id)}
          style={{
            top: `${balloon.y}%`,
            left: `${balloon.x}%`,
          }}
          className="absolute w-12 h-12 bg-red-500 rounded-full animate-bounce cursor-pointer"
        ></div>
      ))}
    </div>
  );
};

export default CircleBurshedGame;
