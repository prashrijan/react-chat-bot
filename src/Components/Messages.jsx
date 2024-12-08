import React from "react";

const Messages = ({ question, answer }) => {
  return (
    <div className="mb-4">
      <div className="text-gray-700">
        <p className="font-medium text-blue-600">You:</p>
        <p className="p-2 bg-blue-100 rounded-lg">{question}</p>
      </div>
      <div className="mt-2 text-gray-700">
        <p className="font-medium text-green-600">Bot:</p>
        <p className="p-2 bg-green-100 rounded-lg">{answer}</p>
      </div>
    </div>
  );
};

export default Messages;
