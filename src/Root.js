import Events from 'events';
import React from 'react';
import * as ReactJSS from 'react-jss';

import Flow from './Flow';
import views from './views';
import Wrap from './Wrap';
import utils from './utils';
import Style from './Style';

const eventName = '~';

const context = React.createContext();

const useStyles = ReactJSS.createUseStyles(

  Style,
);

const emitter = utils.init(

  Events,
);

const dPartyViews = [
  
  'Route',
  'Router',
  'Switch',
];

const engine = {

  emitter,
  eventName,
  dPartyViews,
  React,
  context,
  Flow,
  utils,
  views,
  Wrap,
};

const units = Object.keys(

  views,

).reduce(

  utils.bind(

    utils.reduceViews,
    engine,
  ),
  {},
);

engine.units = units;

Root.defaultProps = {

  emitter,
  eventName,
  React,
  context,
  useStyles,
  Flow,
  utils,
  units,
};

function Root(props) {

  const {

    emitter,
    eventName,
    React,
    context,
    useStyles,
    Flow,
    utils,
    units,

  } = props;

  const [
    
    state,
    setState,
  
  ] = React.useState(

    Flow.initialState,
  );

  const classes = useStyles(

    state,
  );

  const store = {

    state, 
    setState,
    reaction: Flow.reaction,
  };

  const onEffect = utils.bind(

    Flow.effect,
    {
      store,
    },
  );

  const onUpdate = utils.bind(

    Flow.update,
    {
      store,
    },
  ); 

  emitter.removeAllListeners(

    [
      eventName,
    ],
  );
  
  emitter.on(

    eventName,
    onUpdate,
  );

  React.useEffect(

    onEffect,
    [],
  );

  return (

    <context.Provider
      value={{

        state,
        classes,
      }}
    >
      <units.App />
    </context.Provider>
  );
}

export default Root;
