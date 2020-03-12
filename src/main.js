import ProductView from "./view/productView.js";
import SelectView from "./view/selectView.js";
import WalletView from "./view/walletView.js";
import WalletModel from "./model/walletModel.js";
import VendingMachineModel from "./model/vendingMachineModel.js";
import { EW } from "./util/util.js";

const walletModel = new WalletModel();
const vendingMachineModel = new VendingMachineModel();

const product = EW(".product");
const selector = EW(".selector");
const wallet = EW(".wallet");

const productView = new ProductView(product, vendingMachineModel);
const selectView = new SelectView(selector, vendingMachineModel);
const walletView = new WalletView(wallet, vendingMachineModel, walletModel);
