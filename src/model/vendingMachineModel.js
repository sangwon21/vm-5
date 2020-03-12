import Model from "./model.js";
import { INCREASE_COIN } from "../action/coinAction.js";
import { NUMBER_INPUT } from "../action/numberButtonAction.js";
import {
  LOG_MESSAGE,
  SELECTED_NUMBER_MAX_LENGTH,
  NUM_TO_STR
} from "../util/constants.js";

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

  findTargetNameAndLog(targetNumber) {
    const rightFulString = NUM_TO_STR[`${targetNumber}`];
    return [rightFulString, LOG_MESSAGE[`${rightFulString}`]];
  }

  dispatch(userAction) {
    if (!Array.isArray(userAction)) {
      this.notify.call(this, [this.state]);
      return;
    }
    const [action] = userAction;
    const { type, payload } = action;

    switch (type) {
      case INCREASE_COIN:
        const [targetPropertyName, logMessage] = this.findTargetNameAndLog(
          payload
        );
        this.state = {
          ...this.state,
          logs: [...this.state.logs, logMessage]
        };
        this.state[`${targetPropertyName}`] =
          this.state[`${targetPropertyName}`] + 1;
        break;
      case NUMBER_INPUT:
        this.state = {
          ...this.state,
          selectedNumber: this.state.selectedNumber + payload
        };
        break;
      default:
        break;
    }
    this.notify.call(this, [this.state]);
  }
}

export default VendingMachineModel;
