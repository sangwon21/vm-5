import MockItemData from "../util/mockItemData.js";
import { calculateCoinSum } from "../util/util.js";

class ProductView {
  constructor(target, vendingMachineModel) {
    this.target = target;
    this.vendingMachineModel = vendingMachineModel;
    this.render = this.render.bind(this);
    this.vendingMachineModel.subscribe(this.render);
  }

  render(data) {
    const sum = calculateCoinSum(data);

    const liHtml = MockItemData.reduce((liChunk, item) => {
      const { id, name, price, icon } = item;
      let li = sum < price ? `<li class="product-item">` : `<li class="product-item selected">`;
      li += `<span class="item-index">${id}</span><div class="item-name">${icon}</div><span class="item-price">${price}</span></li>`;
      liChunk += li;
      return liChunk;
    }, "");

    this.target.innerHTML = `<ul class="product-list">
      ${liHtml}
    </ul>`;
  }
}

export default ProductView;
