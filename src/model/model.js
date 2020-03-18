class Model {
  constructor() {
    this.models = new Set();
  }

  subscribe(callback) {
    this.models.add(callback);
  }

  unsubscribe(model) {
    this.models = [...this.models].filter(subscriber => subscriber !== model);
  }

  notify([data]) {
    this.models.forEach(callback => callback(data));
  }
}

export default Model;
