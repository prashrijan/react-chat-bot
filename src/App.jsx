import { useState } from "react";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const generateAnswer = async () => {
    setAnswer("Thinking....");
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

    const res = await axios({
      url: endPoint,
      method: "POST",
      data: requestBody,
    });
    setAnswer(res.data.candidates[0].content.parts[0].text);
    setQuestion("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
        <div className="p-4 border-b border-gray-300">
          <h2 className="text-lg font-semibold text-gray-800 text-center">
            React Chat Bot
          </h2>
        </div>
        <div className="p-4 space-y-4">
          <div className="h-64 overflow-y-auto bg-gray-50 rounded-lg p-4 border border-gray-300">
            <div className="text-gray-700">
              <p className="font-medium">You:</p>
              <p>{question}</p>
            </div>
            {answer && (
              <div className="mt-4 text-gray-700">
                <p className="font-medium">Bot:</p>
                <pre className="text-wrap">{answer}</pre>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Type your question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
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
    </div>
  );
}

export default App;
