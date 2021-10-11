import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { connect } from "react-redux";
import { loginotp } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Validate extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeOtp = this.onChangeOtp.bind(this);

    this.state = {
      email: "",
      otp: "",
      loading: false,
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
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
      dispatch(loginotp(this.state.email, this.state.otp))
        .then(() => {
          history.push("/submissions");
          window.location.reload();
        })
        .catch(() => {
          this.setState({
            loading: false
          });
        });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { isLoggedIn, message } = this.props;

    if (isLoggedIn) {
      return <Redirect to="/submissions" />;
    }

    return (
      <div class="list-row">
        <div class="row">
      <div className="col-md-4">
        <img src={process.env.PUBLIC_URL + "/images.jpg"} alt="images"/>
        </div> 
        <div className="col-md-4">    
      <div class="ui middle aligned center aligned grid" style={{width:450}}>
        <div class="column">
        <h2 class="ui blue image header">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            class="image"
          />
          <div class="content">
                Log-in to your account
            </div>
          </h2>
          <Form class="ui large form" 
            onSubmit={this.handleLogin}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div class="ui stacked segment">
            <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
              <input
                type="text"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                validations={[required]}
                placeholder="Nom d'utilisateur"
              />
              </div>
              </div>

            <div class="field">
             <div class="ui left icon input">
              <i class="user icon"></i>
              <input
                type="text"
                className="form-control"
                name="otp"
                value={this.state.otp}
                onChange={this.onChangeOtp}
                validations={[required]}
                placeholder="Otp"
              />
            </div>
            </div>
            <button
                className="ui fluid large blue submit button"
                disabled={this.state.loading}
              >
               {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
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
            </div>
          </Form>
          <div class="ui message">
        New to us? <a href={"/register"}>S'inscrire</a>
        </div>
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

export default connect(mapStateToProps)(Validate);