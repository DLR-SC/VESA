// type ArrayInput = (string | string[])[];

function splitArray(input: string[]): string[] {
    const separatedWords: string[] = [];

    for (const phrase of input) {
        const words = phrase.split(',').map(word => word.trim());
        separatedWords.push(...words);
    }

    return separatedWords;
}

export default splitArray;