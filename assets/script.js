var count =0

function displayWeather(weather){
    count = count+ 1
    var weatherDisplay = document.querySelector(".cityWeatherDisplay");
    weatherDisplay.innerHTML=""
    var city =document.createElement("h2")
    city.textContent=weather.name;
    weatherDisplay.append(city);

    var temp=document.createElement("p");
    temp.textContent=("Temp: " + weather.main.temp+ "°"+"C")
    weatherDisplay.append(temp);

    var wind=document.createElement("p");
    wind.textContent=("Wind: " + weather.wind.speed+ " MPH")
    weatherDisplay.append(wind);

    var hum=document.createElement("p");
    hum.textContent=("Humidity: " + weather.main.humidity+ "%")
    weatherDisplay.append(hum);
    
}

function preventFormReload(event) { event.preventDefault(); }


function fetchWeather(event){
    preventFormReload(event)
    var url =`https://api.openweathermap.org/data/2.5/weather?q=${document.querySelector(".form-control").value}&appid=457c6944073dbb74ae2aef7571a0fa10`;
fetch(url)
.then((response) => response.json())
.then((data) => displayWeather(data));
}

//add event listener on search button
var searchBtn = document.querySelector(".btn")
searchBtn.addEventListener("click",fetchWeather)
