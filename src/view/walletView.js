import { INCREASE_COIN, DECREASE_COIN } from "../action/coinAction.js";
import { calculateCoinSum } from "../util/util.js";
import { BUTTON_ID, STR_TO_NUM } from "../util/constants.js";

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

  getRightfulCoinWorth(id) {
    switch (id) {
      case BUTTON_ID.TEN_WON:
        return STR_TO_NUM.ten;
      case BUTTON_ID.FIFTY_WON:
        return STR_TO_NUM.fifty;
      case BUTTON_ID.HUNDRED_WON:
        return STR_TO_NUM.hundred;
      case BUTTON_ID.FIVE_HUNDRED_WON:
        return STR_TO_NUM.fiveHundred;
      case BUTTON_ID.THOUSAND_WON:
        return STR_TO_NUM.thousand;
      case BUTTON_ID.FIVE_THOUSAND_WON:
        return STR_TO_NUM.fiveThousand;
      case BUTTON_ID.TEN_THOUSAND_WON:
        return STR_TO_NUM.tenThousand;
      default:
    }
  }

  buttonClickHandler(event) {
    const { target } = event;
    const coinWorth = this.getRightfulCoinWorth(target.id);
    if (!coinWorth) {
      return;
    }

    if (!this.walletModel.isCoinCountZero(coinWorth)) {
      this.walletModel.dispatch.call(this.walletModel, [{ type: DECREASE_COIN, payload: coinWorth }]);
      this.vendingMachineModel.dispatch.call(this.vendingMachineModel, [{ type: INCREASE_COIN, payload: coinWorth }]);
    }
  }

  addEvents() {
    this.target.addEventListener("click", this.buttonClickHandler);
  }

  removeEvents() {
    this.target.removeEventListener("click", this.buttonClickHandler);
  }

  render(data) {
    const { ten, fifty, hundred, fiveHundred, thousand, fiveThousand, tenThousand } = data;
    const sum = calculateCoinSum(data);

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
