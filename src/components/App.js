import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import "../styles/App.css";
import Layout from "./Layout";
import AddQuiz from "./pages/AddQuiz";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ManageVideos from "./pages/ManageVideos";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Signup from "./pages/Signup";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Switch>
            <Route exact path={"/"} component={Home} />
            <PublicRoute exact path={"/signup"} component={Signup} />
            <PublicRoute exact path={"/login"} component={Login} />
            <PrivateRoute
              exact
              path={"/manageVideos"}
              component={ManageVideos}
            />
            <PrivateRoute exact path={"/addQuiz"} component={AddQuiz} />
            <PrivateRoute exact path={"/quiz/:id"} component={Quiz} />
            <PrivateRoute exact path={"/result/:id"} component={Result} />
            <Route component={Error} />
          </Switch>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
