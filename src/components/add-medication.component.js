import React, { Component } from "react";
import { connect } from "react-redux";
import { Form ,Button,Input} from "semantic-ui-react";
import { createMedication } from "../actions/medications";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import '../App.css'

import { uploadFile } from 'react-s3';
 
const config = {
    bucketName: 'kalpay-userdocuments',
    region: 'us-east-2',
    accessKeyId: 'AKIAQ7YRTJKBJ6X67ZN3',
    secretAccessKey: '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',
    // const S3_BUCKET='kalpay-userdocuments';
    // const AWS_ACCESS_KEY_ID='AKIAQ7YRTJKBJ6X67ZN3';
    // const AWS_SECRET_ACCESS_KEY= '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'
    // const AWS_REGION = 'us-east-2'
}

class AddMedication extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.saveMedication = this.saveMedication.bind(this);
    this.newMedication = this.newMedication.bind(this);
    

    this.state = {
      id: null,
      name: "",
      price: "",
      quantity:"",
      submitted: false,
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
  }
  onChangeQuantity(e) {
    this.setState({
      quantity: e.target.value,
    });
  }

  saveMedication() {
    const { name, price,quantity} = this.state;

    this.props
      .createMedication(name, price,quantity)
      .then((data) => {
        this.setState({
          id: data.id,
          name: data.name,
          price: data.price,
          quantity: data.quantity,

          submitted: true,
        });
        // console.log(published);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newMedication() {
    this.setState({
        id: null,
        name: "",
        price: "",
        quantity: "",
        submitted: false,
    });
  }
  newPayment() {
    this.setState({
        id: null,
        amount: "",
        currency: "",
        type: "",
        comment: "",
        issuerPhoneNumber: "",
        operator: "",
      
        submitted: false,
    });
  }

  
  

  render() {
    return (
      
      
        <div >
        {this.state.submitted ? (
          <div class="bgimg" style={{height:900}}>
          <div class="ui form ui middle aligned center aligned grid" 
          >   
          <div class="containe">
          <div class="column">
          <div class="equal width fields">
            <div class="field">
            <h4>Le médicament a été enregistré avec succés!</h4>
            <div class="ui buttons">
            {/* <a href="/payment">
            <Button color="blue">
              Payer la demande 
            </Button>
            </a> */}
            {/* <a href="/payment">
            <button class="ui positive button">
              Payer la demande  
            </button>
            </a> */}
            </div>
          </div>
            </div>
            </div>
            </div>
            </div>
            </div>
        ) : (
          <div>
         <div class="bgimg" style={{height:700}}>
        
          <div class="ui form ui middle aligned center aligned grid" 
          >   
          <div class="containe">
          <div class="column">
          <div class="equal width fields">
            <div class="field">
              <label>Nom</label>
              <Input
                style={{height: 50
                }}
                type="text"
                className="form-control"
                id="nom"
                placeholder="Entrez votre Nom"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="nom"
              />
           </div>
           <div class="field">
           <label>Prix</label>
              <Input
              style={{height: 50
              }}
               
                type="text"
                className="form-control"
                id="prenom"
                placeholder="Entrez le prix"
                required
                value={this.state.price}
                onChange={this.onChangePrice}
                name="prenom"
              />
            </div>
            <div class="field">
           <label>Quantité</label>
              <Input
              style={{height: 50
              }}
               
                type="text"
                className="form-control"
                id="prenom"
                placeholder="Entrez le prix"
                required
                value={this.state.quantity}
                onChange={this.onChangeQuantity}
                name="prenom"
              />
            </div>
         <div class="field">
              <Button style={{height: 50
                 }} disabled={!this.state.price && !this.state.quantity  } onClick={this.saveMedication} color="blue">
                Ajouter le médicament
              </Button>
            
              </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
          
           
           
           
        )}
        
      </div> 
      
      
    );
  }
}

export default connect(null, { createMedication })(AddMedication);