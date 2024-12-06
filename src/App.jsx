import axios from "axios";
import React, { useState } from "react";

const App = () => {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
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

      setChatHistory((prev) => [...prev, { question, answer: newAnwer }]);
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
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl flex flex-col">
        {/* Header */}
        <div className="p-4 bg-blue-600 text-white rounded-t-lg">
          <h2 className="text-lg font-semibold text-center">React Chat Bot</h2>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          {chatHistory.length > 0 ? (
            chatHistory.map((chat, index) => {
              return (
                <div key={index} className="mb-4">
                  <div className="text-gray-700">
                    <p className="font-medium text-blue-600">You:</p>
                    <p className="p-2 bg-blue-100 rounded-lg">
                      {chat.question}
                    </p>
                  </div>
                  <div className="mt-2 text-gray-700">
                    <p className="font-medium text-green-600">Bot:</p>
                    <p className="p-2 bg-green-100 rounded-lg">{chat.answer}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center mt-4">
              Hello, I am PrashAI powered by Google Gemini.
            </p>
          )}
          {isLoading && (
            <div className="text-center text-gray-600 mt-4">
              <p className="italic">Thinking...</p>
            </div>
          )}
        </div>

        <div className="p-4 bg-white border-t border-gray-300 flex items-center space-x-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Type your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button
            className={`px-4 py-2 text-white rounded-lg ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            type="button"
            disabled={isLoading}
            onClick={generateAnswer}
          >
            {isLoading ? "Loading..." : "Ask"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
