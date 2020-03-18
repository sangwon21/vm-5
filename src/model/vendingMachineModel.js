import Model from "./model.js";
import { INCREASE_COIN } from "../action/coinAction.js";
import { NUMBER_INPUT } from "../action/numberButtonAction.js";
import { calculateCoinSum } from "../util/util.js";
import {
  LOG_MESSAGE,
  SELECTED_NUMBER_MAX_LENGTH,
  NUM_TO_STR,
  STR_TO_NUM,
  TIMER_SEC
} from "../util/constants.js";
import MockItemData from "../util/mockItemData.js";
import { GIVE_CHANGES } from "../action/changeAction.js";

/**
 * @classdesc VendingMachineModel 자판기에서 사용하는 데이터를 모아놓은 모델 Class입니다.
 * VendingMachineModel 속 데이터가 변하면, 구독자에게 데이터가 변한 사실을 알려줍니다.
 * @class VendingMachineModel
 */
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
      selectedNumber: ""
    };
    this.changeModel = changeModel;
    this.timer = null;
  }

  /**
   * @return {boolean} 모델이 보관하고 있는 state 중 선택된 번호(selectedNumber)가 있는지 여부를 확인합니다.
   */
  hasSelectedNumber() {
    return this.state.selectedNumber.length !== 0;
  }

  /**
   * @return {boolean} 모델이 보관하고 있는 state 중 선택된 번호(selectedNumber)가 허용된 길이를 초과하는지 확인합니다.
   */
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

  selectSubmitLogMessage() {
    if (!this.hasProperSelectedNumber(parseInt(this.state.selectedNumber))) {
      return LOG_MESSAGE.notRightIndex;
    }
    const selectedItem = MockItemData[parseInt(this.state.selectedNumber) - 1];
    if (!this.hasEnoughMoney(selectedItem, calculateCoinSum(this.state))) {
      return LOG_MESSAGE.notEnoughMoney(selectedItem.price);
    }
    return LOG_MESSAGE.purchase(selectedItem.name);
  }

  getBackChangeAfterTimer() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      const change = { ...this.state };
      delete change.logs;
      delete change.selectedNumber;

      this.changeModel.dispatch([{ type: GIVE_CHANGES, payload: change }]);
      this.state = {
        ...this.state,
        ten: 0,
        fifty: 0,
        hundred: 0,
        fiveHundred: 0,
        thousand: 0,
        fiveThousand: 0,
        tenThousand: 0,
        logs: [...this.state.logs, LOG_MESSAGE.timeout(TIMER_SEC)]
      };
      this.notify.call(this, [this.state]);
    }, TIMER_SEC * 1000);
  }

  /**
   * @desc 데이터를 변경 후, 구독자에게 데이터의 변경을 알려줍니다.
   * @param {Array} userAction 특정 행동을 정의한 Action을 인자로 받습니다.
   */
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
        this.getBackChangeAfterTimer();
        break;

      case NUMBER_INPUT:
        if (payload === STR_TO_NUM.submit || payload === STR_TO_NUM.cancel) {
          const selectedNumber = "";
          let logMessage = "";
          if (payload === STR_TO_NUM.submit) {
            logMessage = this.selectSubmitLogMessage();
          }
          if (payload === STR_TO_NUM.cancel) {
            logMessage = LOG_MESSAGE.cancel;
          }
          this.state = {
            ...this.state,
            selectedNumber,
            logs: [...this.state.logs, logMessage]
          };
        } else if (!this.hasSelectedNumberReachedLimit()) {
          this.state = {
            ...this.state,
            selectedNumber: this.state.selectedNumber + payload
          };
        }
        break;

      default:
        break;
    }
    this.notify.call(this, [this.state]);
  }
}

export default VendingMachineModel;
