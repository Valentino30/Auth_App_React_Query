import { Switch, Redirect } from "react-router-dom";

import "./App.css";
import Auth from "./containers/Auth";
import Dashboard from "./containers/Dashboard";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Switch>
        <PublicRoute exact path="/register" component={Auth} />
        <PublicRoute exact path="/login" component={Auth} />
        <PrivateRoute exact path="/" component={Dashboard} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
