import { calculateCoinSum } from "../util/util.js";
class SelectView {
  constructor(target, vendingMachineModel) {
    this.target = target;
    this.vendingMachineModel = vendingMachineModel;
    this.render = this.render.bind(this);
    this.vendingMachineModel.subscribe(this.render);
    this.vendingMachineModel.dispatch({});
  }
  render(data) {
    const sum = calculateCoinSum(data);
    const { logs } = data;

    this.target.innerHTML = `<div class="price-window"><b class="price-input">${sum}</b></div>
      <div class="select-button-wrap">
        <ul class="select-button-list">
          <li><button>1</button></li>
          <li><button>2</button></li>
          <li><button>3</button></li>
          <li><button>4</button></li>
          <li><button>5</button></li>
          <li><button>6</button></li>
          <li><button>7</button></li>
          <li><button>8</button></li>
          <li><button>9</button></li>
          <li><button class="command">취소</button></li>
          <li><button>0</button></li>
          <li><button class="command">입력</button></li>
        </ul>
      </div>
      <div class="message-window">
        <ol class="message">
        ${logs.reduce((liHTML, log) => (liHTML += `<li>${log}<li>`), "")}
        </ol>
      </div>`;
  }
}

export default SelectView;
