import Model from "./model.js";
import { INCREASE_COIN } from "../action/coinAction.js";
import { NUMBER_INPUT } from "../action/numberButtonAction.js";
import { calculateCoinSum, calculateChanges } from "../util/util.js";
import { LOG_MESSAGE, SELECTED_NUMBER_MAX_LENGTH, NUM_TO_STR, STR_TO_NUM, TIMER_SEC } from "../util/constants.js";
import MockItemData from "../util/mockItemData.js";
import { GIVE_CHANGES } from "../action/changeAction.js";

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
      logs: [LOG_MESSAGE.startMessage],
      selectedNumber: "",
    };
    this.changeModel = changeModel;
    this.timer = null;
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

  selectSubmitLogMessage(num, item) {
    if (!this.hasProperSelectedNumber(num)) {
      return LOG_MESSAGE.notRightIndex;
    }
    if (!this.hasEnoughMoney(item, calculateCoinSum(this.state))) {
      return LOG_MESSAGE.notEnoughMoney(item.price);
    }
    return this.purchaseSelectedProduct(item);
  }

  initializeCoin() {
    return {
      ...this.state,
      ten: 0,
      fifty: 0,
      hundred: 0,
      fiveHundred: 0,
      thousand: 0,
      fiveThousand: 0,
      tenThousand: 0,
    };
  }

  getChangeFromStatus() {
    const change = { ...this.state };
    delete change.logs;
    delete change.selectedNumber;
    return change;
  }

  purchaseSelectedProduct(item) {
    const insertedCoin = this.getChangeFromStatus();
    const change = calculateChanges(insertedCoin, item.price);
    this.getBackChange(change);
    return LOG_MESSAGE.purchase(item.name);
  }

  getBackChange(change) {
    this.changeModel.dispatch([{ type: GIVE_CHANGES, payload: change }]);
    this.state = this.initializeCoin();
    this.notify.call(this, [this.state]);
  }

  getBackChangeAfterTimer() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      const change = this.getChangeFromStatus();
      this.getBackChange(change);
      this.state = {
        ...this.state,
        logs: [...this.state.logs, LOG_MESSAGE.timeout(TIMER_SEC)],
      };
    }, TIMER_SEC * 1000);
  }

  dispatchTypeIncreaseCoin(payload) {
    const [targetPropertyName, logMessage] = this.findTargetNameAndLog(payload);
    this.state = {
      ...this.state,
      logs: [...this.state.logs, logMessage],
    };
    this.state[`${targetPropertyName}`] = this.state[`${targetPropertyName}`] + 1;
    this.getBackChangeAfterTimer();
  }

  dispatchTypeNumberInput(payload) {
    if (payload === STR_TO_NUM.submit || payload === STR_TO_NUM.cancel) {
      const selectedNumber = "";
      let logMessage = "";
      if (payload === STR_TO_NUM.submit) {
        const selectedNum = parseInt(this.state.selectedNumber);
        const selectedItem = MockItemData[selectedNum - 1];
        logMessage = this.selectSubmitLogMessage(selectedNum, selectedItem);
      }
      if (payload === STR_TO_NUM.cancel) {
        logMessage = LOG_MESSAGE.cancel;
      }
      this.state = { ...this.state, selectedNumber, logs: [...this.state.logs, logMessage] };
    } else if (!this.hasSelectedNumberReachedLimit()) {
      this.state = {
        ...this.state,
        selectedNumber: this.state.selectedNumber + payload,
      };
    }
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
        this.dispatchTypeIncreaseCoin(payload);
        break;
      case NUMBER_INPUT:
        this.dispatchTypeNumberInput(payload);
        break;
      default:
        break;
    }
    this.notify.call(this, [this.state]);
  }
}

export default VendingMachineModel;
