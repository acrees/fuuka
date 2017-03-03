import isEqual from 'lodash.isequal'

export default function plugin(chai, utils) {
  chai.Assertion.addChainableMethod('dispatched', function (input) {
    var predicate = typeof(input) == "object"
      ? a => isEqual(a, input)
      : input;
    var dispatchedActions = this._obj.getActions();
    var wasDispatched = dispatchedActions.filter(predicate).length;

    this.assert(
      wasDispatched,
      'expected MockStore to have dispatched #{exp}',
      'expected MockStore to have not dispatched #{exp}',
      input);
  });
}
