import { Route, Switch } from "react-router-dom";

import {
  Register,
  Login,
  Dashboard,
  PrivateRoute,
  CreateProfile,
  EditProfile,
  AddExperience,
  AddEducation,
  Profiles,
  Profile,
  NotFound,
  Posts,
  Post,
} from "../components";

const Routes = () => {
  return (
    <div className="container">
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/profiles" component={Profiles} />
      <Route exact path="/profile/:handle" component={Profile} />
      <Switch>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
      <Switch>
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
      </Switch>
      <Switch>
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
      </Switch>
      <Switch>
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
      </Switch>
      <Switch>
        <PrivateRoute exact path="/add-education" component={AddEducation} />
      </Switch>
      <Switch>
        <PrivateRoute exact path="/feed" component={Posts} />
      </Switch>
      <Switch>
        <PrivateRoute exact path="/post/:id" component={Post} />
      </Switch>
      <Route exact path="/not-found" component={NotFound} />
    </div>
  );
};

export default Routes;
