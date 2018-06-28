export default class Store {
  constructor(state) {
    this.state = state;
    this.actions = [];
    this.dispatch = this._dispatch.bind(this);
    this.getState = this._getState.bind(this);
  }

  subscribe() {
    return function unsubscribe() {};
  }

  _getState() {
    return this.state;
  }

  getActions() {
    return this.actions;
  }

  _dispatch(action) {
    if (typeof(action) === 'function')  {
      action(this.dispatch, (function(){ 
        return this.state
      }).bind(this));
    } else {
      this.actions.push(action);
    }
  }
}
