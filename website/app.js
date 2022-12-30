// /* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast?zip=';
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=c2d3b3bd0a9f0c9e0db93d56b215b651&units=metric';
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click',startGettingData);

function startGettingData(){
    let zip = document.getElementById('zip').value;
    let feel = document.getElementById('feelings').value;
    console.log('we get zip code succesfully!!! '+zip + " and feel value = "+feel);

    dataReception(zip).then(data=>{
    let country = data.city.name,
    temp = data.list[0].main.temp,
    description = data.list[0].weather[0].description;
    let newData = {
        country:country,
        date:newDate,
        temp:temp,
        description:description,
        feelings:feel
    }
       console.log(typeof newData);
        //http://localhost:8888/saveData
       savrData('/saveData',newData);
       UI('/opneAndGetData');
    });
}
//get data from the open weather api 
const dataReception = async(zip)=>{
    const response = await fetch(baseUrl+zip+apiKey);

    try{
        console.log("fetch is working now we are reciving data !!!");
        const data = await response.json();
        console.log(data);
        return data;
    }catch(error){
        console.log("the error is "+error );
    }

}
// get the data and post it in the server to save it 
const savrData = async(url='', newdata={})=>{
    console.log("saving function have been called!!! and data equal");
    console.log(newdata);
    console.log(url);
    try{
   
   const response = await fetch(url,{
        method:'POST',
       credentials:'same-origin',
        headers: {
            'Content-Type': 'application/json ; charset=UTF-8',
        },
        body: JSON.stringify(newdata)
    });
    
            const myData = await response.json();
            console.log(myData);
            return myData;   
    }catch(error){
        console.log(error);
    }
}
//get data from the server and put data in the ui design (html page)
const UI = async(url)=>{
  const response = await fetch(url);
  try{
      const fullData = await response.json();
      console.log(fullData);
      document.getElementById("country").innerHTML=fullData.country;
      document.getElementById("entryHolder").innerHTML=fullData.feelings;
      document.getElementById("date").innerHTML=fullData.date;
      document.getElementById("temp").innerHTML=Math.round(fullData.temp)+	"\u2103";
      document.getElementById("content").innerHTML=fullData.description;
  }catch(error){
      console.log(error);
  }
}
