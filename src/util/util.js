export const EW = target => document.querySelector(target);
export const EWA = target => document.querySelectorAll(target);

export const BUTTON_ID = {
  TEN_WON: "ten-won",
  FIFTY_WON: "fifty-won",
  HUNDRED_WON: "hundred-won",
  FIVE_HUNDRED_WON: "five-hundred-won",
  THOUSAND_WON: "thousand-won",
  FIVE_THOUSAND_WON: "five-thousand-won",
  TEN_THOUSAND_WON: "ten-thousand-won"
};

export const STR_TO_NUM = {
  ten: 10,
  fifty: 50,
  hundred: 100,
  fiveHundred: 500,
  thousand: 1000,
  fiveThousand: 5000,
  tenThousand: 10000
};

export const NUM_TO_STR = {
  10: "ten",
  50: "fifty",
  100: "hundred",
  500: "fiveHundred",
  1000: "thousand",
  5000: "fiveThousand",
  10000: "tenThousand"
};

export const LOG_MESSAGE = {
  TEN_INPUT: "10원이 투입했습니다.",
  FIFTY_INPUT: "50원이 투입했습니다.",
  HUNDRED_INPUT: "100원이 투입했습니다.",
  FIVE_HUNDRED_INPUT: "500원이 투입했습니다.",
  THOUSAND_INPUT: "1000원이 투입했습니다.",
  FIVE_THOUSAND_INPUT: "5000원이 투입했습니다.",
  TEN_THOUSAND_INPUT: "10000원이 투입했습니다."
};

export const calculateCoinSum = data => {
  const {
    ten,
    fifty,
    hundred,
    fiveHundred,
    thousand,
    fiveThousand,
    tenThousand
  } = data;

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
