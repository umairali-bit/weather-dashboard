var searchFormEl = document.querySelector("#search-form");
var nameInputEl = document.querySelector("#cityname");
var weatherContainerEl = document.querySelector("#weather-container");
var weatherSearchTerm = document.querySelector("#location-search");


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


var currentWeather = function(city) {
    // format the github api url


  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=783e1062d5d5d3053b9b739153c187d7";
// make a request to the url
    fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
        displayCurrentWeather(data, city);
    });
  });
};

var displayCurrentWeather = function(weather, location) {
    console.log(weather);
    console.log(location);

    weatherContainerEl.textContent ="";
    weatherSearchTerm.textContent ="";
    // create a container for each repo
  
    
    
    var timeEl =  Date();
    var cityEl = document.createElement("h1");
    cityEl.textContent = location +" "+ timeEl;

    var tempEl = document.createElement("h3");
    tempEl.textContent ="Temp: "+weather.main.temp+ "°F";

    
    
    weatherSearchTerm.appendChild(cityEl);
    

 
    
}





searchFormEl.addEventListener("submit", formSubmitHandler);