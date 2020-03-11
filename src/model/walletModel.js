import Model from "./model.js";
import COIN_ACTION from "../action/coinAction.js";
import { NUM_TO_STR } from "../util/util.js";

class WalletModel extends Model {
  constructor() {
    super();
    this.state = {
      ten: 4,
      fifty: 3,
      hundred: 2,
      fiveHundred: 0,
      thousand: 2,
      fiveThousand: 1,
      tenThousand: 0
    };
  }

  isCoinCountZero(target) {
    return this.state[NUM_TO_STR[`${target}`]] === 0;
  }

  dispatch(userAction) {
    if (!Array.isArray(userAction)) {
      this.notify.call(this, [this.state]);
      return;
    }
    const [action] = userAction;

    switch (action.type) {
      case COIN_ACTION.DECREASE_10_COIN:
        const ten = this.state.ten - 1 > 0 ? this.state.ten - 1 : 0;
        this.state = { ...this.state, ten };
        break;
      case COIN_ACTION.DECREASE_50_COIN:
        const fifty = this.state.fifty - 1 > 0 ? this.state.fifty - 1 : 0;
        this.state = { ...this.state, fifty };
        break;
      case COIN_ACTION.DECREASE_100_COIN:
        const hundred = this.state.hundred - 1 > 0 ? this.state.hundred - 1 : 0;
        this.state = { ...this.state, hundred };
        break;
      case COIN_ACTION.DECREASE_500_COIN:
        const fiveHundred =
          this.state.fiveHundred - 1 > 0 ? this.state.fiveHundred - 1 : 0;
        this.state = { ...this.state, fiveHundred };
        break;
      case COIN_ACTION.DECREASE_1000_COIN:
        const thousand =
          this.state.thousand - 1 > 0 ? this.state.thousand - 1 : 0;
        this.state = { ...this.state, thousand };
        break;
      case COIN_ACTION.DECREASE_5000_COIN:
        const fiveThousand =
          this.state.fiveThousand - 1 > 0 ? this.state.fiveThousand - 1 : 0;
        this.state = { ...this.state, fiveThousand };
        break;
      case COIN_ACTION.DECREASE_10000_COIN:
        const tenThousand =
          this.state.tenThousand - 1 > 0 ? this.state.tenThousand - 1 : 0;
        this.state = { ...this.state, tenThousand };
        break;
      default:
        break;
    }
    this.notify.call(this, [this.state]);
  }
}

export default WalletModel;
