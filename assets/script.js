
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
    city.textContent = weather.city.name;
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
    var fiveDayForecastInfo = document.querySelector(".fiveDayForecast");
    fiveDayForecast.innerHTML = ""
    for (i = 1; i < weather.list.length; i++) {
        var city = document.createElement("h2")
        city.textContent = weather.city.name;
        fiveDayForecastInfo.append(city);

        var temp = document.createElement("p");
        temp.textContent = ("Temp: " + weather.list[i].main.temp + "°" + "C")
        fiveDayForecastInfo.append(temp);

        var wind = document.createElement("p");
        wind.textContent = ("Wind: " + weather.list[i].wind.speed + " MPH")
        fiveDayForecastInfo.append(wind);

        var hum = document.createElement("p");
        hum.textContent = ("Humidity: " + weather.list[i].main.humidity + "%")
        fiveDayForecastInfo.append(hum);
    }
}

function searchHistoryDisplay() {
    var clearSearchItem = document.querySelector(".searchHistoryItems")
    clearSearchItem.innerHTML = ""
    for (i = 0; i < localStorage.length; i++) {
        var searchHistoryInfo = document.querySelector(".searchHistoryItems")
        var searchedItems = document.createElement("span")
        searchedItems.textContent = localStorage.getItem(localStorage.key(i))
        searchHistoryInfo.append(searchedItems)
    }
}



//add event listener on search button
var searchBtn = document.querySelector(".btn")
searchBtn.addEventListener("click", fetchWeather)

var searchForm = document.querySelector(".form-control");
var searchHistory = localStorage.getItem("searchHistory");

//searchHistoryInfo.textContent=

//var city = localStorage.getItem("city");
//store search in local storage