import COIN_ACTION from "../action/coinAction.js";
import { BUTTON_ID, STR_TO_NUM } from "../util/util.js";

class WalletView {
  constructor(target, vendingMachineModel, walletModel) {
    this.target = target;
    this.walletModel = walletModel;
    this.buttonClickHandler = this.buttonClickHandler.bind(this);
    this.render = this.render.bind(this);
    this.vendingMachineModel = vendingMachineModel;
    this.walletModel.subscribe(this.render);
    this.walletModel.dispatch({});
  }

  buttonClickHandler(event) {
    const { target } = event;
    let type = "";
    let vendingType = "";
    let coinWorth = 0;
    switch (target.id) {
      case BUTTON_ID.TEN_WON:
        type = COIN_ACTION.DECREASE_10_COIN;
        vendingType = COIN_ACTION.INCREASE_10_COIN;
        coinWorth = STR_TO_NUM.ten;
        break;
      case BUTTON_ID.FIFTY_WON:
        type = COIN_ACTION.DECREASE_50_COIN;
        vendingType = COIN_ACTION.INCREASE_50_COIN;
        coinWorth = STR_TO_NUM.fifty;
        break;
      case BUTTON_ID.HUNDRED_WON:
        type = COIN_ACTION.DECREASE_100_COIN;
        vendingType = COIN_ACTION.INCREASE_100_COIN;
        coinWorth = STR_TO_NUM.hundred;
        break;
      case BUTTON_ID.FIVE_HUNDRED_WON:
        type = COIN_ACTION.DECREASE_500_COIN;
        vendingType = COIN_ACTION.INCREASE_500_COIN;
        coinWorth = STR_TO_NUM.fiveHundred;
        break;
      case BUTTON_ID.THOUSAND_WON:
        type = COIN_ACTION.DECREASE_1000_COIN;
        vendingType = COIN_ACTION.INCREASE_1000_COIN;
        coinWorth = STR_TO_NUM.thousand;
        break;
      case BUTTON_ID.FIVE_THOUSAND_WON:
        type = COIN_ACTION.DECREASE_5000_COIN;
        vendingType = COIN_ACTION.INCREASE_5000_COIN;
        coinWorth = STR_TO_NUM.fiveThousand;
        break;
      case BUTTON_ID.TEN_THOUSAND_WON:
        type = COIN_ACTION.DECREASE_10000_COIN;
        vendingType = COIN_ACTION.INCREASE_10000_COIN;
        coinWorth = STR_TO_NUM.tenThousand;
        break;
      default:
        return;
    }

    if (!this.walletModel.isCoinCountZero(coinWorth)) {
      this.walletModel.dispatch.call(this.walletModel, [{ type }]);
      this.vendingMachineModel.dispatch.call(this.vendingMachineModel, [
        { type: vendingType }
      ]);
    }
  }

  addEvents() {
    this.target.addEventListener("click", this.buttonClickHandler);
  }

  removeEvents() {
    this.target.removeEventListener("click", this.buttonClickHandler);
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

    this.removeEvents();
    this.target.innerHTML = `<ul>
          <li>
            <button id=${BUTTON_ID.TEN_WON}>10원</button>
            <div><span>${ten}</span></div>
          </li>
          <li>
            <button id=${BUTTON_ID.FIFTY_WON}>50원</button>
            <div><span>${fifty}</span></div>
          </li>
          <li>
            <button id=${BUTTON_ID.HUNDRED_WON}>100원</button>
            <div><span>${hundred}</span></div>
          </li>
          <li>
            <button id=${BUTTON_ID.FIVE_HUNDRED_WON}>500원</button>
            <div><span>${fiveHundred}</span></div>
          </li>
          <li>
            <button id=${BUTTON_ID.THOUSAND_WON}>1000원</button>
            <div><span>${thousand}</span></div>
          </li>
          <li>
            <button id=${BUTTON_ID.FIVE_THOUSAND_WON}>5000원</button>
            <div><span>${fiveThousand}</span></div>
          </li>
          <li>
            <button id=${BUTTON_ID.TEN_THOUSAND_WON}>10000원</button>
            <div><span>${tenThousand}</span></div>
          </li>
        </ul>
        <div class="wallet-sum"><b>${sum}원</b></div>`;
    this.addEvents();
  }
}

export default WalletView;
