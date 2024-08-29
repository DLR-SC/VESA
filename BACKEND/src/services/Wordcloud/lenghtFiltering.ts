/* 
  get the result from getKeywordCount.ts and check if the keyword length
  is less than 3, if yes, then remove it from the array 
  */

import calculatedNormalizedScores from "./getTf-IdfScore";
import { IKeyword } from "../../types/types";

function processResult(result: IKeyword[][]): IKeyword[] {
  const filteredResult: IKeyword[][] = [];

  for (const keywordGroup of result) {
    const filteredKeywords: IKeyword[] = [];

    for (const keywordInfo of keywordGroup) {
      const words = keywordInfo.keyword.split(" ");

      // Check if the keyword length is less than or equal to 3 and not a single character
      if (words.length <= 3 && !isSingleCharacter(keywordInfo.keyword)) {
        filteredKeywords.push(keywordInfo);
      }
    }

    filteredResult.push(filteredKeywords);
  }

  // Flatten the filteredResult array
  const filteredKeywords: IKeyword[] = [];
  for (const keywordGroup of filteredResult) {
    for (const keywordInfo of keywordGroup) {
      filteredKeywords.push(keywordInfo);
    }
  }

  // console.log("Filtered keywords: ", filteredKeywords);

  // Apply TF-IDF calculations on the filtered keywords
  const tfidfResult = calculatedNormalizedScores(filteredKeywords);

  //console log the sum of count only
  const sum = tfidfResult.reduce((acc, curr) => acc + curr.count, 0);
  console.log("Sum of count: ", sum);
  return tfidfResult;
}

// Function to check if a string is a single character
function isSingleCharacter(str: string): boolean {
  return str.length === 1;
}

export default processResult;
