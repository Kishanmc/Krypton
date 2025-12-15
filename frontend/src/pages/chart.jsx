import React, { useState, useEffect } from "react";
import "./css/chart.css";
import logo from "../component/assets/logo.jpg";
import voiceGif from "../component/assets/voice.gif";
import micIcon from "../component/assets/mic.svg";
const GEMINI_API_KEY = "AXXXI";

const Chat = () => {
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [listening, setListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

 

useEffect(() => {
  const handleKeyDown = () => {
    window.speechSynthesis.cancel();
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    // Cleanup on unmount or route change
    window.removeEventListener("keydown", handleKeyDown);
    window.speechSynthesis.cancel();
  };
}, []);


  const speak = (text) => {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };
const startListening = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech recognition is not supported in this browser. Please use Google Chrome.");
    return;
  }

  setListening(true);

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = async (event) => {
    let transcriptText = event.results[0][0].transcript.toLowerCase();
    setTranscript(transcriptText);
    await takeCommand(transcriptText);
    setListening(false);
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    setListening(false);
    setError(`Speech recognition error: ${event.error}`);
  };

  recognition.start();
};

  const fetchGeminiResponse = async (query) => {
    setIsLoading(true);
    setError("");

    let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
    let body = {
      contents: [{ parts: [{ text: query }] }],
    };

    try {
      let res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error(`API request failed: ${res.status}`);
      }

      let data = await res.json();
      let result = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't find an answer.";
      setResponse(result);
      speak(result);
    } catch (error) {
      console.error("Gemini API error:", error);
      const errorMessage = "There was an error fetching data. Please try again.";
      setResponse(errorMessage);
      setError("Failed to get response from AI assistant");
      speak(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const takeCommand = async (message) => {
    if (message.includes("hello") || message.includes("hey")) {
      speak("Hello! How can I assist you?");
    } else if (message.includes("who are you")) {
      speak("I am Nikki, your virtual assistant.");
    } else if (message.includes("open youtube")) {
      speak("Opening YouTube...");
      window.open("https://youtube.com/", "_blank");
    } else if (message.includes("open google")) {
      speak("Opening Google...");
      window.open("https://google.com/", "_blank");
    } else if (message.includes("time")) {
      let time = new Date().toLocaleTimeString();
      speak(`The current time is ${time}`);
    } else if (message.includes("date")) {
      let date = new Date().toLocaleDateString();
      speak(`Today's date is ${date}`);
    } else {
      speak("Searching, please wait...");
      await fetchGeminiResponse(message);
    }
  };


  return (
    <div className="chat-container">
      <img src={logo} alt="logo" className="chat-logo" />
      <h1 className="chat-title">
        I'm <span className="chat-name">Nikki</span>, Your Virtual Assistant
      </h1>
      {listening && <img src={voiceGif} alt="voice animation" className="voice-animation" />}
      <button onClick={startListening} className="chat-button" disabled={listening || isLoading}>
        <img src={micIcon} alt="mic" className="mic-icon" />
        {listening ? "Listening..." : isLoading ? "Processing..." : "Click here to talk to me"}
      </button>
      {error && <p className="chat-error"><strong>Error:</strong> {error}</p>}
      <p className="chat-text"><strong>You said:</strong> {transcript}</p>
      <p className="chat-text"><strong>Response:</strong> {response}</p>
    </div>
  );
};


export default Chat;
