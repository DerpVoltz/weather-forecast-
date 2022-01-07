var apiKey = "70539c089a192ad51dae93112ad8a637";
var apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=Houston&units=imperial&appid=" + apiKey;
var currentSection = $("#current");
var city = "Houston";


fetch(apiUrlCurrent).then(function(response){
    if (response.ok){
        console.log(response);
        response.json().then(function(data){
            createCurrentWeather(data);
        })
    }
})


function getDate(data) {
    var date = new Date(data.dt*1000+(data.timezone*1000));
    var formatter = new Intl.DateTimeFormat('en-US', {timeZone: "America/Denver"});
    var formattedDate = formatter.format(date);
    console.log(formatter.format(date))
    return formattedDate;
}

function createCurrentWeather(data) {
    var temp = data.main.temp;
    var humidity = data.main.humidity;
    var wind = data.wind.speed;
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    var dataLog = $("<h1>" + city + " (" + getDate(data) + ")<image src='http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png'></image></h1>")
    var dataLogging = $("<p>Temp: " + temp + "°F</p> <p>Wind: " + wind + "MPH</p> <p>Humidity: " + humidity +" %</p>");
    currentSection.append(dataLog);
    currentSection.append(dataLogging);
    fetch("https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                var Uv = data.value;
                if (Uv <= 2 ) {
                    var UvIndex = $("<p>UV Index: <span class='p-2 bg-success rounded text-light'>" + Uv + "</span></p>");
                } else if (Uv <= 5) {
                    var UvIndex = $("<p>UV Index: <span class='p-2 bg-warning rounded'>" + Uv + "</span></p>");
                } else {
                    var UvIndex = $("<p>UV Index: <span class='p-2 bg-danger rounded text-light'>" + Uv + "</span></p>");
                }
                currentSection.append(UvIndex);
            })
        }
    })
}