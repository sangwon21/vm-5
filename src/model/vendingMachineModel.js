import Model from "./model.js";
import { INCREASE_COIN } from "../action/coinAction.js";
import { NUMBER_INPUT } from "../action/numberButtonAction.js";
import { calculateCoinSum, calculateChanges } from "../util/util.js";
import { LOG_MESSAGE, SELECTED_NUMBER_MAX_LENGTH, NUM_TO_STR, STR_TO_NUM, TIMER_SEC } from "../util/constants.js";
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
      selectedNumber: "",
    };
    this.changeModel = changeModel;
    this.timer = null;
  }

  /**
   * 선택된 번호가 있는지 확인하는 함수입니다.
   * @return {boolean} 모델이 보관하고 있는 state 중 선택된 번호(selectedNumber)가 있는지 여부를 확인합니다.
   */
  hasSelectedNumber() {
    return this.state.selectedNumber.length !== 0;
  }

  /**
   * 선택된 번호가 2자리를 넘는지 확인하는 함수입니다.
   * @return {boolean} 모델이 보관하고 있는 state 중 선택된 번호(selectedNumber)가 허용된 길이를 초과하는지 확인합니다.
   */
  hasSelectedNumberReachedLimit() {
    return this.state.selectedNumber.length >= SELECTED_NUMBER_MAX_LENGTH;
  }

  /**
   * 선택된 번호가 올바른지 판별하는 함수입니다.
   * @param {number} num 판별하고 싶은 수를 인자로 받습니다.
   * @return {boolean} 데이터의 id 목록 중에 매개변수로 받은 수와 일치하는 수가 있는지 확인합니다.
   */
  hasProperSelectedNumber(num) {
    return MockItemData.some(data => data.id === num);
  }

  /**
   * 특정 물품을 구매하기에 충분한 돈이 있는지 판별하는 함수입니다.
   * @param {object} item 구매할 물품 객체를 인자로 받습니다.
   * @param {number} money 투입한 동전의 합을 인자로 받습니다.
   * @return {boolean} 물품의 가격보다 투입한 금액이 많은지 확인합니다.
   */
  hasEnoughMoney(item, money) {
    return item.price <= money;
  }

  findTargetNameAndLog(targetNumber) {
    const rightFulString = NUM_TO_STR[`${targetNumber}`];
    return [rightFulString, LOG_MESSAGE[`${rightFulString}`]];
  }

  /**
   * 입력 버튼 클릭 시 나타날 로그메세지를 선택하는 함수입니다.
   * @param {number} num 입력한 수를 인자로 받습니다.=
   * @param {object} item 구매할 물품 객체를 인자로 받습니다.
   * @return {string} 번호가 인덱스 범위에 포함되지 않으면, 혹은 충분한 돈을 갖고 있지 않으면 해당하는 문자열을 반환합니다. 조건에 모두 부합한다면 물건을 구매하는 함수를 반환합니다. 해당 함수는 구입에 해당하는 문자열을 반환합니다.
   */
  selectSubmitLogMessage(num, item) {
    if (!this.hasProperSelectedNumber(num)) {
      return LOG_MESSAGE.notRightIndex;
    }
    if (!this.hasEnoughMoney(item, calculateCoinSum(this.state))) {
      return LOG_MESSAGE.notEnoughMoney(item.price);
    }
    return this.purchaseSelectedProduct(item);
  }

  /**
   * 가지고 있는 프로퍼티 중 금액 관련 프로퍼티만 초기화하는 함수입니다.
   */
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

  /**
   * 돌려줄 금액 프로퍼티만 반환하는 함수입니다.
   * @return {object} 현재 가지고 있는 상태에서 금액 key를 삭제한 다른 key는 삭제한 후 객체를 반환합니다.
   */
  getChangeFromStatus() {
    const change = { ...this.state };
    delete change.logs;
    delete change.selectedNumber;
    return change;
  }

  /**
   * 선택한 물품을 구매하는 함수입니다.
   * @param {object} item 구매할 물품을 인자로 받습니다.
   * @return {string} 돈을 투입할 때 등록했던 타이머를 초기화하고, 잔돈을 계산 후 잔돈을 changeModel로 전달합니다. 구입 로그 문자열을 반환합니다.
   */
  purchaseSelectedProduct(item) {
    clearTimeout(this.timer);
    const insertedCoin = this.getChangeFromStatus();
    const change = calculateChanges(insertedCoin, item.price);
    this.getBackChange(change);
    return LOG_MESSAGE.purchase(item.name);
  }

  /**
   * 잔돈을 changeModel로 되돌려주는 함수입니다.
   * @param {object} change 잔돈 객체를 인자로 받습니다.
   * 잔돈을 changeModel로 보내주고, 현재 금액을 초기화합니다. 구독자에게 재렌더링을 요청합니다.
   */
  getBackChange(change) {
    this.changeModel.dispatch([{ type: GIVE_CHANGES, payload: change }]);
    this.state = this.initializeCoin();
    this.notify.call(this, [this.state]);
  }

  /**
   * 일정 시간이 지난 후 잔돈을 changeModel로 되돌려주는 함수입니다.
   * 돈을 입금할 때마다 타이머를 초기화하고, 타이머가 다 된다면 getBackChange 함수를 실행하고 시간 초과 로그를 추가합니다.
   */
  getBackChangeAfterTimer() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      const change = this.getChangeFromStatus();
      this.state = {
        ...this.state,
        selectedNumber: "",
        logs: [...this.state.logs, LOG_MESSAGE.timeout(TIMER_SEC)],
      };
      this.getBackChange(change);
    }, TIMER_SEC * 1000);
  }

  /**
   * 금액을 투입할 때 실행되는 함수입니다.
   * @param {object} payload 금액 객체를 인자로 받습니다.
   * 투입한 금액만큼 금액을 더하고, getBackChangeAfterTimer 함수를 실행합니다.
   */
  dispatchTypeIncreaseCoin(payload) {
    const [targetPropertyName, logMessage] = this.findTargetNameAndLog(payload);
    this.state = {
      ...this.state,
      logs: [...this.state.logs, logMessage],
    };
    this.state[`${targetPropertyName}`] = this.state[`${targetPropertyName}`] + 1;
    this.getBackChangeAfterTimer();
  }

  /**
   * 상품 번호 다이얼을 누를 때 실행되는 함수입니다.
   * @param {number} payload 눌린 버튼의 id를 인자로 받습니다.
   * 입력 버튼을 눌렀을 경우, 취소 버튼을 눌렀을 경우, 숫자 버튼을 눌렀을 경우를 판단하여 상태를 변경합니다.
   */
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
