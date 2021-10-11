import React, { Component } from 'react';
import { getUser } from '../services/userService';
import { updateUser } from '../services/userService';
import AuthService from "../services/auth.service";
class UserPage extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.state = {
      user: "",
      id:"",
      password:"",
      
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    getUser(id).then(user => this.setState({
      user: user
    }));
    // updateUser(id) 
    //   AuthService.updateUser(id)
    //     .then((response) => {
    //       this.setState({
    //         currentUtilisateur: response.data,
    //       });
    //       console.log(response.data);
    //       // window.location.reload();
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    
    
   
  }
  onChangeEmail(e) {
    const email = e.target.value;

    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        email: email,
      },
    }));
  }
  onChangePassword(e) {
    const password = e.target.value;

    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        password: password,
      },
    }));
  }
  
  updateUser(id) {
    this.props.updateUser(id)
      .then((response) => {
        
        console.log(response.data);
        this.setState((prevState) => ({
          user: {
            ...prevState.user,
            
            
          }
          
        }));
        // window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  }
  

 

  render = () => {
    const id = this.state.id;
   
    return this.state.user && (
      <div className="row">
        <div class="container">
        <div className="col-md-4">
          </div>
        <div className="col-md-4">
       <label htmlFor="title">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  id="nom"
                  value={this.state.user.email}
                  onChange={this.onChangeEmail}
                />
                 <input
                  type="text"
                  className="form-control"
                  id="nom"
                  value={this.state.user.password}
                  onChange={this.onChangePassword}
                />
                <button
                type="submit"
                className="badge badge-success"
                onClick={() =>this.updateUser(this.state.user._id)}
              >
                Modifier
              </button>
                 <a href="/">Retour à la liste</a>
              </div>
      </div>
      </div>
    )
  }
}

export default UserPage;
