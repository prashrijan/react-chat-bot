import axios from "axios";
import React, { useState } from "react";
import Messages from "./Components/Messages";
import InputContainer from "./Components/InputContainer";

const App = () => {
  // States
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateAnswer = async () => {
    setIsLoading(true);
    const endPoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${
      import.meta.env.VITE_API_KEY
    }`;

    const requestBody = {
      contents: [
        {
          parts: [{ text: question }],
        },
      ],
    };

    try {
      const res = await axios({
        method: "POST",
        url: endPoint,
        data: requestBody,
      });

      const newAnwer = res.data.candidates[0].content.parts[0].text;

      setMessages((prev) => [...prev, { question, answer: newAnwer }]);
      setQuestion("");
    } catch (error) {
      console.log(`Error fetching data: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      generateAnswer();
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 flex-col gap-10">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl flex flex-col">
        {/* Header */}
        <div className="p-4 bg-blue-600 text-white rounded-t-lg">
          <h2 className="text-lg font-semibold text-center">PrashGPT</h2>
        </div>

        {/* Message*/}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          {messages.length > 0 ? (
            messages.map((message, index) => {
              return (
                <Messages
                  key={index}
                  question={message.question}
                  answer={message.answer}
                />
              );
            })
          ) : (
            <p className="text-gray-500 text-center mt-4">
              Hello, I am PrashGPT powered by Google Gemini.
            </p>
          )}
          {isLoading && (
            <div className="text-center text-gray-600 mt-4">
              <p className="italic">Thinking...</p>
            </div>
          )}
        </div>

        {/* Input Container */}
        <InputContainer
          question={question}
          setQuestion={setQuestion}
          handleKeyDown={handleKeyDown}
          isLoading={isLoading}
          generateAnswer={generateAnswer}
        />
      </div>

      <footer>Made By Prashrijan Shrestha</footer>
    </div>
  );
};

export default App;
