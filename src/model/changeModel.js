import { GIVE_CHANGES, GET_BACK_CHANGES } from "../action/changeAction.js";

class ChangeModel {
  constructor(walletModel) {
    this.walletModel = walletModel;
  }

  dispatch(userAction) {
    const [action] = userAction;
    const { type, payload } = action;
    switch (type) {
      case GIVE_CHANGES:
        this.walletModel.dispatch.call(this.walletModel, [{ type: GET_BACK_CHANGES, payload }]);
        break;
      default:
        break;
    }
  }
}

export default ChangeModel;
