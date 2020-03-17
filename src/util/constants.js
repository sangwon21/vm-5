export const BUTTON_ID = {
  TEN_WON: "ten-won",
  FIFTY_WON: "fifty-won",
  HUNDRED_WON: "hundred-won",
  FIVE_HUNDRED_WON: "five-hundred-won",
  THOUSAND_WON: "thousand-won",
  FIVE_THOUSAND_WON: "five-thousand-won",
  TEN_THOUSAND_WON: "ten-thousand-won",
};

export const STR_TO_NUM = {
  cancel: -2,
  submit: -1,
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  fifty: 50,
  hundred: 100,
  fiveHundred: 500,
  thousand: 1000,
  fiveThousand: 5000,
  tenThousand: 10000,
};

export const NUM_TO_STR = {
  10: "ten",
  50: "fifty",
  100: "hundred",
  500: "fiveHundred",
  1000: "thousand",
  5000: "fiveThousand",
  10000: "tenThousand",
};

export const LOG_MESSAGE = {
  ten: "- 10원을 투입했습니다.",
  fifty: "- 50원을 투입했습니다.",
  hundred: "- 100원을 투입했습니다.",
  fiveHundred: "- 500원을 투입했습니다.",
  thousand: "- 1000원을 투입했습니다.",
  fiveThousand: "- 5000원을 투입했습니다.",
  tenThousand: "- 10000원을 투입했습니다.",
  notRightIndex: "- 올바른 상품 번호를 입력해주세요.",
  purchase: target => `- ${target}을(를) 구매했습니다.`,
  notEnoughMoney: target => `- 금액이 부족합니다. ${target}원이 있어야 구매가 가능합니다.`,
  timeout: sec => `- ${sec}초 동안 입력이 없어 금액이 반환됩니다.`,
  cancel: "- 입력을 취소했습니다.",
  startMessage: "- 자판기 구동을 시작합니다.",
};

export const MESSAGE_BOX_CLASS = "message";

export const MAX_MESSAGE_BOX_SCROLL_LENGTH = 1500;

export const NUMBER_BUTTON_ID = {
  ONE: "one",
  TWO: "two",
  THREE: "three",
  FOUR: "four",
  FIVE: "five",
  SIX: "six",
  SEVEN: "seven",
  EIGHT: "eight",
  NINE: "nine",
  ZERO: "zero",
  CANCEL: "cancel",
  SUBMIT: "submit",
};

export const SELECTED_NUMBER_MAX_LENGTH = 2;
