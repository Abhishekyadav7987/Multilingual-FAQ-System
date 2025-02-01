import FAQ from "../models/faq.model.js";
import { redisClient } from "../config/cache.config.js";
import translateText from "../services/faq.service.js";

// Add FAQ with translations 
export const createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const languages = ["hi", "bn"];

    // Generate translations
    const translations = {};
    for (const lang of languages) {
      translations[`${lang}_question`] = await translateText(question, lang);
      translations[`${lang}_answer`] = await translateText(answer, lang);
    }

    // Create a new FAQ document
    const faq = new FAQ({ question, answer, translations });
    await faq.save();

    // Send success response
    res.status(201).json(faq);
  } catch (error) {
    // Send error response
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get all FAQs (Accessible to all users)
export const getFAQs = async (req, res) => {
  try {
    const lang = req.query.lang || "en";
    const cacheKey = `faqs_${lang}`;

    // Check Redis cache
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    // Fetch FAQs from database
    const faqs = await FAQ.find();

    // Translate FAQs
    const translatedFAQs = faqs.map((faq) => {
      const translatedQuestion = faq.translations[`${lang}_question`] || faq.question;
      const translatedAnswer = faq.translations[`${lang}_answer`] || faq.answer;
      return {
        ...faq.toObject(),
        question: translatedQuestion,
        answer: translatedAnswer,
      };
    });

    // Store in cache (if Redis is connected)
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(translatedFAQs));

    // Send success response
    res.json(translatedFAQs);
  } catch (error) {
    // Send error response
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update FAQ (Admin only)
export const updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;

    // Find the FAQ by ID
    const faq = await FAQ.findById(id);
    if (!faq) return res.status(404).json({ message: "FAQ not found" });

    // Update question and answer
    faq.question = question || faq.question;
    faq.answer = answer || faq.answer;

    // Update translations
    if (question) {
      const languages = ["hi", "bn"];
      for (const lang of languages) {
        faq.translations[`${lang}_question`] = await translateText(question, lang);
        faq.translations[`${lang}_answer`] = await translateText(answer, lang);
      }
    }

    // Save the updated FAQ
    await faq.save();
    // Send success response
    res.json({ message: "FAQ updated successfully", faq });
  } catch (error) {
    // Send error response
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete FAQ (Admin only)
export const deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    // Find and delete the FAQ by ID
    const faq = await FAQ.findByIdAndDelete(id);

    if (!faq) return res.status(404).json({ message: "FAQ Not Found" });

    // Send success response
    res.json({ message: "FAQ Deleted Successfully" });
  } catch (error) {
    // Send error response
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
