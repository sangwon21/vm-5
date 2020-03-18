/**
 * @classdesc Model 공급자와 소비자에게 구독 - 발행 관계를 설정하는 Class입니다.
 * @class Model
 *
 */
class Model {
  constructor() {
    this.models = new Set();
  }

  /**
   *
   * @param {function} callback 구독자를 인자로 받습니다.
   */
  subscribe(callback) {
    this.models.add(callback);
  }

  /**
   *
   * @param {function} callback 구독을 끊기 원하는 함수를 인자로 받습니다.
   */
  unsubscribe(callback) {
    this.models = [...this.models].filter(
      subscriber => subscriber !== callback
    );
  }

  /**
   *
   * @param {*} data 구독자에게 넘겨줄 data입니다.
   */
  notify([data]) {
    this.models.forEach(callback => callback(data));
  }
}

export default Model;
