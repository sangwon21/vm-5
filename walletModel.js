import Model from "./model.js";
import { DECREASE_10_COIN } from "./action.js";

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

  handle(userAction) {
    if (!Array.isArray(userAction)) {
      this.notify.call(this, [this.state]);
      return;
    }
    const [action] = userAction;
    const { type, payload } = action;

    switch (type) {
      case DECREASE_10_COIN:
        const ten = this.state.ten - 1;
        this.state = { ...this.state, ten };
        break;
      default:
        break;
    }
    this.notify.call(this, [this.state]);
  }
}

export default WalletModel;
