
import axios from "axios";

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGFlNTVkZmQ0MzAwYzAwMWFlZGEzMWEiLCJmdWxsbmFtZSI6Ik1JTklTVEVSRSBOSU5FQSIsInBob25lTnVtYmVyIjoiKzIyMTc3ODkwODk4OSIsImlzQXBwcm92ZWQiOnRydWUsImlzTG9ja2VkIjpmYWxzZSwiaXNWZXJpZmllZCI6ZmFsc2UsInJlZmVycmFsQ29kZSI6IjAwU1YiLCJyZWZlcnJlZEJ5IjoiIiwic2x1ZyI6Im1pbmlzdGVyZS1uaW5lYSIsInVzZXJuYW1lIjoicGFwZW91c3NleW5vdS5kaW9wIiwiZW1haWwiOiJwYXBlb3Vzc2V5bm91LmRpb3BAa2FscGF5aW5jLmNvbSIsInJvbGUiOiJCVVNJTkVTUyIsImFjY291bnQiOiI2MGFlNTVkZjQzMmRjYjAwMWJmMmFhMGMiLCJzaG9wIjpudWxsLCJzaG9wT3duZXIiOm51bGwsInNob3BJZCI6bnVsbCwiY2FzaFJlZ2lzdGVycyI6W10sImNhbGxiYWNrVXJsIjoiIiwiaWF0IjoxNjIyMjkwNTY5LCJleHAiOjE2MjIzNzY5NjksImF1ZCI6ImthbHBheS5jb20iLCJpc3MiOiJrYWxwYXkuY29tIn0.srhlk1fo33T0qEHIk8jitwEspqdsbuRXOxssS8jXeFA",
//     "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGFlNTVkZmQ0MzAwYzAwMWFlZGEzMWEiLCJmdWxsbmFtZSI6Ik1JTklTVEVSRSBOSU5FQSIsInBob25lTnVtYmVyIjoiKzIyMTc3ODkwODk4OSIsImlzQXBwcm92ZWQiOnRydWUsImlzTG9ja2VkIjpmYWxzZSwiaXNWZXJpZmllZCI6ZmFsc2UsInJlZmVycmFsQ29kZSI6IjAwU1YiLCJyZWZlcnJlZEJ5IjoiIiwic2x1ZyI6Im1pbmlzdGVyZS1uaW5lYSIsInVzZXJuYW1lIjoicGFwZW91c3NleW5vdS5kaW9wIiwiZW1haWwiOiJwYXBlb3Vzc2V5bm91LmRpb3BAa2FscGF5aW5jLmNvbSIsInJvbGUiOiJCVVNJTkVTUyIsImFjY291bnQiOiI2MGFlNTVkZjQzMmRjYjAwMWJmMmFhMGMiLCJzaG9wIjpudWxsLCJzaG9wT3duZXIiOm51bGwsInNob3BJZCI6bnVsbCwiY2FzaFJlZ2lzdGVycyI6W10sImNhbGxiYWNrVXJsIjoiIiwiaWF0IjoxNjIyMjkwNTY5LCJleHAiOjE2NTM4MjY1NjksImF1ZCI6ImthbHBheS5jb20iLCJpc3MiOiJrYWxwYXkuY29tIn0.t14SgeAci-gcBFXAPahTjlHsqlL-p5QIH_BX38VTYlU",
//     "user": {



// const payment = JSON.parse(localStorage.getItem('payment'));

// console.log(payment);

// axios.defaults.headers.common = {'Authorization': `Bearer ${payment.access_token}`}



const API_URL = "https://staging.service-backend.kalpayinc.com";

class PaymentService {

  AddPayment(amount, currency,type,comment,issuerPhoneNumber,operator) {
    return axios
    
      .post(API_URL + "/transactionservice/transactions/payment/init", { amount, currency,type,comment,issuerPhoneNumber,operator })
      .then((response) => {
        // if (response.data.access_token) {
        //   localStorage.setItem("payment", JSON.stringify(response.data));
        // }
         console.log(response)
        return response.data;
      });
  }

  GetAccess(secretKey,accessKey) {
    secretKey="b0b272c4-0611-45d4-86ef-281639388a43";
    accessKey="00SV/P2S75H0-0R8MBN7-GVQJG5M-74W8MGZ";
    return axios
    
      .post(API_URL + "/userservice/grant-access/login/apikey", { secretKey,accessKey })
      .then((response) => {
        if (response.data.access_token) {
          localStorage.setItem("payment", JSON.stringify(response.data));
        }
         console.log(response)
        return response.data;
      });
  }
 
  AddOtp(otp, comment) {
    console.log(otp, comment)
    return axios
      .post(API_URL + "/transactionservice/transactions/payment/complete", { otp, comment})
      .then((response) => {
        console.log(response);
        // if (response.data.access_token) {
        //   localStorage.setItem("user", JSON.stringify(response.data));
        // }
        
        // alert('Votre Soumission à été payé avec succés')
        return response.data;
      });

      
  }

  TransactionHystory() {
    return axios
      .get(API_URL + "/transactionservice/transactions?page=1&limit=10")
      .then((response) => {
        console.log(response);
        // if (response.data.access_token) {
        //   localStorage.setItem("user", JSON.stringify(response.data));
        // }
        
        
        return response;
      });

 
    }
}

export default new PaymentService();