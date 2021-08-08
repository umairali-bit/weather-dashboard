var searchFormEl = document.querySelector("#search-form");
var nameInputEl = document.querySelector("#cityname");
var searchEl = document.querySelector(".searches");
var historyEl = document.querySelector("#history");
var weatherContainerEl = document.querySelector("#weather-container");
var weatherSearchTerm = document.querySelector("#location-search");
var forecastEl = document.querySelector("#forecast5");
var searchHistory =[]; 
var apiKey = "783e1062d5d5d3053b9b739153c187d7";
var locationUrl = "https://api.openweathermap.org/data/2.5/weather";
var uvApiUrl = "https://api.openweathermap.org/data/2.5/onecall";
var foreCastUrl = "https://api.openweathermap.org/data/2.5/forecast";
var apiUnit = "&units=imperial";
var exclude = "minutely,hourly,daily,alerts";

// seach history functions
 //var renderSeachHistory= function() {
  //historyEl.innerHTML ='';
  //start and end the hsitory array and count down to show the most recent
  // for loop that decrements.

  //for (var i=searchHistory.length; i>=0; i--)
   //declare button with .create and attr going to be one for the button
   //classlist.add
   //data search allows acccess to cityname.click handler
   //textcontent = searcxh history then append it to the button


 



//}
//function update history in local storage and then display local storage. 
//function to append history. include condition if there is no search term return the function. 
//push search hiostory. localStorage.setItem. 
//call renderSeachHistoryfunction.
//function to get hisotry from local storage.
//declare variable= getlocal storage.
//true condition statment.
//render the search history. 

var formSubmitHandler = function (event) {
  event.preventDefault();
  var cityname = nameInputEl.value.trim();
  if (cityname) {
    getCurrentLoc(cityname);
    nameInputEl.value = "";
  } else {
    alert("Please enter a city name");
  }

};

var getCurrentLoc = function (location) {
  var locationApi = locationUrl + "?q=" + location + "&appid=" + apiKey + apiUnit;
  fetch(locationApi).then(function (response) {
    if (response.ok) {
      response.json().then(function (weather) {
        getCurrentWeather(weather, location);
      });

    }
  });
}


var getCurrentWeather = function (weather, location) {
  var lat = weather.coord.lat;
  var lon = weather.coord.lon;
  var uvApi = uvApiUrl + "?lat=" + lat + "&lon=" + lon + "&exclude=" + exclude + "&appid=" + apiKey;
  fetch(uvApi)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (uvdata) {
          displayCurrentWeather(weather, location, uvdata);
        });
      }
    });
};


var displayCurrentWeather = function (weather, location, uvdata) {
  console.log(weather);
  console.log(location);
  console.log(uvdata);

  weatherSearchTerm.textContent = "";

  timeEl = moment().format('MMMM Do YYYY, h:mm:ss a');
  var currentEL = document.createElement("h2");
  currentEL.textContent = location + "," + " " + timeEl;

  var currentTEl = document.createElement("h5");
  currentTEl.textContent = "Temp: " + weather.main.temp + "°F";

  currentWEl = document.createElement("h5");
  currentWEl.textContent = "Wind: " + weather.wind.speed + " MPH";

  var currentHEl = document.createElement("h5");
  currentHEl.textContent = "Humidity: " + weather.main.humidity + "%";

  var currentUEl = document.createElement("h5");
  var uvNum = document.createElement("span");



  if (uvdata.current.uvi > 8) {
    uvNum.classList = "uv-red";
  }
  else if (uvdata.current.uvi > 5) {
    uvNum.classList = "uv-yellow";
  }
  else {
    uvNum.classList = "uv-green";
  }
  currentUEl.textContent = "UV Index: ";
  uvNum.textContent = " " + uvdata.current.uvi + " ";
  currentUEl.appendChild(uvNum);


  weatherSearchTerm.appendChild(currentEL);
  weatherSearchTerm.appendChild(currentTEl);
  weatherSearchTerm.appendChild(currentWEl);
  weatherSearchTerm.appendChild(currentHEl);
  weatherSearchTerm.appendChild(currentUEl);

  var getForecastWeather = function () {
    //format openWeather api url
    var foreCastApi = foreCastUrl + "?q=" + location + "&appid=" + apiKey + apiUnit;

    //make a get request to url
    fetch(foreCastApi)
      .then(function (response) {
        // request was successful
        if (response.ok) {
          response.json().then(function (weather) {
            displayForecast(weather);
          });
        }

      });
  };

  var displayForecast = function (weather) {
    console.log(weather);
    //check if api returned info
    forecastEl.innerHTML = "";

    for (var i = 7; i <= 39; i += 8) {
      var date = document.createElement("p");
      var temp = document.createElement("p");
      var wind = document.createElement("p");
      var humidity = document.createElement("p");
      var iconEl = document.createElement("img");
      iconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weather.list[i].weather[0].icon + ".png");

      date.textContent = moment.unix(weather.list[i].dt).format("MM/DD/YYYY");
      date.appendChild(iconEl);
      temp.textContent = "Temp: " + weather.list[i].main.temp + "°F";
      wind.textContent = "Wind: " + weather.list[i].wind.speed + " MPH";
      humidity.textContent = "Humidity: " + weather.list[i].main.humidity + "%";

      

      var daysEl = document.createElement("div");
      daysEl.classList = "col-sm-2";
      daysEl.appendChild(date);
      daysEl.appendChild(temp);
      daysEl.appendChild(wind);
      daysEl.appendChild(humidity);
      forecastEl.appendChild(daysEl);

    };



  }


  getForecastWeather();

};



searchFormEl.addEventListener("submit", formSubmitHandler);