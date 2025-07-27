
const axios = require('axios');

exports.handler = async function (event, context) {
  const API_KEY = 'AIzaSyASWD5iJRj5OfS6aITt38srGy-rHnkcC5Y';

  try {
    const { prompt } = JSON.parse(event.body);

    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    const content = geminiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text || "❌ لا يوجد رد من الذكاء الاصطناعي";

    return {
      statusCode: 200,
      body: JSON.stringify({ response: content })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message, details: error.response?.data })
    };
  }
};
