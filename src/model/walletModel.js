import Model from "./model.js";
import { COIN_ACTION } from "../action/coinAction.js";
import { NUM_TO_STR } from "../util/util.js";

class WalletModel extends Model {
  constructor() {
    super();
    this.state = {
      ten: 4,
      fifty: 3,
      hundred: 6,
      fiveHundred: 4,
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
        this.state = { ...this.state, ten: this.state.ten - 1 };
        break;
      case COIN_ACTION.DECREASE_50_COIN:
        this.state = { ...this.state, fifty: this.state.fifty - 1 };
        break;
      case COIN_ACTION.DECREASE_100_COIN:
        this.state = { ...this.state, hundred: this.state.hundred - 1 };
        break;
      case COIN_ACTION.DECREASE_500_COIN:
        this.state = { ...this.state, fiveHundred: this.state.fiveHundred - 1 };
        break;
      case COIN_ACTION.DECREASE_1000_COIN:
        this.state = { ...this.state, thousand: this.state.thousand - 1 };
        break;
      case COIN_ACTION.DECREASE_5000_COIN:
        this.state = {
          ...this.state,
          fiveThousand: this.state.fiveThousand - 1
        };
        break;
      case COIN_ACTION.DECREASE_10000_COIN:
        this.state = { ...this.state, tenThousand: this.state.tenThousand - 1 };
        break;
      default:
        break;
    }
    this.notify.call(this, [this.state]);
  }
}

export default WalletModel;
