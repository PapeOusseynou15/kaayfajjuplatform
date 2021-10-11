import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { connect } from "react-redux";
import { AddPayment } from "../actions/payment";
import { AddOtp } from "../actions/payment";
import { GetAccess } from "../actions/payment";
import AuthService from "../services/auth.service";
import PaymentService from "../services/payment.service";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import axios from "axios";
import '../App.css'

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Payment extends Component {
  constructor(props) {
    super(props);
    this.handleAddPayment = this.handleAddPayment.bind(this);
    this.handleAddOtp = this.handleAddOtp.bind(this);
    this.handleGetAccess = this.handleGetAccess.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeCurrency = this.onChangeCurrency.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeComment = this.onChangeComment.bind(this);
    this.onChangeOtp = this.onChangeOtp.bind(this);
    this.onChangeissuerPhoneNumber = this.onChangeissuerPhoneNumber.bind(this);
    this.onChangeOperator = this.onChangeOperator.bind(this);
    
    this.state = {
      amount: '',
      currency: "",
      type: "",
      comment: "",
      otp:"",
      issuerPhoneNumber:"",
      operator: "",
      loading: false,
      validateform:false,
      secretKey:"",
      accessKey:"",
      message: "",
      currentUser: AuthService.getCurrentUser(),
      currentPayment: PaymentService.GetAccess(),
      submitted:false

     
    };
  }

  onChangeAmount(e) {
    this.setState({
      amount: (Number(e.target.value)),
    });
  }

  onChangeCurrency(e) {
    this.setState({
      currency: e.target.value,
    });
  }
  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
  }
  onChangeComment(e) {
    this.setState({
      comment: e.target.value,
    });
  }
  onChangeOtp(e) {
    this.setState({
      otp: e.target.value,
    });
  }

  onChangeissuerPhoneNumber(e) {
    this.setState({
      issuerPhoneNumber: e.target.value,
    });
  }
  onChangeOperator(e) {
    this.setState({
      operator: e.target.value,
    });
  }
  
  handleAddOtp(e) {

    e.preventDefault();
    
    this.setState({
      loading: true,
    });
    
    this.form.validateAll();
    

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(AddOtp(this.state.otp, this.state.comment))
        .then(() => {
          history.push("/validatepayment");
           window.location.reload();
           
          
          

        })
        .catch(() => {
          this.setState({
            loading: false,
          });
        });
    }
     else {
      this.setState({
        loading: false,

      });
      
    }
  }
  handleAddPayment(e) {
    e.preventDefault();
    
    const payment = JSON.parse(localStorage.getItem("payment"));

    console.log(payment);

    axios.defaults.headers.common = {'Authorization': `Bearer ${payment.access_token}`}
    

    this.form.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(AddPayment(this.state.amount=1000,this.state.currency="xof",this.state.type="Payment",this.state.comment="Comment",this.state.issuerPhoneNumber,this.state.operator))
        .then(() => {
         
          this.setState({
            validateform: true,
          });
        
          this.setState({
            loading: false,
    
          });
          
          

        })
        .catch(() => {
          this.setState({
            loading: false,
          });
        });
    }
     else {
      this.setState({
        loading: false,

      });
      
    }
  }
  handleGetAccess(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.form.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(GetAccess(this.state.secretKey,this.state.accessKey))
        .then(() => {
         
          this.setState({
            validateform: true,
          });
        
          this.setState({
            loading: false,
    
          });
          
          

        })
        .catch(() => {
          this.setState({
            loading: false,
          });
        });
    }
     else {
      this.setState({
        loading: false,

      });
      
    }
  }
  

  render() {
    const { currentUser } = this.state;
    const { isLoggedIn, message } = this.props;
    // if (!currentUser) {
    //   return <Redirect to="/login" />;
    // }
    
   
    

    return (
      <div  >
        
          
         <div class="bgimg" style={{height:500}}> 
      <div class="ui middle aligned center aligned grid" >
      <div class="containeur">
        <div class="column">
          <div class="col-md-12">
        <h2 class="ui blue image header">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5y362cjjDP8bwYuGOz1GxPdhVob7vNoUC4A&usqp=CAU"
            alt="profile-img"
            class="image"
          />
          <div class="content">
                Payement Demande
            </div>
          </h2>
          </div>
          {this.state.validateform &&
          <Form class="ui large form" 
          onSubmit={this.handleAddOtp}
          ref={(c) => {
            this.form = c;
          }}
        > 
         
          <div class="ui stacked segment">
            <div class="field">
              <input
                style={{width:450}}
                type="text"
                className="form-control"
                name="otp"
                value={this.state.otp}
                onChange={this.onChangeOtp}
                validations={[required]}
                placeholder="Code de Validation"
              />
              </div>
            {/* <div class="field">
              <input
                type="test"
                className="form-control"
                name="comment"
                value={this.state.comment}
                onChange={this.onChangeComment}
                validations={[required]}
                placeholder="Commentaire"
              />
            </div> */}
            </div>
          <button
              className="ui fluid large blue submit button"
              disabled={this.state.loading}
            >
             {this.state.loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Payer</span>
            </button>  
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton
            style={{ display: "none" }}
            ref={(c) => {
              this.checkBtn = c;
            }}
          />
         
        </Form>
            }

            {!this.state.validateform &&
          <Form class="ui large form" 
          onSubmit={this.handleGetAccess}
          onSubmit={this.handleAddPayment}
          ref={(c) => {
            this.form = c;
          }}
        >
          <div class="ui stacked segment">
            {/* <div class="field">
              <label>Montant</label>
              <input
                
                type="number"
                className="form-control"
                name="amount"
                value={this.state.amount}
                onChange={this.onChangeAmount}
                validations={[required]}
                placeholder="Montant"
              />
              </div> */}
            {/* <div class="field">
              <input
                type="text"
                className="form-control"
                name="currency"
                value="xof"
                onChange={this.onChangeCurrency}
                validations={[required]}
                placeholder="Devise"
              />
            </div> */}
            {/* </div>
            <div class="ui stacked segment"> */}
            {/* <div class="field">
              <input
                type="text"
                className="form-control"
                name="Type"
                value="Payment"
                onChange={this.onChangeType}
                validations={[required]}
                placeholder="Type"
              />
              </div> */}
            {/* <div class="field">
              <input
                type="text"
                className="form-control"
                name="comment"
                value="Comment"
                onChange={this.onChangeComment}
                validations={[required]}
                placeholder="Comment"
              />
            </div> */}
         
            
            <div class="field">
              <label>Numéro Téléphone</label>
              <PhoneInput
                defaultCountry="SN"
                type="text"
                className="form-control"
                name="issuerPhoneNumber"
                value={this.state.issuerPhoneNumber}
                onChange={ issuerPhoneNumber => this.setState({ issuerPhoneNumber}) }
                validations={[required]}
                placeholder="+221"
              />
              </div>
            <div class="field">
              <select
              style={{width:450}}
                type="text"
                className="form-control"
                name="operator"
                value={this.state.operator}
                onChange={this.onChangeOperator}
                validations={[required]}
                placeholder="Opérateur"
              >
                
                <option value="" default disabled selected="">Opérateur</option>
                <option >Kalpay</option>
                <option>OrangeMoney</option>
                <option>FreeMoney</option>
                <option>Wizall</option>
                <option>EMoney</option>
                <option>Yup</option>
                <option>MasterCard</option>

                </select>
            </div>
            </div>
            
          <button
              className="ui fluid large blue submit button"
              disabled={this.state.loading}
            >
             {this.state.loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Payer</span>
            </button>  
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton
            style={{ display: "none" }}
            ref={(c) => {
              this.checkBtn = c;
            }}
          />
         
        </Form>
            }

  
          {/* <div class="ui message">
        New to us? <a href={"/register"}>S'inscrire</a>
        </div> */}
        </div>
      </div>
      </div>
      </div> 
      </div>
     
     
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(Payment);