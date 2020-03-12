import Model from "./model.js";
import { DECREASE_COIN } from "../action/coinAction.js";
import { NUM_TO_STR } from "../util/constants.js";

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
      tenThousand: 1
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
    const { type, payload } = action;

    const targetPropertyName = NUM_TO_STR[`${payload}`];

    switch (type) {
      case DECREASE_COIN:
        this.state = {
          ...this.state
        };
        this.state[`${targetPropertyName}`] =
          this.state[`${targetPropertyName}`] - 1;
        break;
      default:
        break;
    }
    this.notify.call(this, [this.state]);
  }
}

export default WalletModel;
