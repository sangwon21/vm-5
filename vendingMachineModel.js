import Model from "./model.js";
import {
  INCREASE_10_COIN,
  INCREASE_50_COIN,
  INCREASE_100_COIN,
  INCREASE_500_COIN,
  INCREASE_1000_COIN,
  INCREASE_5000_COIN,
  INCREASE_10000_COIN
} from "./action.js";

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
      tenThousand: 0
    };
  }

  dispatch(userAction) {
    if (!Array.isArray(userAction)) {
      this.notify.call(this, [this.state]);
      return;
    }
    const [action] = userAction;

    switch (action.type) {
      case INCREASE_10_COIN:
        this.state = { ...this.state, ten: this.state.ten + 1 };
        break;
      case INCREASE_50_COIN:
        this.state = { ...this.state, fifty: this.state.fifty + 1 };
        break;
      case INCREASE_100_COIN:
        this.state = { ...this.state, hundred: this.state.hundred + 1 };
        break;
      case INCREASE_500_COIN:
        this.state = { ...this.state, fiveHundred: this.state.fiveHundred + 1 };
        break;
      case INCREASE_1000_COIN:
        this.state = { ...this.state, thousand: this.state.thousand + 1 };
        break;
      case INCREASE_5000_COIN:
        this.state = {
          ...this.state,
          fiveThousand: this.state.fiveThousand + 1
        };
        break;
      case INCREASE_10000_COIN:
        this.state = { ...this.state, tenThousand: this.state.tenThousand + 1 };
        break;
      default:
        break;
    }
    this.notify.call(this, [this.state]);
  }
}

export default VendingMachineModel;
