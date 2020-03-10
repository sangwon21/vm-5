import ProductView from "./productView.js";
import SelectView from "./selectView.js";
import WalletView from "./walletView.js";
import WalletModel from "./walletModel.js";
import { EW } from "./util.js";

const walletModel = new WalletModel();

const product = EW(".product");
const selector = EW(".selector");
const wallet = EW(".wallet");

const productView = new ProductView(product);
const selectView = new SelectView(selector);
const walletView = new WalletView(wallet, walletModel);

productView.render();
selectView.render();
