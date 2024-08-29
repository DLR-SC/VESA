// calculateTfIdf.ts

import { IKeyword } from "../../types/types";

function calculateNormalizedScores(keywords: IKeyword[]): IKeyword[] {
  const result: IKeyword[] = [];

  // Calculate term frequency (TF) for each keyword
  const termFrequency: { [key: string]: number } = {};
  const totalTerms = keywords.reduce(
    (total, keyword) => total + keyword.count,
    0
  );

  for (const keyword of keywords) {
    termFrequency[keyword.keyword] = keyword.count / totalTerms;
  }

  // Calculate inverse document frequency (IDF) for each keyword
  const inverseDocumentFrequency: { [key: string]: number } = {};
  const totalDocuments = keywords.length; // assuming each keyword is a document
  for (const term in termFrequency) {
    const documentCount = keywords.filter(
      (keyword) => keyword.keyword === term
    ).length;
    inverseDocumentFrequency[term] = Math.log(
      totalDocuments / (1 + documentCount)
    );
  }

  // Calculate normalized scores for each keyword
  let sumOfScores = 0;
  for (const keyword of keywords) {
    const tf = termFrequency[keyword.keyword];
    const idf = inverseDocumentFrequency[keyword.keyword];
    const tfidf = tf * idf;

    sumOfScores += tfidf;

    result.push({
      keyword: keyword.keyword,
      count: tfidf,
      dataset_id: keyword.dataset_id,
    });
  }

  // Normalize the scores to ensure the sum is exactly 1
  result.forEach((entry) => {
    entry.count /= sumOfScores;
  });

  return result;
}

export default calculateNormalizedScores;

/* 
  This is gets the keyword and its count 
  and normalizes the count to a value between 0 and 1
  and returns the top 30% of the keywords
 */
