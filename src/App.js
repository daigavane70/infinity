import "./App.css";
import { Switch, Route, NavLink, Redirect, useHistory } from "react-router-dom";
import User from "./pages/user/user";
import Admin from "./pages/admin/adminPortal";
import AdminLogin from "./pages/admin/adminLogin";
import SignInForm from "./pages/user/userLogin";
import OptionForm from "./pages/user/optionForm";
import { connect } from "react-redux";

function App(props) {
  const history = useHistory();
  return (
    <div className="App">
      <Switch>
        <Route exact path="/admin/login" component={AdminLogin}></Route>
        <Route exact path="/admin/:id">
          {!props.admin.loggedIn ? <Redirect to="/admin/login" /> : <Admin />}
        </Route>
        <Route exact path="/user" component={SignInForm}></Route>
        <Route exact path="/user/:id">
          {props.user.loggedIn ? <User /> : <Redirect to="/user" />}
        </Route>
        <Route exact path="/user/:id/select">
          {props.user.loggedIn ? <OptionForm /> : <Redirect to="/user" />}
        </Route>

        <Route>
          <div className="home">
            <h1>Beyond Infinity</h1>
            <div>
              <button>
                <NavLink to="/admin/login">Admin</NavLink>
              </button>
              <button>
                <NavLink to="/user">User</NavLink>
              </button>
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(App);
