function fetchWeatherData() {
    /*Fetch the data */
    fetch(`https://api.weatherapi.com/v1/current.json?key=e0c1a083d9094ababd0211848210510&q=${cityInput}`)
      /*convert the JS data to javascript*/
      .then(response => response.json())
      .then(data => {
        console.log(data);
        
        /*adding the temperature + weather*/
        temp.innerHTML = data.current.temp_c + "&#176;";
        conditionOutput.innerHTML = data.current.condition.text;
        
        /*date and time from city and individual data from day month and year*/
        const date = data.location.localtime;
        const y = parseInt(date.substr(0, 4));
        const m = parseInt(date.substr(5, 2));
        const d = parseInt(date.substr(8, 2));
        const time = date.substr(11); 
        
        /*date format to make aesthetcially appealing*/
        dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}/${m}/${y}`;
        timeOutput.innerHTML = time;
        /*adding name of city to the page*/
        nameOutput.innerHTML = data.location.name;
        /*Get the corresponding icon for weather*/
        const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
        icon.src = "./icons/" + iconId;
        
        //Adding weather details to site
        cloudOutput.innerHTML = data.current.cloud + "%";
        humidityOutput.innerHTML = data.current.humidity + "%";
        windOutput.innerHTML = data.current.wind_kph + "km/h";
        
        //set default time
        let timeOfDay = "day";
        //Get the unique id for each weather condition
        const code = data.current.condition.code; 
        
        //if statement to change to night if night from API
        if(!data.current.is_day) {
          timeOfDay = "night";
        } 
        
        if(code == 1000) { 
          /*making background clear if weather is clear*/
          app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
          /*change colour of search bar depending on day or night*/
          btn.style.background = "#e5ba92";
          if(timeOfDay == "night") {
            btn.style.background = "#181e27";
          }
        }
        /*Same thing for cloudy weather*/
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
        /*And rain*/
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
        /*And snow for anywhere but gosh darn australia 😭*/
        } else {
          app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
          btn.style.background = "#4d72aa";
          if(timeOfDay == "night") {
            btn.style.background = "#1b1b1b";
          }
        }
        //fade in animation
        app.style.opacity = "1";
      })
      /*if user types a city that doesnt exist then an alert will return*/
      .catch(() => {
        alert('City not found, please try again');
        app.style.opacity = "1";
      });
    }
    
    //page load
    fetchWeatherData();