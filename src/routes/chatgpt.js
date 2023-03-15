const http = require('http');

const API_KEY = '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';
const MODEL_ID = 'davinci';

async function generateResponse(message, conversationId, parentId) {
  const options = {
    hostname: 'api.openai.com',
    path: '/v1/engines/' + MODEL_ID + '/completions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + API_KEY,
    },
  };

  const data = {
    'prompt': message,
    'max_tokens': 60,
    'temperature': 0.7,
    'n': 1,
    'stop': '\n',
    'user': conversationId,
    'model': MODEL_ID,
    'parent': parentId,
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        if (res.statusCode === 200) {
          const response = JSON.parse(body).choices[0].text.trim();
          resolve(response);
        } else {
          reject('Failed to generate response');
        }
      });
    });

    req.on('error', (e) => {
      reject(e.message);
    });

    req.write(JSON.stringify(data));
    req.end();
  });
}

async function startConversation() {
  const options = {
    hostname: 'api.openai.com',
    path: '/v1/conversations',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + API_KEY,
    },
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        if (res.statusCode === 200) {
          const response = JSON.parse(body);
          resolve(response.conversation_id);
        } else {
          reject('Failed to start conversation');
        }
      });
    });

    req.on('error', (e) => {
      reject(e.message);
    });

    req.end();
  });
}

async function sendMessage(message, conversationId, parentId) {
  const response = await generateResponse(message, conversationId, parentId);
  return response;
}

module.exports = {
  startConversation,
  sendMessage,
};
