
const initialState = {

  number: 0,
  effected: false,
};

const reaction = {

  incrementNumber: ({state}) => (
    {
      number: state.number + 1,
    }
  ),
};

const effect = ({store}) => {

  const {

    state,
    setState,

  } = store;

  const newState = {

    ...state,
    effected: true,
  };

  setState(
    
    newState,
  );
};

const update = ({store}, event) => {

  const {

    state,
    setState,
    reaction,

  } = store;

  const {

    custom: {

      id,
    },

  } = event;

  if (typeof reaction[id] !== 'function') {

    return;
  }

  const newState = {

    ...state,
    ...reaction[id](

      {
        state,
      },
    ),
  };

  setState(

    newState,
  );
};

export default {

  initialState,
  reaction,
  effect,
  update,
};
