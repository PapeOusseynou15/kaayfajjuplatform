import React, { Component } from "react";
import { connect } from "react-redux";
// import { retrieveUser} from "../actions/edituser";
// import { BrowserRouter as Link } from "react-router-dom";
import { Card, CardContent,Button, Menu, Table } from "semantic-ui-react";
import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";
import { Redirect,Link } from 'react-router-dom';
import AuthService from "../services/auth.service";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveUtilisateur = this.setActiveUtilisateur.bind(this);

    this.state = {
      currentUtilisateur: null,
      currentIndex: -1,
      currentUser: AuthService.getCurrentUser()
    };
    
  }

  // componentDidMount() {
  //   this.props.retrieveUser();
  //   const user = this.props.user;

  //   if (user) {
  //     this.setState({
  //       currentUser: user,
  //     });
  //   }
  // }


  refreshData() {
    this.setState({
      currentUtilisateur: null,
      currentIndex: -1,
    });
  }
  logOut() {
    this.props.dispatch(logout());
  }

  setActiveUtilisateur(utilisateur, index) {
    this.setState({
      currentUtilisateur: utilisateur,
      currentIndex: index,
    });
  }


  render() {
    
    const { currentUtilisateur, currentIndex } = this.state;
    const { utilisateurs } = this.props;

    const { currentUser } = this.state;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    
    return (
      
        <div className="list row">
        <div className="col-md-12">
        </div>
        <div className="col-md-6">
          <h4>Liste des Utilisateurs</h4>

          <ul className="list-group">
            {utilisateurs &&
              utilisateurs.map((utilisateur, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUtilisateur(utilisateur, index)}
                  key={index}
                >
                  <strong>E-mail :</strong> {utilisateur.email}<br></br>
                  
                  {/* <strong>Mot de Passe :</strong> <br></br> */}
                  
                 
                </li>
              ))}
          </ul>

          {/* <Button
            color="red"
            onClick={this.removeAllSubmissions}
          >
            Tout Supprimer
          </Button> */}
        </div>
        <div className="col-md-6">
          {currentUtilisateur ? (
               <div>
               <h4>Utilisateurs</h4>
               <div>
                 <label>
                   <strong>E-mail:</strong>
                 </label>{" "}
                 {currentUtilisateur.email}
               </div>
               {/* <div>
                 <label>
                   <strong>Mot de Passe:</strong>
                 </label>{" "}
                 {currentUtilisateur.password}
                 
               </div> */}
          
 
               <Link
                 to={"/user/" + currentUtilisateur._id} 
                 className="badge badge-warning"
               >
                 Editer
               </Link>
             </div>
           ) : (
             <div>
               <br />
               <p>Veuillez cliquer sur un utilisateur...</p>
             </div>
           )}
         </div>
       </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    utilisateurs: state.utilisateurs,
    user,
  };
};


export default connect(mapStateToProps, { })(UserList);