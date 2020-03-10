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
