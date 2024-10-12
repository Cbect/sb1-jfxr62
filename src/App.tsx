import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Download } from 'lucide-react';

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');

  const toggleRecording = () => {
    if (isRecording) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id!, { action: 'stopRecording' }, (response) => {
          if (response && response.success) {
            setTranscript(response.transcript);
          }
        });
      });
    } else {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id!, { action: 'startRecording' });
      });
    }
    setIsRecording(!isRecording);
  };

  const saveTranscript = () => {
    chrome.runtime.sendMessage({ action: 'saveTranscript', transcript });
  };

  return (
    <div className="w-80 p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Meeting Transcript</h1>
      <div className="flex justify-between mb-4">
        <button
          onClick={toggleRecording}
          className={`px-4 py-2 rounded-full ${
            isRecording ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
          }`}
        >
          {isRecording ? <MicOff className="inline mr-2" /> : <Mic className="inline mr-2" />}
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
        <button
          onClick={saveTranscript}
          disabled={!transcript}
          className={`px-4 py-2 rounded-full ${
            transcript ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'
          }`}
        >
          <Download className="inline mr-2" />
          Save
        </button>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Transcript:</h2>
        <div className="bg-gray-100 p-2 rounded-lg h-40 overflow-y-auto">
          {transcript || 'No transcript available'}
        </div>
      </div>
    </div>
  );
}

export default App;