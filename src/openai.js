const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({ apiKey: process.env.OPENAI_KEY });
const openai = new OpenAIApi(configuration);

module.exports = async (messages, model = "gpt-3.5-turbo") => {
  try {
    const completion = await openai.createChatCompletion({ messages, model });
    return completion.data.choices[0].message.content;
  } catch (err) {
    console.log(err);
  }
};
