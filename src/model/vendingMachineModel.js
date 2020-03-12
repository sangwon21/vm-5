import Model from "./model.js";
import { COIN_ACTION } from "../action/coinAction.js";
import { NUMBER_BUTTON_ACTION } from "../action/numberButtonAction.js";
import {
  LOG_MESSAGE,
  STR_TO_NUM,
  SELECTED_NUMBER_MAX_LENGTH
} from "../util/util.js";

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
      logs: [],
      selectedNumber: ""
    };
  }

  hasSelectedNumber() {
    return this.state.selectedNumber.length !== 0;
  }

  hasSelectedNumberReachedLimit() {
    return this.state.selectedNumber.length >= SELECTED_NUMBER_MAX_LENGTH;
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
      case NUMBER_BUTTON_ACTION.NUMBER_0_INPUT:
        this.state = {
          ...this.state,
          selectedNumber: this.state.selectedNumber + STR_TO_NUM.zero
        };
        break;
      case NUMBER_BUTTON_ACTION.NUMBER_1_INPUT:
        this.state = {
          ...this.state,
          selectedNumber: this.state.selectedNumber + STR_TO_NUM.one
        };
        break;
      case NUMBER_BUTTON_ACTION.NUMBER_2_INPUT:
        this.state = {
          ...this.state,
          selectedNumber: this.state.selectedNumber + STR_TO_NUM.two
        };
        break;
      case NUMBER_BUTTON_ACTION.NUMBER_3_INPUT:
        this.state = {
          ...this.state,
          selectedNumber: this.state.selectedNumber + STR_TO_NUM.three
        };
        break;
      case NUMBER_BUTTON_ACTION.NUMBER_4_INPUT:
        this.state = {
          ...this.state,
          selectedNumber: this.state.selectedNumber + STR_TO_NUM.four
        };
        break;
      case NUMBER_BUTTON_ACTION.NUMBER_5_INPUT:
        this.state = {
          ...this.state,
          selectedNumber: this.state.selectedNumber + STR_TO_NUM.five
        };
        break;
      case NUMBER_BUTTON_ACTION.NUMBER_6_INPUT:
        this.state = {
          ...this.state,
          selectedNumber: this.state.selectedNumber + STR_TO_NUM.six
        };
        break;
      case NUMBER_BUTTON_ACTION.NUMBER_7_INPUT:
        this.state = {
          ...this.state,
          selectedNumber: this.state.selectedNumber + STR_TO_NUM.seven
        };
        break;
      case NUMBER_BUTTON_ACTION.NUMBER_8_INPUT:
        this.state = {
          ...this.state,
          selectedNumber: this.state.selectedNumber + STR_TO_NUM.eight
        };
        break;
      case NUMBER_BUTTON_ACTION.NUMBER_9_INPUT:
        this.state = {
          ...this.state,
          selectedNumber: this.state.selectedNumber + STR_TO_NUM.nine
        };
        break;
      case NUMBER_BUTTON_ACTION.NUMBER_CANCEL_INPUT:
        this.state = {
          ...this.state,
          selectedNumber: ""
        };
        break;
      case NUMBER_BUTTON_ACTION.NUMBER_SUBMIT_INPUT:
        this.state = {
          ...this.state,
          selectedNumber: ""
        };
      default:
        break;
    }
    this.notify.call(this, [this.state]);
  }
}

export default VendingMachineModel;
