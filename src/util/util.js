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
