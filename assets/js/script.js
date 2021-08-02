var searchFormEl = document.querySelector("#search-form");
var nameInputEl = document.querySelector("#cityname");
var weatherContainerEl = document.querySelector("#weather-container");
var weatherSearchTerm = document.querySelector("#location-search");
var forecastEl = document.querySelector("#forecast")

var formSubmitHandler = function(event) {
  event.preventDefault();
  // get value from input element
var cityname = nameInputEl.value.trim();

if (cityname) {
  currentWeather(cityname);
  nameInputEl.value = "";
} else {
  alert("Please enter a city name");
}

};


var currentWeather = function(location) {
    // format the github api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&units=imperial&appid=783e1062d5d5d3053b9b739153c187d7";

  
    // make a request to the url
    fetch(apiUrl).then(function(response) {
      if (response.ok) {
        response.json().then(function (weather) {
          getTodaysWeather(weather, location);
           
          
      });
    
  }
});
}


var getTodaysWeather = function(weather, location){
  var lat= weather.coord.lat;
  var lon= weather.coord.lon;
 
  
  var uvApi="https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly,daily,alerts&appid=783e1062d5d5d3053b9b739153c187d7";
  //make a get request to url
  fetch(uvApi)
  .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(uvdata) {
          displayCurrentWeather(weather, location, uvdata);
        });
      }
    });
};


var displayCurrentWeather = function(weather, location, uvdata) {
    console.log(weather);
    console.log(location);
    console.log(uvdata);

    weatherContainerEl.textContent ="";
    weatherSearchTerm.textContent ="";
    // create a container for each repo
  
    
    timeEl =  moment().format('MMMM Do YYYY, h:mm:ss a');
    var cityEl = document.createElement("h2");
    cityEl.textContent = location +","+" "+ timeEl;

    var tempEl = document.createElement("h4");
    tempEl.textContent ="Temp: "+weather.main.temp+ "°F";

    windEl = document.createElement("h4");
    windEl.textContent ="Wind: "+weather.wind.speed+ " MPH";

    var humidEl = document.createElement("h4");
    humidEl.textContent ="Humidity: "+weather.main.humidity + "%";

    var uvEl = document.createElement("h4");
    var uvNum= document.createElement("span");
    var iconEl = document.createElement("img");
    
    if(uvdata.current.uvi>8){
      uvNum.classList = "uv-red";
    }
    else if(uvdata.current.uvi>5){
      uvNum.classList = "uv-yellow";
    }
    else{
      uvNum.classList = "uv-green";
    }
    uvEl.textContent ="UV Index: ";
    uvNum.textContent=" "+uvdata.current.uvi+ " ";
    uvEl.appendChild(uvNum);

    
    weatherSearchTerm.appendChild(cityEl);
    weatherSearchTerm.appendChild(tempEl);
    weatherSearchTerm.appendChild(windEl);
    weatherSearchTerm.appendChild(humidEl);
    weatherSearchTerm.appendChild(uvEl); 

 
    
};
 
var get5DWeather = function(city){
  //format openWeather api url
  var apiUrl3 = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=imperial&appid=783e1062d5d5d3053b9b739153c187d7";
  fetch(apiUrl3)
        .then(function(response) {
            // request was successful
            if (response.ok) {
              response.json().then(function(citydata) {
                  console.log(citydata);
              });
            }
          }) 
};



searchFormEl.addEventListener("submit", formSubmitHandler);