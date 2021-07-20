import { Router, Switch, Route } from "react-router-dom";

import history from './utils/history';

import ToDoListAnt from './pages/ToDoListAnt';
import ToDoListBasic from './pages/ToDoListBasic';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={ToDoListAnt} />
        <Route exact path="/to-do-basic" component={ToDoListBasic} />
      </Switch>
    </Router>
  );
}

export default App;
