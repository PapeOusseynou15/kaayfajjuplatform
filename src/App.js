import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddMedication from "./components/add-medication.component";
import Submission from "./components/submission.component";
import CheckStatus from "./components/checkstatus.component";
import SubmissionsList from "./components/submissions-list.component";
import UsersList from "./components/userlist.component";
import UserList from "./components/users-list.component";
import User from "./components/user";
import Accueil from "./components/accueil.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Validate from "./components/validate.component";
import Payment from "./components/payment.component";
import ChangePassword from "./components/changepassword";
import ResetPassword from "./components/resetpassword";
import ValidatePayment from "./components/validatepayment.component";
import Hystory from "./components/hystory.component";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { connect } from "react-redux";
import { history } from './helpers/history';
import ProtectedRoute from './components/ProtectedRoute';
import PrivateRoute from './components/PrivateRoute';
import AuthService from "./services/auth.service";
import Users from "./components/users";
import UserPage from "./components/userPage";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';




class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: AuthService.getCurrentUser()
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }
  
  render() {
    const { currentUser } = this.state;
    console.log("console",currentUser);

    return (
      <Router history={history}>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">KAAY FAJU</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Accueil</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/accueil">Pharmacies</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/medication">Ajouter Médicaments</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Consultations</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Services Patients</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Radiologie</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pathologies</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Messagerie
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
      <div className="container mt-3">
          <Switch>
            <Route exact path={["/","/accueil"]}  component={Accueil} />
            <ProtectedRoute exact path="/submissions" component={SubmissionsList} />
            <Route exact path="/medication" component={AddMedication} />
            <PrivateRoute exact path="/submissions/:id" component={Submission} />
            <Route path="/userslist" component={UsersList} />
            <Route path="/user" component={User} />
            {/* <Route path="/user" component={User} /> */}
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/validate" component={Validate} />
            <Route path="/hystory" component={Hystory} />
            <Route path="/payment" component={Payment} />
            <Route path="/changepassword" component={ChangePassword} />
            <Route path="/resetpassword/:id" component={ResetPassword} />
            <Route path="/status" component={CheckStatus} />
            <Route path="/validatepayment" component={ValidatePayment} />
            {/* <Route path="/userlist/:id" component={UserPage} /> */}
            <Route path="/user/:email" component={User} />
                <Route path="/user" component={Users} />
            </Switch>
        </div>
        <div>
      
  </div>
  
            
        
      </Router>
      
    );
  }
}
function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}
export default connect(mapStateToProps)(App);