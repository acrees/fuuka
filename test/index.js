import Chai from 'chai'
import Store from '../src'

Chai.should();

describe('Store', () => {
  it('should use provided state', () => {
    var state = {};
    var sut = new Store(state);
    sut.getState().should.equal(state);
  });
  it('should have a subscribe function', () => {
    var sut = new Store({});
    sut.subscribe();
  });
  it('should store dispatched actions', () => {
    var action = { type: 'test' };
    var sut = new Store({});

    sut.dispatch(action);

    sut.getActions()[0].should.equal(action);
  });
  it('should work even if dispatched is called in magic ways', () => {
    var action = { type: 'test' };

    var sut = new Store({});

    sut.dispatch.call(undefined, action);

    sut.getActions()[0].should.equal(action);
  });
});
