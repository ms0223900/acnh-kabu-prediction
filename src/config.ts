export const mealItemWidth = 120;

export const peopleAndBonusText = (people: number, bonus: number) => (
  `達到後 前${people}人每人可獲得: ${bonus}`
);

export const totalPriceText = (price=0, discountRatio=1) => (
  `總價${price} (${discountRatio * 10}折)`
);
