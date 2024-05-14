import { useEffect, useState } from "react";
import "./App.css";

type AppProps = {
  message: string;
};

function App(props: AppProps) {
  const [isWaving, setIsWaving] = useState(false);
  const [angularMessage, setAngularMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const waveDuration = 2000;

  const playWaveAnimation = () => {
    setIsWaving(true);
    setTimeout(() => {
      setIsWaving(false);
    }, waveDuration);
  };

  useEffect(() => {
    const helloEventListener = (event: any) => {
      setAngularMessage(event.detail);
    };
    document.addEventListener("🗣️⚛️", helloEventListener);

    return () => {
      document.removeEventListener("🗣️⚛️", helloEventListener);
    };
  }, []);

  const handleButtonClick = () => {
    if (inputValue.trim() !== "") {
      playWaveAnimation();
      setTimeout(() => {
        const event = new CustomEvent("🗣️🅰️", {
          detail: inputValue,
        });
        document.dispatchEvent(event);
      }, waveDuration);
    }
    setInputValue("");
  };

  return (
    <div className="container">
      <div className="fragment-desc">
        <p className="fragment-title">React microfrontend</p>
        <p>
          Received from parent: <b>{props.message}</b>
        </p>
        <p>
          Received from Angular: <b>{angularMessage}</b>
        </p>
      </div>

      <div className={`hand-emoji-container ${isWaving ? "visible" : ""}`}>
        <div className={`hand-emoji ${isWaving ? "waving" : ""}`}>🗣️🅰️</div>
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="input-field"
          placeholder="Type here..."
        />
        <button
          type="submit"
          className="btn btn-secondary"
          onClick={handleButtonClick}
          disabled={inputValue.trim() === ""}
        >
          Send to 🅰️
        </button>
      </div>
    </div>
  );
}

export default App;
