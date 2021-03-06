import Chai from 'chai'
import td from 'testdouble'
import Store from '../src/store'
import dispatchedPlugin from '../src/plugin'

Chai.use(dispatchedPlugin);
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
  it('executes functions that are passed to it', () => {
    var state = { test: 1 };
    var sut = new Store(state);

    var action = td.function('action');
    td.when(action(state))
      .thenReturn({ type: 'test', data: 'string' });

    sut.dispatch(function (dispatch, getState) {
      dispatch(action(getState()));
    });

    sut.should.have.dispatched({ type: 'test', data: 'string' });
  });
});

describe('Plugin', () => {
  it('should pass if matching action dispatched', () => {
    var sut = new Store({});

    sut.dispatch({ type: 'test', data: 1 });

    sut.should.have.dispatched({ type: 'test', data: 1 });
  });
  it('should fail if no matching action dispatched', () => {
    var sut = new Store({});

    sut.dispatch({ type: 'test', data: 1 });

    Chai.expect(function () {
      sut.should.have.dispatched({ type: 'test', data: 2 });
    }).to.throw("expected MockStore to have dispatched { type: 'test', data: 2 }");
  });
  it('takes a predicate function too', () => {
    var sut = new Store({});

    sut.dispatch({ type: 'test', data: 1 });

    sut.should.have.dispatched(a => a.type == 'test');
  });
  it('fails properly for predicates', () => {
    var sut = new Store({});

    sut.dispatch({ type: 'test', data: 1 });

    Chai.expect(function () {
      sut.should.have.dispatched(a => a.type == 'testing');
    }).to.throw("expected MockStore to have dispatched [Function]");
  });
});
