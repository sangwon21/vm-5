import { CHANGES_CALCULATE_ORDER_LIST } from "./constants.js";

export const EW = target => document.querySelector(target);
export const EWA = target => document.querySelectorAll(target);

export const calculateCoinSum = data => {
  const { ten, fifty, hundred, fiveHundred, thousand, fiveThousand, tenThousand } = data;

  const sum =
    (ten ? ten * 10 : 0) +
    (fifty ? fifty * 50 : 0) +
    (hundred ? hundred * 100 : 0) +
    (fiveHundred ? fiveHundred * 500 : 0) +
    (thousand ? thousand * 1000 : 0) +
    (fiveThousand ? fiveThousand * 5000 : 0) +
    (tenThousand ? tenThousand * 10000 : 0);

  return sum;
};

export const calculateChanges = (inputCoins, beveragePrice) => {
  const changeCoins = { ...inputCoins };
  let beverageChange = beveragePrice;

  for (const [value, str] of CHANGES_CALCULATE_ORDER_LIST) {
    if (beverageChange < 0) {
      break;
    }
    beverageChange -= value * changeCoins[`${str}`];
    changeCoins[`${str}`] = 0;
  }

  if (beverageChange < 0) {
    beverageChange *= -1;
    while (beverageChange > 0) {
      for (const [value, str] of CHANGES_CALCULATE_ORDER_LIST) {
        if (beverageChange >= value) {
          beverageChange -= parseInt(value);
          changeCoins[`${str}`] += 1;
          break;
        }
      }
    }
  }
  return changeCoins;
};
