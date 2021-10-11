import React, { Component } from "react";
import { connect } from "react-redux";
import { retrieveMedications,deleteAllMedications } from "../actions/medications";
// import { BrowserRouter as Link } from "react-router-dom";
import { Card, CardContent,Button, Menu, Table } from "semantic-ui-react";
import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";
import { Redirect,Link } from 'react-router-dom';
import AuthService from "../services/auth.service";
import Accueil from "./accueil.component";

class MedicationsList extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.onChangeSearchEmail = this.onChangeSearchEmail.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveMedication = this.setActiveMedication.bind(this);
    this.removeAllMedications = this.removeAllMedications.bind(this);

    this.state = {
      currentMedication: null,
      currentIndex: -1,
      searchEmail: "",
      currentUser: AuthService.getCurrentUser()
    };
    
  }

  componentDidMount() {
    this.props.retrieveMedications();
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  onChangeSearchEmail(e) {
    const searchEmail = e.target.value;

    this.setState({
      searchEmail: searchEmail,
    });
  }

  refreshData() {
    this.setState({
      currentMedication: null,
      currentIndex: -1,
    });
  }
  logOut() {
    this.props.dispatch(logout());
  }

  setActiveMedication(medication, index) {
    this.setState({
      currentMedication: medication,
      currentIndex: index,
    });
  }

  removeAllMedications() {
    this.props
      .deleteAllMedications()
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }
  render() {
    
    const { currentMedication, currentIndex } = this.state;
    const { medications } = this.props;

    const { currentUser } = this.state;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    
    return (
      
        <div className="list row">
        <div className="col-md-12">
          
            
          <Accueil/>
          
        </div>
        
        <div className="col-md-6">
          <h4>Liste des Demandes</h4>

          <ul className="list-group">
            {medications &&
              medications.map((medication, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveMedication(medication, index)}
                  key={index}
                >
                  <strong>E-mail :</strong> {medication.email}<br></br>
                  
                  <strong>Prénom :</strong> {medication.prenom}<br></br>
                  
                  
                  <strong>Nom :</strong> {medication.nom}<br></br>
                  <strong>Numéro Téléphone :</strong> {medication.telephone}<br></br>
                 
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
          {currentMedication ? (
               <div>
               <h4>Demande</h4>
               <div>
                 <label>
                   <strong>Nom:</strong>
                 </label>{" "}
                 {currentMedication.nom}
               </div>
               <div>
                 <label>
                   <strong>Prénom:</strong>
                 </label>{" "}
                 {currentMedication.prenom}
               </div>
               {/* <div>
                 <label>
                   <strong>Carte d'identité:</strong>
                 </label>{" "}
                 {currentSubmission.cni}
               </div> */}
               
               
               <div>
                 <label>
                   <strong>Status:</strong>
                 </label>{" "}
                 {currentMedication.published ==="Validé" && "Validé"   }
                  {currentMedication.published ==="Rejeté" && "Rejeté"   }
                  {currentMedication.published==="En Cours"  && "En Cours"   }
               </div>
              
 
               <Link
                 to={"/submissions/" + currentMedication.id} 
                 className="badge badge-warning"
               >
                 Editer
               </Link>
             </div>
           ) : (
             <div>
               <br />
               <p>Veuillez cliquer sur une demande...</p>
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
    medications: state.medications,
    user,
  };
};


export default connect(mapStateToProps, { retrieveMedications, deleteAllMedications })(MedicationsList);