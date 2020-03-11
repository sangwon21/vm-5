import MockItemData from "../util/mockItemData.js";

class ProductView {
  constructor(target, vendingMachineModel) {
    this.target = target;
    this.vendingMachineModel = vendingMachineModel;
    this.render = this.render.bind(this);
    this.vendingMachineModel.subscribe(this.render);
  }

  render(data) {
    const {
      ten,
      fifty,
      hundred,
      fiveHundred,
      thousand,
      fiveThousand,
      tenThousand
    } = data;

    const sum =
      (ten ? ten * 10 : 0) +
      (fifty ? fifty * 50 : 0) +
      (hundred ? hundred * 100 : 0) +
      (fiveHundred ? fiveHundred * 500 : 0) +
      (thousand ? thousand * 1000 : 0) +
      (fiveThousand ? fiveThousand * 5000 : 0) +
      (tenThousand ? tenThousand * 10000 : 0);

    const liHtml = MockItemData.reduce((liChunk, item) => {
      const { id, name, price, icon } = item;
      let li =
        sum < price
          ? `<li class="product-item">`
          : `<li class="product-item selected">`;
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
