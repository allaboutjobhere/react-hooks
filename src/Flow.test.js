import Flow from './Flow';

const unknownEvent = {

  custom: {
    
    id: 'unknownId',
  },
};

const customEvent = {

  custom: {
    
    id: 'incrementNumber',
  },
};

const store = {

  state: Flow.initialState,
  setState: jest.fn(),
  reaction: Flow.reaction,
};

const testEffect = () => {

  Flow.effect(

    {
      store,
    }, 
  );

  const expected = {

    ...store.state,
    effected: true,
  };

  expect(

    store.setState,

  ).toHaveBeenCalledWith(

    expected,
  );
};

const testUpdateByUnknownEvent = () => {

  Flow.update(

    {
      store,
    }, 
    unknownEvent,
  );

  const expected = store.state;

  expect(

    store.state,

  ).toEqual(

    expected,
  );
};

const testUpdateByCustomEvent = () => {

  Flow.update(

    {
      store,
    },
    customEvent,
  );

  const expected = {

    ...store.state,
    number: 1,
  };

  expect(

    store.setState,

  ).toHaveBeenCalledWith(

    expected,
  );
};

test(

  'Flow: effect',
  testEffect,
);

test(

  'Flow: update by unknown event',
  testUpdateByUnknownEvent,
);

test(
  
  'Flow: update by custom event', 
  testUpdateByCustomEvent,
);
