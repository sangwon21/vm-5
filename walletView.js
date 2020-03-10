import { DECREASE_10_COIN } from "./action.js";
import { EW } from "./util.js";

class WalletView {
  constructor(target, walletModel) {
    this.target = target;
    this.walletModel = walletModel;
    this.walletModel.subscribe(this.render.bind(this));
    this.walletModel.handle({});
  }

  addEvents() {
    EW("#won").addEventListener("click", () => {
      this.walletModel.handle.call(this.walletModel, [
        { type: DECREASE_10_COIN }
      ]);
    });
  }

  removeEvents() {
    EW("#won").removeEventListener("click", () => {
      this.walletModel.handle.call(this.walletModel, [
        { type: DECREASE_10_COIN }
      ]);
    });
  }

  render(data) {
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

    EW("#won") && this.removeEvents();
    this.target.innerHTML = `<ul>
          <li>
            <button id="won">10원</button>
            <div><span>${ten}</span></div>
          </li>
          <li>
            <button>50원</button>
            <div><span>${fifty}</span></div>
          </li>
          <li>
            <button>100원</button>
            <div><span>${hundred}</span></div>
          </li>
          <li>
            <button>500원</button>
            <div><span>${fiveHundred}</span></div>
          </li>
          <li>
            <button>1000원</button>
            <div><span>${thousand}</span></div>
          </li>
          <li>
            <button>5000원</button>
            <div><span>${fiveThousand}</span></div>
          </li>
          <li>
            <button>10000원</button>
            <div><span>${tenThousand}</span></div>
          </li>
        </ul>
        <div class="wallet-sum"><b>${sum}원</b></div>`;
    this.addEvents();
  }
}

export default WalletView;
