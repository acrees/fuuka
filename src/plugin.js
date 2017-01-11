import isEqual from 'lodash.isequal'

export default function plugin(chai, utils) {
  chai.Assertion.addChainableMethod('dispatched', function (action) {
    var dispatchedActions = this._obj.getActions();
    var wasDispatched = dispatchedActions.filter(a => isEqual(a, action)).length;

    this.assert(
      wasDispatched,
      'expected MockStore to have dispatched #{exp}',
      'expected MockStore to have not dispatched #{exp}',
      action);
  });
}
