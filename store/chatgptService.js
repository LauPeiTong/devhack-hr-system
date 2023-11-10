// chatgptService.js
export async function sendMessageToChatGPT (axios, message, isSuggestion = true) {
  let suggestion = ''
  if (isSuggestion) {
    suggestion = ' Please give me the example by using \n for each paragraph or point. Not more than 100 words.'
  } else {
    suggestion = ''
  }

  try {
    const response = await axios.$post(
      'https://api.openai.com/v1/chat/completions',
      {
        messages: [
          { role: 'system', content: 'You are a helpful assistant. Your name is WeBot.' },
          { role: 'user', content: message + suggestion }
        ],
        model: 'gpt-3.5-turbo' // Replace with the appropriate model ID
      }
    )

    return response.choices[0].message.content
  } catch (error) {
    console.error('Error sending message to ChatGPT:', error)
    return 'An error occurred.'
  }
}
