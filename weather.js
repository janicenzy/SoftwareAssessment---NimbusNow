// selecting element and storing it within variables
// form, search and btn is used for getting user input
const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

//Default city when the page loads
let cityInput = "Sydney";

//Add click event to each city in the panel
cities.forEach((city) => {
  city.addEventListener('click', (e) => {
    //when city is clicked, cityInput is updated
    cityInput = e.target.innerHTML;
    //call fetchWeatherData(); and load new data
    fetchWeatherData();
    //fade out animation
    app.style.opacity = "0";
  });
})

// if statement: nothing = alert, else reload page with ne city
form.addEventListener('submit', (e) => {
  // if user doesn't enter anything in the search an alert appears
  if(search.value.length == 0) {
    alert('Please type in a city name');
  } else {
    // update cityInput with city user typed
    cityInput = search.value;
    // fetches data from weatherapi
    fetchWeatherData();
    // take away text in search area
    search.value = "";
    //fade out animation
    app.style.opacity = "0";
  }
  
  //P stops page from refreshing when search is sumbitted
  e.preventDefault();
});

// converts numeric date to a day name e.g. 20/08/2024 = tuesday
function dayOfTheWeek(day, month, year) {
  const weekday = [
    "Sunday", 
    "Monday", 
    "Tuesday", 
    "Wednesday", 
    "Thursday", 
    "Friday", 
    "Saturday"
  ];
  return weekday[new Date(year, month - 1 , day).getDay()];
};

// call weatherpai to get weather data for cityInput
function fetchWeatherData() {
// fetch data
fetch(`https://api.weatherapi.com/v1/current.json?key=e0c1a083d9094ababd0211848210510&q=${cityInput}`)
  // convert JSON resopnse to javascript
  .then(response => response.json())
  .then(data => {
    // debugging
    console.log(data);
    
    // temperature and weather conditions updtes
    temp.innerHTML = data.current.temp_c + "&#176;";
    conditionOutput.innerHTML = data.current.condition.text;
    
    // takes year, month, day and time from data.location.localtime
    const date = data.location.localtime;
    const y = parseInt(date.substr(0, 4));
    const m = parseInt(date.substr(5, 2));
    const d = parseInt(date.substr(8, 2));
    const time = date.substr(11); 
    
    // reformat date
    dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}/${m}/${y}`;
    timeOutput.innerHTML = time;

    // add name of city to page
    nameOutput.innerHTML = data.location.name;
    // grab corresponding icon for weather
    const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
    // takes icon name of file from api and sets in icons folder
    icon.src = "./icons/" + iconId;
    
    // update cloud, humidity and wind on page
    cloudOutput.innerHTML = data.current.cloud + "%";
    humidityOutput.innerHTML = data.current.humidity + "%";
    windOutput.innerHTML = data.current.wind_kph + "km/h";
    
    // set default time of day
    let timeOfDay = "day";
    const code = data.current.condition.code; 
    
    // change to night if city is in the night
    if(!data.current.is_day) {
      timeOfDay = "night";
    } 
    
    // if weather equal to 1000 {specific condition code that represents clear weather in weatherapi}
    if(code == 1000) { 
      // set background image to clear if weather is clear
      app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
      // change background search color depending on if its day or night
      btn.style.background = "#e5ba92";
      if(timeOfDay == "night") {
        btn.style.background = "#181e27";
      }
    }
    // same if condition code for cloudy weather is selected
    else if (
      code == 1003 ||
      code == 1006 ||
      code == 1009 ||
      code == 1030 ||
      code == 1069 ||
      code == 1087 ||
      code == 1135 ||
      code == 1273 ||
      code == 1276 ||
      code == 1279 ||
      code == 1282
    ) {
      app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
      btn.style.background = "#fa6d1b";
      if(timeOfDay == "night") {
        btn.style.background = "#181e27";
      }
    // same if condition code for rainy weather is selected
    } else if (
      code == 1063 ||
      code == 1069 ||
      code == 1072 ||
      code == 1150 ||
      code == 1153 ||
      code == 1180 ||
      code == 1183 ||
      code == 1186 ||
      code == 1189 ||
      code == 1192 ||
      code == 1195 ||
      code == 1204 ||
      code == 1207 ||
      code == 1240 ||
      code == 1243 ||
      code == 1246 ||
      code == 1249 ||
      code == 1252 
    ) {
      app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
      btn.style.background = "#647d75";
      if(timeOfDay == "night") {
        btn.style.background = "#325c80";
      }
    // same if condition code for snowy weather is selected
    } else {
      app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
      btn.style.background = "#4d72aa";
      if(timeOfDay == "night") {
        btn.style.background = "#1b1b1b";
      }
    }
    //fade in aniamtion once done
    app.style.opacity = "1";
  })
  // if user types a city that does not exist then send an alert
  .catch(() => {
    alert('City not found, please try again');
    app.style.opacity = "1";
  });
}

// call function when page loads
fetchWeatherData();

// fade animation
app.style.opacity = "1";