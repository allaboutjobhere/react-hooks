
function Wrap(

  {engine, View, handlers}, props,

) {

  const {

    React,
    units,
    context,
    utils,

  } = engine;

  const {

    flows = [],

  } = View;

  const contextValue = React.useContext(

    context,
  );

  const reducedFlows = flows.reduce(

    utils.bind(

      utils.reduceFlowsToArr,
      contextValue.state,
    ),
    [],
  );

  const reducedProps = Object.keys(

    props,

  ).reduce(

    utils.bind(

      utils.reducePropsToArr,
      props,
    ),
    [],
  );

  const memoizedProps = reducedProps.concat(

    reducedFlows,
  );

  const totalViewProps = {
    
    classes: contextValue.classes,

    ...units,
    ...handlers,

    ...flows.reduce(

      utils.bind(

        utils.reduceFlowsToObj,
        contextValue.state,
      ),
      {},
    ),

    ...props,

    React,
  };

  const renderView = utils.bind(

    utils.render,
    {
      View,
      React,
      props: totalViewProps,
    },
  );

  return React.useMemo(
    
    renderView,
    memoizedProps,
  );
}

export default Wrap;
