export const getLastNotZeroNumberFromArr = (arr: number[]): number | undefined => {
  let numberIndexes: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    const number = arr[i];
    if(number > 0) {
      numberIndexes = [
        ...numberIndexes,
        i,
      ];
    }
  }
  const lastPosition = numberIndexes[numberIndexes.length - 1];

  return lastPosition;
};

const checkPriceIsOverdueHighest = (highestPricePosition: number | undefined, prices: number[]) => {
  const latestPricesPosition = getLastNotZeroNumberFromArr(prices);
  const isOverdue = 
    typeof highestPricePosition === 'number' && 
    typeof latestPricesPosition === 'number' && 
    latestPricesPosition > highestPricePosition;
  if(isOverdue) {
    return true;
  }
  return false;
};

export default checkPriceIsOverdueHighest;