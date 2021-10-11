import { Component } from "react";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form ,Button,Input, Card} from "semantic-ui-react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'



function Accueil () {
	const [emails,setEmails] = useState();
	const [emailMatch,setEmailMatch] = useState([]);
	const [value, setValue] = useState()
    
	useEffect(() => {
		const loadEmails = async () => {
			// `${process.env.REACT_APP_BASE_URL}/submissions`
			const response =await axios.get("https://dev.service-backend.kalpayinc.com/businessvalidation-service/submissions");
			setEmails(response.data);
		};
		loadEmails();

	}, []);
	console.log(emails);
	
    
	const searchEmails = (text) => {
		
		if(!text){
			setEmailMatch([]);
		}
		else{
			console.log(text);
		let matches = emails.filter((email) => {
             const regex = new RegExp(`${text}`, "gi");
			 
			 return email.email.match(regex) ;
		});
		setEmailMatch(matches);
		
		  
	}
	};
	return(
		
		
		<div className="App">
        <div class="bgimg" style={{height:500}}></div>
			<div class="list-row">
			<div class="row">
		    <div className="col-md-4">
        
        </div>
		<div className="col-md-8">
        {/* <h2>Rechercher une Soumission</h2>
			<Input 
			 style={{width:"60%", marginTop: "10px"}}
			 placeholder="Veuillez entrez votre email"
			 onChange={(e) => searchEmails(e.target.value)}
			 />

			 {emailMatch && emailMatch.map((item,index) =>(
             <div key={index} style={{ marginTop :"5px"}}>
					 <Card  title={`Email: ${item.email}`} >
						 
						<a href={`/submissions/${item.id}`}>{item.email}</a>
					 </Card>
				 </div>
			 ))}
			 </div> */}
			 </div>
			 </div>
			 </div>
			 </div>
		
	) ;
	

}



export default Accueil;