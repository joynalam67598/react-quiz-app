import "../styles/App.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from './pages/Result';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
	return (
		<Router>
			<Layout>
				<Switch>
					<Route exact path={"/"} component={Home} />
					<Route exact path={"/signup"} component={Signup} />
					<Route exact path={"/login"} component={Login}/>
					<Route exact path={"/quiz"} component={Quiz}/>
					<Route exact path={"/result"} component={Result}/>
					<Route component={Error}/>
				</Switch>
			</Layout>
		</Router>
	);
}

export default App;
