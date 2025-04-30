const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

async function askGPT(prompt) {
  const apiKey = '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'; // Ganti dengan API key Anda

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 100
    })
  });

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

sendBtn.addEventListener('click', async () => {
  const userText = userInput.value.trim();
  if (userText === '') return;
  appendMessage('Kamu', userText);
  userInput.value = '';

  appendMessage('AI', 'Sedang mengetik...');

  try {
    const aiReply = await askGPT(userText);
    replaceLastMessage('AI', aiReply);
  } catch (error) {
    replaceLastMessage('AI', 'Maaf, ada masalah saat menghubungi AI.');
  }
});

function appendMessage(sender, message) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message');
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function replaceLastMessage(sender, newMessage) {
  const messages = chatBox.getElementsByClassName('message');
  if (messages.length > 0) {
    messages[messages.length - 1].innerHTML = `<strong>${sender}:</strong> ${newMessage}`;
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}
