# fuuka #

This package contains a couple of utilities to aid unit testing with Redux.
Examples use [enzyme]() to render components into a fake DOM and allow testing
without additional complexity like a headless browser.

## A Mock Store ##

It's hard to test React components using the Redux provider, especially when they are nested.
To improve this a fake immutable store can be used to set up a state, then assert
on the condition of the component when rendered with that exact state.

    import { Store } from 'fuuka';
    import { mount } from 'enzyme';

    let store = new Store({ name: 'Alex' });

    let component = mount(
      <Provider store={store}>
        <GreetingsComponent />
      </Provider>;
    );

    component.find('h1').first().text().should.equal('Hello, Alex!');

## Chai Plugin ##

When testing UI components in a React/Redux system, the result of
a click or other interaction in the UI is often simply an action being dispatched,
since reducers are decoupled from this and can be tested seperately. To make this
common pattern a little easier, the mock store tracks any actions that are dispatched
such that they can be asserted on. A Chai extension wraps this to give
a nice API around it.

    import { Store } from 'fuuka';
    import { mount } from 'enzyme';

    let store = new Store({ name: 'Alex' });

    let component = mount(
      <Provider store={store}>
        <GreetingsComponent />
      </Provider>;
    );

    component.find('button#click-me').simulate('click');

    store.should.have.dispatched({ type: 'clicked' });

A deep equality comparison is performed on the argument. Alternatively, a predicate
may be supplied:

    store.should.have.dispatched(a => a.type == 'clicked');
