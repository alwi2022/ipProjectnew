const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const gemini = async (prompt) => {
  try {
    const genAI = new GoogleGenerativeAI("AIzaSyD_B2dIx8jVIQHMsqC83SqlWX3XcB8nIpc"); 
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    
    return text; 
  } catch (error) {
    console.error("Error in Gemini helper:", error);
    throw error;
  }
};

module.exports = gemini;
