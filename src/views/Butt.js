
function Butt(props) {

  const {

    React,
    onClick,
    number,
    classes,

  } = props;

  return (

    <button
      onClick={onClick}
      className={classes.butt}
    >
      {number}
    </button>
  );
}

Butt.emits = [
  {
    id: 'incrementNumber',
    key: 'onClick',
  },
];

Butt.flows = [
  {
    get: state => state.number,
    key: 'number',
  },
];

export default Butt;
