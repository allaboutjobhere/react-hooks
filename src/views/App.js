
function App(props) {

  const {

    React,
    Home,
    NotFound,
    Router,
    Switch,
    Route,
    classes,

  } = props;
  
  return (

    <div
      className={classes.app}
    >
      <Router>
        <Switch>
          <Route
            exact
            path='/'
          >
            <Home />
          </Route>
          <Route
            path='*'
          >
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
