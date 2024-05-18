// src/utils/getSentiment.ts
import Sentiment from "sentiment";

const sentiment = new Sentiment();

interface SentimentResult {
  mood: string;
  score: number;
  comparative: number;
  positiveWords: string[];
  negativeWords: string[];
}

export function getSentiment(text: string): SentimentResult {
  const result = sentiment.analyze(text);
  const score = result.score;
  const comparative = result.comparative;
  const positiveWords = result.positive;
  const negativeWords = result.negative;

  let mood = "Neutral";
  if (score > 5) {
    mood = "Very Positive";
  } else if (score > 2) {
    mood = "Positive";
  } else if (score > 0) {
    mood = "Slightly Positive";
  } else if (score < -5) {
    mood = "Very Negative";
  } else if (score < -2) {
    mood = "Negative";
  } else if (score < 0) {
    mood = "Slightly Negative";
  }

  return {
    mood,
    score,
    comparative,
    positiveWords,
    negativeWords,
  };
}
