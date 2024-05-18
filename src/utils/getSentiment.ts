// src/utils/getSentiment.ts
import Sentiment from "sentiment";

const sentiment = new Sentiment();

export function getSentiment(text: string): string {
  const result = sentiment.analyze(text);
  const score = result.score;

  if (score > 0) {
    return "Positive";
  } else if (score < 0) {
    return "Negative";
  } else {
    return "Neutral";
  }1
}
