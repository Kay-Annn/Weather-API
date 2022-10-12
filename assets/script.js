
function preventFormReload(event) { event.preventDefault(); }
searchHistoryDisplay()

function fetchWeather(event) {
    preventFormReload(event)
    var url = `https://api.openweathermap.org/data/2.5/forecast?q=${document.querySelector(".form-control").value}&cnt=6&units=metric&appid=457c6944073dbb74ae2aef7571a0fa10`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => { displayWeather(data); fiveDayForecast(data) });
    searchForm.value.textContent = searchForm.value
    localStorage.setItem(searchForm.value, searchForm.value);
    searchHistoryDisplay()
}

function displayWeather(weather) {
    var weatherDisplay = document.querySelector(".cityWeatherDisplay");
    weatherDisplay.innerHTML = ""
    var city = document.createElement("h2")
    var today = moment().format('L');
    city.textContent = weather.city.name + " (" + (today) + ")";
    console.log(weather)
    var iconCode = (weather.list[0].weather[0].icon);
      var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
       var icon = document.createElement("img")
       icon.src=iconUrl 
        weatherDisplay.appendChild(icon)
    weatherDisplay.append(city);

    var temp = document.createElement("p");
    temp.textContent = ("Temp: " + weather.list[0].main.temp + "°" + "C")
    weatherDisplay.append(temp);

    var wind = document.createElement("p");
    wind.textContent = ("Wind: " + weather.list[0].wind.speed + " MPH")
    weatherDisplay.append(wind);

    var hum = document.createElement("p");
    hum.textContent = ("Humidity: " + weather.list[0].main.humidity + "%")
    weatherDisplay.append(hum);
}

function fiveDayForecast(weather) {
    var fiveDayForecastContainer = document.querySelector(".fiveDayForecastContainer");
    fiveDayForecastContainer.innerHTML = ""

    var fiveDayHeading = document.createElement("h2")
    fiveDayHeading.textContent = ("5-Day Forecast:")
    fiveDayForecastContainer.append(fiveDayHeading);

    var fiveDayForecastInfo = document.createElement("div");
    fiveDayForecastInfo.className="forecastBoxes"
    fiveDayForecastContainer.append(fiveDayForecastInfo)

    for (i = 1; i < weather.list.length; i++) { 
       

        var divElement = document.createElement("div")
        divElement.className = "fiveDayDiv"
        fiveDayForecastInfo.append(divElement)


        var date = document.createElement("p");
        var today = moment().add(i, 'days').format('L'); 
        date.textContent = (today);
        divElement.appendChild(date);

        var iconCode = (weather.list[i].weather[0].icon) 
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        var icon = document.createElement("img")
        icon.src=iconUrl 
        divElement.appendChild(icon)

        //creating temp info
        var temp = document.createElement("p");
        temp.textContent = ("Temp: " + weather.list[i].main.temp + "°" + "C")
        divElement.appendChild(temp);

        //creating wind info
        var wind = document.createElement("p");
        wind.textContent = ("Wind: " + weather.list[i].wind.speed + " MPH")
        divElement.appendChild(wind);

        //creating humidity info
        var hum = document.createElement("p");
        hum.textContent = ("Humidity: " + weather.list[i].main.humidity + "%")
        divElement.appendChild(hum);
        
    }
}

function searchHistoryDisplay() {
    var clearSearchItem = document.querySelector(".searchHistoryItems")
    clearSearchItem.innerHTML = ""
    for (i = 0; i < localStorage.length; i++) {
        var searchHistoryInfo = document.querySelector(".searchHistoryItems")
        var searchedItems = document.createElement("button")
        searchedItems.textContent = localStorage.getItem(localStorage.key(i))
        searchHistoryInfo.append(searchedItems)
        searchedItems.addEventListener("click", searchedItemReload)
    }
}

function searchedItemReload(event){
searchForm.value = event.target.innerHTML
fetchWeather(event);
}

//add event listener on search button
var searchBtn = document.querySelector(".btn")
searchBtn.addEventListener("click", fetchWeather)

var searchForm = document.querySelector(".form-control");
var searchHistory = localStorage.getItem("searchHistory");

//searchHistoryInfo.textContent=

//var city = localStorage.getItem("city");
//store search in local storage