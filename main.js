import ProductView from "./productView.js";
import SelectView from "./selectView.js";
import WalletView from "./walletView.js";
import WalletModel from "./walletModel.js";
import VendingMachineModel from "./vendingMachineModel.js";
import { EW } from "./util.js";

const walletModel = new WalletModel();
const vendingMachineModel = new VendingMachineModel();

const product = EW(".product");
const selector = EW(".selector");
const wallet = EW(".wallet");

const productView = new ProductView(product);
const selectView = new SelectView(selector, vendingMachineModel);
const walletView = new WalletView(wallet, vendingMachineModel, walletModel);

productView.render();
