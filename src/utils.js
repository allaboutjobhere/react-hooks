
const init = (A, ...p) => new A(...p);

const bind = (fn, o) => (...p) => fn(o, ...p);

const reducePropsToArr = (props, arr, key) => (
  [
    ...arr,
    props[key],
  ]
);

const reduceFlowsToArr = (state, arr, {get}) => (
  [
    ...arr,
    get(state),
  ]
);

const reduceFlowsToObj = (state, obj, {key, get}) => (
  {
    ...obj,
    [key]: get(state),
  }
);

const handle = (
  
  {emitter, eventName, custom}, origin,
  
) => {

  emitter.emit(

    eventName,
    {
      custom,
      origin,
    },
  );
};

const render = ({React, View, props}) => (

  <View
    {
      ...props
    }
  />
);

const reduceEmits = (

  {utils, emitter, eventName}, obj, {id, key},

) => (
    
  {
    ...obj,
    [key]: utils.bind(

      utils.handle,
      {
        emitter,
        eventName,
        custom: {
          
          id,
        },
      },
    ),
  }
);

const reduceViews = (engine, obj, key) => {

  const {

    emitter,
    eventName, 
    dPartyViews, 
    views, 
    Wrap, 
    utils,

  } = engine;

  const View = views[key];

  const {

    emits = [],

  } = View;
  
  const handlers = emits.reduce(

    utils.bind(

      utils.reduceEmits,
      {
        emitter,
        eventName,
        utils,
      },
    ),
    {},
  );

  const isWrapNeeded = dPartyViews.indexOf(
    
    key,
    
  ) < 0;

  const Unit = isWrapNeeded

    ? utils.bind(

        Wrap,
        {
          engine,
          View,
          handlers,
        },
      )

    : View;

  return {

    ...obj,
    [key]: Unit,
  };
};

export default {

  bind,
  init,
  handle,
  render,
  reduceViews,
  reduceEmits,
  reducePropsToArr,
  reduceFlowsToArr,
  reduceFlowsToObj,
};
