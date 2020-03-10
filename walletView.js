class WalletView {
  constructor() {}
  render() {
    return `<ul>
      <li>
        <button>10원</button>
        <div><span>0</span></div>
      </li>
      <li>
        <button>50원</button>
        <div><span>0</span></div>
      </li>
      <li>
        <button>100원</button>
        <div><span>0</span></div>
      </li>
      <li>
        <button>500원</button>
        <div><span>0</span></div>
      </li>
      <li>
        <button>1000원</button>
        <div><span>0</span></div>
      </li>
      <li>
        <button>5000원</button>
        <div><span>0</span></div>
      </li>
      <li>
        <button>10000원</button>
        <div><span>0</span></div>
      </li>
    </ul>
    <div class="wallet-sum"><b>23,550원</b></div>`;
  }
}

export default WalletView;
