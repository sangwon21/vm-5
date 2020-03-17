import Model from "./model.js";
import { INCREASE_COIN } from "../action/coinAction.js";
import { NUMBER_INPUT } from "../action/numberButtonAction.js";
import { calculateCoinSum } from "../util/util.js";
import { LOG_MESSAGE, SELECTED_NUMBER_MAX_LENGTH, NUM_TO_STR, STR_TO_NUM } from "../util/constants.js";
import MockItemData from "../util/mockItemData.js";

class VendingMachineModel extends Model {
  constructor(changeModel) {
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
      selectedNumber: "",
    };
    this.changeModel = changeModel;
  }

  hasSelectedNumber() {
    return this.state.selectedNumber.length !== 0;
  }

  hasSelectedNumberReachedLimit() {
    return this.state.selectedNumber.length >= SELECTED_NUMBER_MAX_LENGTH;
  }

  hasProperSelectedNumber(num) {
    return MockItemData.some(data => data.id === num);
  }

  hasEnoughMoney(item, money) {
    return item.price <= money;
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
        const [targetPropertyName, logMessage] = this.findTargetNameAndLog(payload);
        this.state = {
          ...this.state,
          logs: [...this.state.logs, logMessage],
        };
        this.state[`${targetPropertyName}`] = this.state[`${targetPropertyName}`] + 1;
        break;
      case NUMBER_INPUT:
        if (payload === STR_TO_NUM.submit) {
          const selectedNumber = "";
          let logMessage = "";
          if (!this.hasProperSelectedNumber(parseInt(this.state.selectedNumber))) {
            logMessage = LOG_MESSAGE.notRightIndex;
          } else {
            const selectedItem = MockItemData[parseInt(this.state.selectedNumber) - 1];
            if (!this.hasEnoughMoney(selectedItem, calculateCoinSum(this.state))) {
              logMessage = LOG_MESSAGE.notEnoughMoney(selectedItem.price);
            } else {
              logMessage = LOG_MESSAGE.purchase(selectedItem.name);
            }
          }
          this.state = { ...this.state, selectedNumber, logs: [...this.state.logs, logMessage] };
          break;
        }

        if (payload === STR_TO_NUM.cancel) {
          const selectedNumber = "";
          const logMessage = LOG_MESSAGE.cancel;
          this.state = { ...this.state, selectedNumber, logs: [...this.state.logs, logMessage] };
          break;
        }

        this.state = {
          ...this.state,
          selectedNumber: this.state.selectedNumber + payload,
        };
        break;
      default:
        break;
    }
    this.notify.call(this, [this.state]);
  }
}

export default VendingMachineModel;
