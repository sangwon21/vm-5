import MockItemData from "../util/mockItemData.js";
import { calculateCoinSum } from "../util/util.js";

class ProductView {
  constructor(target, vendingMachineModel) {
    this.target = target;
    this.vendingMachineModel = vendingMachineModel;
    this.render = this.render.bind(this);
    this.vendingMachineModel.subscribe(this.render);
    this.hasRendered = false;
  }

  toogleSelectedProduct(sum) {
    const productElements = this.target.firstElementChild.children;
    const selectedClassName = "selected";
    Array.prototype.forEach.call(productElements, element => {
      const elementPrice = element.lastElementChild.innerHTML;
      if (elementPrice < sum) {
        element.classList.add(selectedClassName);
      } else element.classList.remove(selectedClassName);
    });
  }

  render(data) {
    const sum = calculateCoinSum(data);
    if (this.hasRendered) {
      this.toogleSelectedProduct(sum);
      return;
    }
    this.hasRendered = true;
    const liHtml = MockItemData.reduce((liChunk, item) => {
      const { id, name, price, icon } = item;
      let li = `<li class="product-item">`;
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
