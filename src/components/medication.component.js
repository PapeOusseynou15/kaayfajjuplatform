import React, { Component } from "react";
import { connect } from "react-redux";
import { CardHeader } from "semantic-ui-react";
import { updateMedication, deleteMedication } from "../actions/medications";
import MedicationDataService from "../services/medication.service";

class Medication extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeNom.bind(this);
    this.onChangePrice = this.onChangePrenom.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.getMedication = this.getMedication.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.activatedDemande = this.activatedDemande.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeMedication = this.removeMedication.bind(this);

    this.state = {
      currentSubmission: {
        id: null,
        name: "",
        price: "",
        quantity: "",
        
        published: "",
        activated: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getMedication(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentSubmission: {
          ...prevState.currentMedication,
          name: name,
        },
      };
    });
  }

  onChangePrice(e) {
    const price = e.target.value;

    this.setState((prevState) => ({
      currentPrice: {
        ...prevState.currentPrice,
        price: price,
      },
    }));
  }
  onChangeQuantity(e) {
    const quantity = e.target.value;

    this.setState((prevState) => ({
      currentQuantity: {
        ...prevState.currentQuantity,
        quantity: quantity,
      },
    }));
  }
  
  getMedication(id) {
    MedicationDataService.get(id)
      .then((response) => {
        this.setState({
          currentMedication: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      id: this.state.currentMedication.id,
      name: this.state.currentMedication.name,
      price: this.state.currentv.price,
      quantity: this.state.currentMedication.quantity,
      published: status,
    };
    //alert(status);
    this.props
      .updateMedication(this.state.currentMedication.id, data)
      .then((reponse) => {
        console.log(reponse);

        this.setState((prevState) => ({
          currentMedication: {
            ...prevState.currentMedication,
            published: status,
            
          }
          
        }));
        

        this.setState({ message: "Le statut a été mis à jour avec succès!" });
       
      })
      .catch((e) => {
        console.log(e);
      });
  }

  
  updateContent() {
    this.props
      .updateMedication(this.state.currentMedication.id, this.state.currentMedicationn)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "Le statut a été mis à jour avec succès" });
        
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeMedication() {
    this.props
      .deleteMedication(this.state.currentMedication.id)
      .then(() => {
        this.props.history.push("/medications");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentMedication } = this.state;


    return (
        <div>
        {currentMedication ? (
          <div className="edit-form">
            <h4>Soumission</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  id="nom"
                  value={currentMedication.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Prix</label>
                <input
                  type="text"
                  className="form-control"
                  id="prenom"
                  value={currentMedication.price}
                  onChange={this.onChangePrice}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Quantité</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  value={currentMedication.quantity}
                  onChange={this.onChangeQuantity}
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentMedication.published ==="Validé" && "Validé"   }
                {currentMedication.published ==="Rejeté" && "Rejeté"   }
                {currentMedication.published==="En Cours"  && "En Cours"   }
                
              </div>
              <div className="form-group">
                <label>
                  <strong>Action : </strong>
                </label>
                {currentMedication.activated ==="Activé" && "Activé"   }
                {currentMedication.activated ==="Désactivé" && "Désactivé"   }
              
                
              </div>
            </form>

            {/* {currentSubmission.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus("REJECTED")}
              >
                Rejeter
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus("VALIDATED")}
              >
                Valider
              </button> */}
             {currentMedication.published && (
                <button
                  className="badge badge-success mr-2"
                  onClick={() => this.updateStatus("Validé")}
                >
                  Valider
                </button>
            )}
            {currentMedication.published && (
                <button
                  className="badge badge-danger mr-2"
                  onClick={() => this.updateStatus("Rejeté")}
                >
                  Rejeter
                </button>
            )}
             {currentMedication.published && (
                <button
                  className="badge badge-primary mr-2"
                  onClick={() => this.updateStatus("En Cours")}
                >
                  En attente
                </button>
            )}
            {/* {currentSubmission.publish ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatut(false)}
              >
                Annuler
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatut(true)}
              >
                Rejeter
              </button>
            )} */}

            <button
              className="badge badge-warning mr-2"
              onClick={this.removeMedication}
            >
              Archiver
            </button>
            {currentMedication.activated && (
                <button
                  className="badge badge-success mr-2"
                  onClick={() => this.activatedDemande("Activé")}
                >
                  Activer
                </button>
            )}
            {currentMedication.activated && (
                <button
                  className="badge badge-danger mr-2"
                  onClick={() => this.activatedDemande("Désactivé")}
                >
                  Désactiver
                </button>
            )}
            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateContent}
            >
              Modifier
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Veuillez cliquer sur une demande...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateMedication, deleteMedication })(Medication);