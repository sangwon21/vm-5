/**
 * document.querySelector를 프로젝트 내에서 짧게 활용하기 위해서 함수를 제작했습니다.
 * @param {string} target target에 해당하는 DOM Element를 반환합니다.
 */
export const EW = target => document.querySelector(target);

/**
 * document.querySelectorAll를 프로젝트 내에서 짧게 활용하기 위해서 함수를 제작했습니다.
 * @param {string} target target에 해당하는 모든 DOM Element를 반환합니다.
 */
export const EWA = target => document.querySelectorAll(target);

/**
 * 동전 개수를 기반으로 동전 가치의 총합을 구합니다.
 * @param {object} data 동전 개수를 가지고 있는 data를 받습니다.
 * @return 동전의 총합을 반환합니다.
 */
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
