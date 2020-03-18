import { EW, calculateCoinSum } from "../util/util.js";
import { MESSAGE_BOX_CLASS, MAX_MESSAGE_BOX_SCROLL_LENGTH, NUMBER_BUTTON_ID, STR_TO_NUM } from "../util/constants.js";
import { NUMBER_INPUT } from "../action/numberButtonAction.js";

class SelectView {
  constructor(target, vendingMachineModel) {
    this.target = target;
    this.vendingMachineModel = vendingMachineModel;
    this.numberButtonClickHandler = this.numberButtonClickHandler.bind(this);
    this.render = this.render.bind(this);
    this.vendingMachineModel.subscribe(this.render);
    this.vendingMachineModel.dispatch({});
  }

  setMessageWindowScollToBottom() {
    EW(`.${MESSAGE_BOX_CLASS}`).scrollTop = MAX_MESSAGE_BOX_SCROLL_LENGTH;
  }

  getRightfulButtonWorth(id) {
    switch (id) {
      case NUMBER_BUTTON_ID.ZERO:
        return STR_TO_NUM[`${NUMBER_BUTTON_ID.ZERO}`];
      case NUMBER_BUTTON_ID.ONE:
        return STR_TO_NUM[`${NUMBER_BUTTON_ID.ONE}`];
      case NUMBER_BUTTON_ID.TWO:
        return STR_TO_NUM[`${NUMBER_BUTTON_ID.TWO}`];
      case NUMBER_BUTTON_ID.THREE:
        return STR_TO_NUM[`${NUMBER_BUTTON_ID.THREE}`];
      case NUMBER_BUTTON_ID.FOUR:
        return STR_TO_NUM[`${NUMBER_BUTTON_ID.FOUR}`];
      case NUMBER_BUTTON_ID.FIVE:
        return STR_TO_NUM[`${NUMBER_BUTTON_ID.FIVE}`];
      case NUMBER_BUTTON_ID.SIX:
        return STR_TO_NUM[`${NUMBER_BUTTON_ID.SIX}`];
      case NUMBER_BUTTON_ID.SEVEN:
        return STR_TO_NUM[`${NUMBER_BUTTON_ID.SEVEN}`];
      case NUMBER_BUTTON_ID.EIGHT:
        return STR_TO_NUM[`${NUMBER_BUTTON_ID.EIGHT}`];
      case NUMBER_BUTTON_ID.NINE:
        return STR_TO_NUM[`${NUMBER_BUTTON_ID.NINE}`];
      case NUMBER_BUTTON_ID.SUBMIT:
        return STR_TO_NUM[`${NUMBER_BUTTON_ID.SUBMIT}`];
      case NUMBER_BUTTON_ID.CANCEL:
        return STR_TO_NUM[`${NUMBER_BUTTON_ID.CANCEL}`];
      default:
    }
  }

  numberButtonClickHandler(event) {
    const { target } = event;
    const buttonWorth = this.getRightfulButtonWorth(target.id);
    if (buttonWorth === undefined) return;
    this.vendingMachineModel.dispatch.call(this.vendingMachineModel, [{ type: NUMBER_INPUT, payload: buttonWorth }]);
  }

  addEvents() {
    this.target.addEventListener("click", this.numberButtonClickHandler);
  }

  removeEvents() {
    this.target.removeEventListener("click", this.numberButtonClickHandler);
  }

  render(data) {
    const sum = calculateCoinSum(data);
    const { logs, selectedNumber } = data;
    this.removeEvents();
    this.target.innerHTML = `<div class="price-window"><div class="select-number">${selectedNumber}</div><b class="price-input">${sum}</b></div>
      <div class="select-button-wrap">
        <ul class="select-button-list">
          <li><button id=${NUMBER_BUTTON_ID.ONE}>1</button></li>
          <li><button id=${NUMBER_BUTTON_ID.TWO}>2</button></li>
          <li><button id=${NUMBER_BUTTON_ID.THREE}>3</button></li>
          <li><button id=${NUMBER_BUTTON_ID.FOUR}>4</button></li>
          <li><button id=${NUMBER_BUTTON_ID.FIVE}>5</button></li>
          <li><button id=${NUMBER_BUTTON_ID.SIX}>6</button></li>
          <li><button id=${NUMBER_BUTTON_ID.SEVEN}>7</button></li>
          <li><button id=${NUMBER_BUTTON_ID.EIGHT}>8</button></li>
          <li><button id=${NUMBER_BUTTON_ID.NINE}>9</button></li>
          <li><button class="command" id=${NUMBER_BUTTON_ID.CANCEL}>취소</button></li>
          <li><button id=${NUMBER_BUTTON_ID.ZERO}>0</button></li>
          <li><button class="command" id=${NUMBER_BUTTON_ID.SUBMIT}>입력</button></li>
        </ul>
      </div>
      <div class="message-window">
        <ol class=${MESSAGE_BOX_CLASS}>
        ${logs.reduce((liHTML, log) => (liHTML += `<li>${log}</li>`), "")}
        </ol>
      </div>`;

    this.setMessageWindowScollToBottom();
    this.addEvents();
  }
}

export default SelectView;
