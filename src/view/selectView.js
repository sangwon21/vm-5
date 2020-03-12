import {
  EW,
  calculateCoinSum,
  MESSAGE_BOX_CLASS,
  MAX_MESSAGE_BOX_SCROLL_LENGTH,
  NUMBER_BUTTON_ID
} from "../util/util.js";
import { NUMBER_BUTTON_ACTION } from "../action/numberButtonAction.js";

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

  getRightfulActionType(id) {
    switch (id) {
      case NUMBER_BUTTON_ID.ZERO:
        return NUMBER_BUTTON_ACTION.NUMBER_0_INPUT;
      case NUMBER_BUTTON_ID.ONE:
        return NUMBER_BUTTON_ACTION.NUMBER_1_INPUT;
      case NUMBER_BUTTON_ID.TWO:
        return NUMBER_BUTTON_ACTION.NUMBER_2_INPUT;
      case NUMBER_BUTTON_ID.THREE:
        return NUMBER_BUTTON_ACTION.NUMBER_3_INPUT;
      case NUMBER_BUTTON_ID.FOUR:
        return NUMBER_BUTTON_ACTION.NUMBER_4_INPUT;
      case NUMBER_BUTTON_ID.FIVE:
        return NUMBER_BUTTON_ACTION.NUMBER_5_INPUT;
      case NUMBER_BUTTON_ID.SIX:
        return NUMBER_BUTTON_ACTION.NUMBER_6_INPUT;
      case NUMBER_BUTTON_ID.SEVEN:
        return NUMBER_BUTTON_ACTION.NUMBER_7_INPUT;
      case NUMBER_BUTTON_ID.EIGHT:
        return NUMBER_BUTTON_ACTION.NUMBER_8_INPUT;
      case NUMBER_BUTTON_ID.NINE:
        return NUMBER_BUTTON_ACTION.NUMBER_9_INPUT;
      case NUMBER_BUTTON_ID.SUBMIT:
        return NUMBER_BUTTON_ACTION.NUMBER_SUBMIT_INPUT;
      case NUMBER_BUTTON_ID.CANCEL:
        return NUMBER_BUTTON_ACTION.NUMBER_CANCEL_INPUT;
      default:
        return;
    }
  }

  numberButtonClickHandler(event) {
    const { target } = event;

    const type = this.getRightfulActionType(target.id);

    if (!type) {
      return;
    }

    if (!this.vendingMachineModel.hasSelectedNumberReachedLimit()) {
      this.vendingMachineModel.dispatch.call(this.vendingMachineModel, [
        { type }
      ]);
    }
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

    console.log(selectedNumber);
    this.removeEvents();
    this.target.innerHTML = `<div class="price-window"><b class="price-input">${sum}</b></div>
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
          <li><button class="command" id=${
            NUMBER_BUTTON_ID.CANCEL
          }>취소</button></li>
          <li><button id=${NUMBER_BUTTON_ID.ZERO}>0</button></li>
          <li><button class="command" id=${
            NUMBER_BUTTON_ID.SUBMIT
          }>입력</button></li>
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
