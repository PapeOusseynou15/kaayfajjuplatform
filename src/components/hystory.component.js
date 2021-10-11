import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { connect } from "react-redux";
import { login } from "../actions/auth";
import { loginotp } from "../actions/auth";
import '../App.css'


class Hystory extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLoginOtp = this.handleLoginOtp.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeOtp = this.onChangeOtp.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: "",
      password: "",
      otp: "",
      loading: false,
      validateform:false,
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onChangeOtp(e) {
    this.setState({
      otp: e.target.value,
    });
  }


  handleLogin(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.form.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(login(this.state.email, this.state.password))
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
  handleLoginOtp(e) {
    
    e.preventDefault();
    
    this.setState({
      loading: true,
    });
    
    this.form.validateAll();
    

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(loginotp(this.state.email, this.state.otp))
        .then(() => {
         
           history.push("/submissions");
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

  render() {
    const { isLoggedIn, message } = this.props;
    const { user: currentUser } = this.props;
    

    return (
      <div>
        <div class="bgimg" style={{height:500}}>    
      
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

export default connect(mapStateToProps)(Hystory);