import utils from './utils';

const testBind = () => {

  const ctx = 0;

  const props = [

    1,
    2,
  ];

  const fn = jest.fn();

  const myFn = utils.bind(

    fn,
    ctx,
  );

  const expected = [

    0,
    1,
    2,
  ];

  myFn(

    ...props,
  );

  expect(

    fn,

  ).toHaveBeenCalledWith(

    ...expected,
  );
};

const testHandle = () => {

  const eventName = '~';

  const emitter = {
      
    emit: jest.fn(),
  };

  const custom = {

    id: 'incrementNumber',
  };

  const origin = {};

  const ctx = {

    emitter,
    eventName,
    custom,
  };

  const expected = [

    eventName,
    {
      custom,
      origin,
    },
  ];

  utils.handle(

    ctx,
    {},
  );

  expect(

    emitter.emit,

  ).toHaveBeenCalledWith(

    ...expected,
  );
};

const testReducePropsToArr = () => {

  const props = {

    a: 0,
    b: 1,
  };

  const expected = [

    0,
    1,
  ];

  const result = Object.keys(

    props,

  ).reduce(

    utils.bind(

      utils.reducePropsToArr,
      props,
    ),
    [],
  );

  expect(

    result,

  ).toEqual(

    expected,
  );
};

test(

  'Utils: bind',
  testBind,
);

test(

  'Utils: handle',
  testHandle,
);

test(

  'Utils: reducePropsToArr',
  testReducePropsToArr,
);
