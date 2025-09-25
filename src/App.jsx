import React, { useState } from "react";

const App = () => {
  const arr = [1, 2, 3, 4, 5, 6];
  const [select, setSelect] = useState();
  const [random, setRandom] = useState(0);
  const [score, setScore] = useState(10);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("#FEEA00");
  const [isGameOver, setIsGameOver] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const wrongMessages = [
    "❌ Nope! Try again!",
    "😅 Wrong guess! Better luck next roll!",
    "🚫 Oops, not this time!",
    "🙃 Close... but not correct!",
    "😢 Wrong! Keep trying!",
    "😬 Nope! Give it another shot!",
  ];

  const handleRandom = () => {
    if (isGameOver) return;

    const rand = Math.floor(Math.random() * 6 + 1);
    setRandom(rand);

    if (rand === select) {
      setScore((prev) => {
        const newScore = prev + 3;
        if (newScore >= 20) {
          setIsGameOver(true);
          setMessage("🏆 You Win! 🎉");
          setMessageColor("gold");
        } else {
          setMessage("🎉 Correct! Do it one more time");
          setMessageColor("#6A994E");
        }
        return newScore;
      });
    } else {
      setScore((prev) => {
        const newScore = prev > 0 ? prev - 1 : 0;
        if (newScore === 0) {
          setIsGameOver(true);
          setMessage("💀 Game Over! Click Play Again");
          setMessageColor("#F24333");
        } else {
          const randomMsg =
            wrongMessages[Math.floor(Math.random() * wrongMessages.length)];
          setMessage(randomMsg);
          setMessageColor("#F24333");
        }
        return newScore;
      });
    }
  };

  const handleSelect = (num) => {
    if (!isGameOver) setSelect(num);
  };

  const resetGame = () => {
    setScore(10);
    setRandom(0);
    setSelect(null);
    setMessage("");
    setMessageColor("#FEEA00");
    setIsGameOver(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <button
          style={{
            marginBottom: "1rem",
            padding: "0.5rem 1rem",
            borderRadius: "0.3rem",
            border: "none",

            color: "white",
            cursor: "pointer",
            fontSize: "1rem",
          }}
          onClick={() => setShowRules((prev) => !prev)}
        >
          {showRules ? "Hide Rules" : "Show Rules"}
        </button>

        {showRules && (
          <div
            style={{
              background: "#1a1a1a",
              padding: "1rem",
              borderRadius: "0.5rem",
              border: "1px solid #444",
              color: "white",
              maxWidth: "400px",
              marginBottom: "1.5rem",
              fontSize: "1rem",
              lineHeight: "1.5",
              position: "absolute",
              top: "10",
              left: "10",
            }}
          >
            <h3 style={{ color: "#FEEA00", marginBottom: "0.5rem" }}>
              🎮 Rules:
            </h3>
            <ul style={{ textAlign: "left" }}>
              <li>
                Player starts with <b>10 points</b>.
              </li>
              <li>Select a number between 1 – 6.</li>
              <li>
                Click <b>Generate</b> to roll the dice.
              </li>
              <li>
                If your guess is correct ➡️{" "}
                <span style={{ color: "#6A994E" }}>+3 points</span>.
              </li>
              <li>
                If wrong ➡️ <span style={{ color: "#F24333" }}>-1 point</span>.
              </li>
              <li>
                If score reaches 0 ➡️ 💀 <b>Game Over</b>.
              </li>
            </ul>
          </div>
        )}
        <div
          style={{
            fontSize: "2rem",
            marginTop: "1rem",
            color: messageColor,
          }}
        >
          {select ? "" : "Please Select any number"}
          {message}
        </div>

        <div style={{ fontSize: "6rem", fontWeight: "bold", color: "#FEEA00" }}>
          {random}
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          {arr.map((num, idx) => (
            <div
              key={idx}
              style={{
                border: "1px solid white",
                borderRadius: "0.2rem",
                padding: "0.4rem 0.6rem",
                cursor: isGameOver ? "not-allowed" : "pointer",
                color: select === num ? "#6A994E" : "white",
                opacity: isGameOver ? 0.5 : 1,
              }}
              onClick={() => handleSelect(num)}
            >
              {num}
            </div>
          ))}

          <div
            style={{
              border: "1px solid white",
              borderRadius: "0.2rem",
              padding: "0.4rem 0.6rem",
              backgroundColor: isGameOver ? "#aaa" : "#6A994E",
              cursor: isGameOver || !select ? "not-allowed" : "pointer",
              opacity: isGameOver ? 0.5 : 1,
            }}
            onClick={select && !isGameOver ? handleRandom : null}
          >
            Generate
          </div>
        </div>

        <div style={{ fontSize: "4rem", fontWeight: "bold" }}>
          Your Score : {score}
        </div>

        <div
          style={{
            marginTop: "1rem",
            border: "1px solid red",
            borderRadius: "0.2rem",
            padding: "0.4rem 0.6rem",
            backgroundColor: "#F24333",
            color: "white",
            cursor: "pointer",
          }}
          onClick={resetGame}
        >
          {isGameOver ? "Play Again" : "Reset"}
        </div>
      </div>
    </>
  );
};

export default App;
