let transcript = '';
let isRecording = false;

const startRecording = () => {
  isRecording = true;
  transcript = '';
};

const stopRecording = () => {
  isRecording = false;
};

const updateTranscript = (text: string) => {
  if (isRecording) {
    transcript += text + ' ';
  }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startRecording') {
    startRecording();
    sendResponse({ success: true });
  } else if (request.action === 'stopRecording') {
    stopRecording();
    sendResponse({ success: true, transcript });
  }
});

// This is a simplified example. In a real-world scenario, you'd need to implement
// speech recognition or integrate with a meeting platform's API to capture the actual transcript.
document.addEventListener('keyup', (e) => {
  if (isRecording) {
    updateTranscript(e.key);
  }
});