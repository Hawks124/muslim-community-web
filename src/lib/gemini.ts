// Gemini API integration
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

// Get the model - using gemini-1.5-flash for better context handling
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Function to format response text
function formatResponseText(text: string): string {
  // Replace markdown bold with HTML bold
  let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Replace markdown italic with HTML italic
  formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Replace markdown lists with proper HTML lists
  formattedText = formattedText.replace(/^\* (.*?)$/gm, '<li>$1</li>');
  
  // Wrap list items in ul tags
  if (formattedText.includes('<li>')) {
    formattedText = formattedText.replace(/<li>(.*?)<\/li>/g, '<ul>$1</ul>');
    // Remove nested ul tags that might have been created
    formattedText = formattedText.replace(/<ul>(<ul>.*?<\/ul>)<\/ul>/g, '$1');
  }
  
  // Improve spacing by ensuring paragraphs are properly separated
  formattedText = formattedText.replace(/\n\n/g, '</p><p>');
  
  // Wrap the entire text in paragraph tags if not already wrapped
  if (!formattedText.startsWith('<p>')) {
    formattedText = '<p>' + formattedText;
  }
  if (!formattedText.endsWith('</p>')) {
    formattedText = formattedText + '</p>';
  }
  
  return formattedText;
}
// Function to generate a response from Gemini
export async function generateResponse(prompt: string, chatHistory: {role: string, parts: string}[] = []) {
  try {
    // Start a chat session with history
    const chat = model.startChat({
    //   history: chatHistory,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      },
    });

    // Generate a response
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    
    // Get token usage if available
    let tokenUsage = null;
    if (response.promptFeedback?.safetyRatings) {
      tokenUsage = response.promptFeedback.safetyRatings.length;
    }
    
    // Format the response text
    const formattedText = formatResponseText(response.text());
    
    return {
      text: formattedText,
      tokenUsage: tokenUsage
    };
  } catch (error) {
    console.error("Error generating response:", error);
    return {
      text: "Je suis désolée, j'ai rencontré une erreur. Pourriez-vous reformuler votre question?",
      tokenUsage: null
    };
  }
}
