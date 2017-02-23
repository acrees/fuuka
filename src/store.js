export default class Store {
  constructor(state) {
    this.state = state;
    this.actions = [];
    this.dispatch = this._dispatch.bind(this);
  }

  subscribe() {}

  getState() {
    return this.state;
  }

  getActions() {
    return this.actions;
  }

  _dispatch(action) {
    this.actions.push(action);
  }
}
