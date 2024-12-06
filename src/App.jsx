import { useState } from "react";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const generateAnswer = async () => {
    if (!question.trim()) return;

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
        url: endPoint,
        method: "POST",
        data: requestBody,
      });

      const newAnswer = res.data.candidates[0].content.parts[0].text;

      // Add the new question and answer to the chat history
      setChatHistory((prev) => [...prev, { question, answer: newAnswer }]);

      // Clear the input field
      setQuestion("");
    } catch (error) {
      console.error("Error generating answer:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      generateAnswer();
    }
  };

  console.log(chatHistory);
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
            chatHistory.map((chat, index) => (
              <div key={index} className="mb-4">
                <div className="text-gray-700">
                  <p className="font-medium text-blue-600">You:</p>
                  <p className="p-2 bg-blue-100 rounded-lg">{chat.question}</p>
                </div>
                <div className="mt-2 text-gray-700">
                  <p className="font-medium text-green-600">Bot:</p>
                  <p className="p-2 bg-green-100 rounded-lg">{chat.answer}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-4">
              Start the conversation by typing a question!
            </p>
          )}
        </div>

        {/* Input Section */}
        <div className="p-4 bg-white border-t border-gray-300 flex items-center space-x-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Type your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            type="button"
            onClick={generateAnswer}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
