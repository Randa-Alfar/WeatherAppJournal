// Setup empty JS object to act as endpoint for all routes
var projectData = {};
// Require Express to run server and routes
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 8888;
// Initialize the main project folder
app.use(express.static('website'));
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
//get the data from projectData when it make get request and send projectData
function getData(require,response){
  response.send(projectData);
  console.log("the data was succesfully extracted !!!");
}
//definition of get 
app.get('/opneAndGetData',getData);


//create post method that will callback postData function
app.post('/saveData',postData);
//get data from request body and save it in the object projectData
function postData (request,response){

  let dataComing = request.body;
  let data = {
      country :dataComing.country,
      date: dataComing.date,
      temp:dataComing.temp,
      description:dataComing.description,
      feelings:dataComing.feelings
  };
 projectData = data;

 console.log(projectData);
}
// Setup Server
app.listen(port,()=>{
  console.log("its working unpossible!!!!!")
});
