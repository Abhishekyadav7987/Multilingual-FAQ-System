// Import the google-translate-api module for translating text
import { translate } from '@vitalets/google-translate-api';

// Define an asynchronous function to translate text to a target language
const translateText = async (text, targetLang) => {
  try {
    // Use the translate function to translate the text to the target language
    const res = await translate(text, { to: targetLang });
    // Return the translated text
    return res.text;
  } catch (error) {
    // Log any errors that occur during translation
    console.error("Translation Error:", error);
    // Return the original text if an error occurs
    return text; 
  }
};

// Export the translateText function as the default export
export default translateText;
