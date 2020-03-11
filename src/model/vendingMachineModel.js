import Model from "./model.js";
import COIN_ACTION from "../action/coinAction.js";
import { LOG_MESSAGE } from "../util/util.js";

class VendingMachineModel extends Model {
  constructor() {
    super();
    this.state = {
      ten: 0,
      fifty: 0,
      hundred: 0,
      fiveHundred: 0,
      thousand: 0,
      fiveThousand: 0,
      tenThousand: 0,
      logs: []
    };
  }

  dispatch(userAction) {
    if (!Array.isArray(userAction)) {
      this.notify.call(this, [this.state]);
      return;
    }
    const [action] = userAction;

    switch (action.type) {
      case COIN_ACTION.INCREASE_10_COIN:
        this.state = {
          ...this.state,
          ten: this.state.ten + 1,
          logs: [...this.state.logs, LOG_MESSAGE.TEN_INPUT]
        };
        break;
      case COIN_ACTION.INCREASE_50_COIN:
        this.state = {
          ...this.state,
          fifty: this.state.fifty + 1,
          logs: [...this.state.logs, LOG_MESSAGE.FIFTY_INPUT]
        };
        break;
      case COIN_ACTION.INCREASE_100_COIN:
        this.state = {
          ...this.state,
          hundred: this.state.hundred + 1,
          logs: [...this.state.logs, LOG_MESSAGE.HUNDRED_INPUT]
        };
        break;
      case COIN_ACTION.INCREASE_500_COIN:
        this.state = {
          ...this.state,
          fiveHundred: this.state.fiveHundred + 1,
          logs: [...this.state.logs, LOG_MESSAGE.FIVE_HUNDRED_INPUT]
        };
        break;
      case COIN_ACTION.INCREASE_1000_COIN:
        this.state = {
          ...this.state,
          thousand: this.state.thousand + 1,
          logs: [...this.state.logs, LOG_MESSAGE.THOUSAND_INPUT]
        };
        break;
      case COIN_ACTION.INCREASE_5000_COIN:
        this.state = {
          ...this.state,
          fiveThousand: this.state.fiveThousand + 1,
          logs: [...this.state.logs, LOG_MESSAGE.FIVE_THOUSAND_INPUT]
        };
        break;
      case COIN_ACTION.INCREASE_10000_COIN:
        this.state = {
          ...this.state,
          tenThousand: this.state.tenThousand + 1,
          logs: [...this.state.logs, LOG_MESSAGE.TEN_THOUSAND_INPUT]
        };
        break;
      default:
        break;
    }
    this.notify.call(this, [this.state]);
  }
}

export default VendingMachineModel;
