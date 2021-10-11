import React, { Component } from "react";
import { connect } from "react-redux";
import { Form ,Button,Input} from "semantic-ui-react";
import SubmissionDataService from "../services/medication.service";
import '../App.css'




class CheckStatus extends Component {
  constructor(props) {
    super(props);
   
    this.onChangeEmail = this.onChangeEmail.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      id: null,
      email: "",
      submitted:false
    };
  }

 
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
      
    });
  }
  
//   componentDidMount() {
//     this.getSubmission(this.props.match.params.email);
//   }
// handleSubmit(event) {
//     event.preventDefault();
//     const data = new FormData(event.target);
//     fetch(`/localhost:4000/submissions/email/${data.email}`, {
//       method: 'POST',
      
//     });
//   }
  getSubmission(email) {
    SubmissionDataService.getByEmail(email)
      .then((response) => {
        this.setState({
          currentSubmission: response.data,
          submitted: true,
        });
        console.log(response.data);
        // window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  }
render() {
    const email = this.state.email;
    return (
      
      
        <div  >
        
          
         <div class="bgimg" style={{height:500}}>
         <div class="ui middle aligned center aligned grid" >
        <div class="column">
       
       
        {this.state.submitted &&(
  
          <div class="ui form ui middle aligned center aligned grid" style={{width:450}}>
          <div class="column">
          <div  class="ui stacked segment">
          <div class=" field">
              <h1>Le statut de votre soumission vous à été envoyé par mail,veuillez vérifier svp...</h1>
            
            </div>
            </div>
            </div>
            </div>
            
             )}
        {!this.state.submitted &&(
          
          <div class="ui form ui middle aligned center aligned grid">
           <div class="containe"> 
          <h1>Statut Demande NINEA</h1>
          <div class="equal width fields">
          <div class=" field">
            
                <Input
                style={{height: 50
                }}
                type="text"
                className="form-control"
                id="email"
                placeholder="Entrez votre email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
                
              />
            
            </div>
            
            <div class="field">
            <Button onClick={() =>this.getSubmission(email)} color="blue" >
              
             Rechercher
            </Button>
            </div>
            </div>
            </div>
            </div>
           
            
            
             )}
             </div>
             </div>
             </div>
             </div>
            
             
       
        
     
     
      
      
    );
  }
}

export default connect(null)(CheckStatus);