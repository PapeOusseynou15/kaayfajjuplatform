import React, { Component } from "react";
import { Form ,Button,Input} from "semantic-ui-react";
import CheckButton from "react-validation/build/button";
import { updatePassword } from "../actions/edituser";
import { connect } from "react-redux";

class User extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeOldPassword = this.onChangeOldPassword.bind(this);
    this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
    this.saveUser = this.saveUser.bind(this);

    this.state = {
      id:null,
      email: "",
      oldPassword: "",
      newPassword: "",
      successful: false,
    };
  }

 

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeOldPassword(e) {
    this.setState({
      oldPassword: e.target.value,
    });
  }
  onChangeNewPassword(e) {
    this.setState({
      newPassword: e.target.value,
    });
  }

  saveUser() {
    const { email, oldPassword,newPassword} = this.state;

    this.props
      .updatePassword(email, oldPassword,newPassword )
      .then((data) => {
        this.setState({
          id:data.id,
          email: data.email,
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        });
        // console.log(published);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  render() {
    const { message } = this.props;
return(
  <div>
  <div class="bgimg" style={{height:500}}>    
  <div class="ui middle aligned center aligned grid">
    <div class="containeu">
    <div class="column">
      <div class="col-md-12">
    <h2 class="ui blue image header">
      <img
        src="data:image/jpeg;base64,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"
        alt="profile-img"
        class="image"
      />
      <div class="content">
            Changez Mot de Passe
        </div>
      </h2>
      </div>
          <Form class="u large-form">
          <div class="ui stacked segment">
            <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
              <input
                style={{width:860}}
                type="text"
                className="form-control"
                id="email"
                placeholder="E-mail"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
              />
           </div>
           </div>
           <div class="field">
           <div class="ui left icon input">
            <i class="user icon"></i>
              <input
             style={{width:860}}
                type="text"
                className="form-control"
                id="oldPassword"
                placeholder="Ancien Mot de Passe"
                required
                value={this.state.oldPassword}
                onChange={this.onChangeOldPassword}
                name="oldPassword"
              />
            </div>
            </div>
            <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
              <input 
               style={{width:860}}
                type="text"
                placeholder="Nouveau Mot de Passe"
                className="form-control" 
                value={this.state.NewPassword} 
                onChange={this.onChangeNewPassword}
               />
            </div>
            </div>
          
            <div class="field">
              
              <Button disabled={!this.state.oldPassword && !this.state.newPassword  } onClick={this.saveUser} color="blue">
                Soumettre
              </Button>
              </div>
              </div>
            </Form>
            </div>
            </div>
           </div>
           </div>
           </div>
          
          
           
           
           
      
        
   
      
      
    );
  }
}


export default connect(null, { updatePassword })(User);