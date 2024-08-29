const CombineResponse = (
  responseData: any[][]
): { text: string; value: number }[] => {
  const combinedarray: any[] = responseData.reduce(
    (acc: any[], val: any[]) => [...acc, ...val],
    []
  );

  const lowerCaseArray: string[] = combinedarray.map((item: any) => {
    return item.toLowerCase();
  });

  const countMap: { [key: string]: number } = lowerCaseArray.reduce(
    (acc: { [key: string]: number }, element: string) => {
      acc[element] = (acc[element] || 0) + 1;
      return acc;
    },
    {}
  );

  const countArray: { text: string; value: number }[] = Object.entries(
    countMap
  ).map((element: [string, number]) => {
    return {
      text: element[0],
      value: element[1],
    };
  });

  return countArray;
};

export default CombineResponse;
