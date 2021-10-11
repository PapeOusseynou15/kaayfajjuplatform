import React, { Component } from "react";


import { connect } from "react-redux";

class ValidatePayment extends Component {
  constructor(props) {
    super(props);
  }
    
  render() {
   
    return (
      <h1>Votre Demande à été payé avec succés</h1>
    );
  }
}


export default ValidatePayment;