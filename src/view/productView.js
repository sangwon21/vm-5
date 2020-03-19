import MockItemData from "../util/mockItemData.js";
import { EWA, calculateCoinSum } from "../util/util.js";
import { LOG_MESSAGE, ANIMATION_DURATION_TIME, CLASS_NAME } from "../util/constants.js";

/**
 * @classdesc ProductView 사용자에게 판매하는 데이터를 렌더링하는 Class입니다.
 * @class ProductView
 */
class ProductView {
  constructor(target, vendingMachineModel) {
    this.target = target;
    this.vendingMachineModel = vendingMachineModel;
    this.render = this.render.bind(this);
    this.vendingMachineModel.subscribe(this.render);
    this.hasRendered = false;
    this.productList = [];
  }

  /**
   * 구매할 수 있는 상품 목록을 하이라이트하는 함수입니다.
   * @param {number} sum 현재 투입한 금액을 인자로 받습니다.
   * 상품 목록을 탐색하며, 상품의 금액이 금액보다 작을 경우 SELECTED 클래스를 더하고, 아니면 제거합니다.
   */
  toggleSelectedProduct(sum) {
    const selectedClassName = CLASS_NAME.PRODUCT_VIEW.SELECTED;
    Array.prototype.forEach.call(this.productList, element => {
      const productPrice = element.querySelector(`.${CLASS_NAME.PRODUCT_VIEW.ITEM_PRICE}`);
      if (productPrice.innerHTML <= sum) {
        element.classList.add(selectedClassName);
      } else element.classList.remove(selectedClassName);
    });
  }

  /**
   * 구매한 상품을 animating 시키는 함수입니다.
   * @param {object} data Model의 상태를 인자로 받습니다.
   * 구매한 물건에 PURCHASED 클래스를 추가합니다. 애니메이션 시간이 지나면, 클래스를 제거합니다.
   */
  togglePurchasedProduct(data) {
    if (data.selectedNumber !== "") return;
    const purchasedProduct = this.getPurchasedProduct(data);
    const purchasedClassName = CLASS_NAME.PRODUCT_VIEW.PURCHASED;
    for (let index = 0; index < this.productList.length; index++) {
      const productName = this.productList[index].querySelector(`.${CLASS_NAME.PRODUCT_VIEW.ITEM_NAME}`);
      if (productName.innerHTML === purchasedProduct) {
        this.productList[index].classList.add(purchasedClassName);
        setTimeout(() => {
          this.productList[index].classList.remove(purchasedClassName);
        }, ANIMATION_DURATION_TIME * 1000);
        break;
      }
    }
  }

  /**
   * 구매한 상품이 무엇인지 판별하는 함수입니다.
   * @param {object} data Model의 상태를 인자로 받습니다.
   * @return {string} 구매한 상품의 이름(아이콘)을 반환합니다.
   * 가장 최근의 로그가 구매 완료 로그이고, MockItemData의 이름을 넣은 구매 완료 로그가 같을 경우 해당 MockItemData의 이름을 반환합니다.
   */
  getPurchasedProduct(data) {
    const latestLog = data.logs[data.logs.length - 1];
    for (let index = 0; index < MockItemData.length; index++) {
      if (latestLog === LOG_MESSAGE.purchase(MockItemData[index].name)) return MockItemData[index].icon;
    }
    return "";
  }

  /**
   * 화면에 상품 데이터를 렌더링합니다. 사용자의 동전 투입 금액에 따라 상품 데이터 표시 방법에 변경이 있습니다.
   * @param {Object} data 사용자에게 전시할, 상품 데이터를 담은 객체를 인자로 받습니다.
   */
  render(data) {
    const sum = calculateCoinSum(data);
    if (this.hasRendered) {
      this.toggleSelectedProduct(sum);
      this.togglePurchasedProduct(data);
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
    this.productList = EWA(`.${CLASS_NAME.PRODUCT_VIEW.ITEM_LIST}`);
  }
}

export default ProductView;
