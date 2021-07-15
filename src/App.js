import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import "./App.css";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PublicRoute exact path="/register" component={Auth} />
          <PublicRoute exact path="/login" component={Auth} />
          <PrivateRoute exact path="/" component={Dashboard} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
