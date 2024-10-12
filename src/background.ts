chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'saveTranscript') {
    chrome.downloads.download({
      url: URL.createObjectURL(new Blob([request.transcript], { type: 'text/plain' })),
      filename: 'Transcripto/meeting_transcript.txt',
      saveAs: true
    });
  }
});