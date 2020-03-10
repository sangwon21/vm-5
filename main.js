import ProductView from "./productView.js";
import SelectView from "./selectView.js";
import WalletView from "./walletView.js";
import { EW } from "./util.js";

const productView = new ProductView();
const selectView = new SelectView();
const walletView = new WalletView();

const product = EW(".product");
const selector = EW(".selector");
const wallet = EW(".wallet");

product.innerHTML = productView.render();
selector.innerHTML = selectView.render();
wallet.innerHTML = walletView.render();
