import React, { Component } from "react";
import Axios from "axios";
import User from "../components/user";
import { getUsers } from "../services/userService";
//...

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  componentDidMount = () => {
    getUsers().then(users => {
      this.setState({
        users: users
        
      });
    });
  };

  render = () => {
    return this.state.users.map(user => <User data={user} key={user.id} />);
  };
}

export default UsersList;
