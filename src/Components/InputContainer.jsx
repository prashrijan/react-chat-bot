import React from "react";

const InputContainer = ({
  question,
  setQuestion,
  handleKeyDown,
  isLoading,
  generateAnswer,
}) => {
  return (
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
        {isLoading ? "Thinking..." : "Ask"}
      </button>
    </div>
  );
};

export default InputContainer;
