var apiKey = "70539c089a192ad51dae93112ad8a637";
var city = "Houston";
var latLon = [1, 2];
var apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
var currentSection = $("#current");
var futureSection = $("#five-day");


fetch(apiUrlCurrent).then(function(response){
    if (response.ok){
        response.json().then(function(data){
            createCurrentWeather(data);
            futureWeather(data.coord.lat, data.coord.lon)
        })
    }
})

function futureWeather(lat, lon) {
    var apiUrlFuture = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely_hourly_alerts&units=imperial&appid=" + apiKey;
    fetch(apiUrlFuture).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                console.log(data);
                futureCards(data);
            })
        }
    })
}

function futureCards(data) {
    for (i = 1; i < 6; i++) {
        var date = getDateFuture(data, i);
        var temp = data.daily[i].temp.day;
        var wind = data.daily[i].wind_speed;
        var icon = data.daily[i].weather[0].icon;
        var humidity = data.daily[i].humidity;
        var card = $("<div class='col rounded card-color m-3'> <h6 class='text-light'>" + date + "</h6> </div>");
        var weatherIcon = $("<img class='max-width-20' src='http://openweathermap.org/img/wn/" + icon + "@2x.png'>");
        var tempStat = $("<p class='text-light card-text'>Temp: " + temp + "°F</p>");
        var windStat = $("<p class='text-light card-text'>Wind: " + wind + " MPH</p>");
        var humidityStat = $("<p class='text-light card-text'>Humidity: " + humidity + " %</p>");

        card.append(weatherIcon, tempStat, windStat, humidityStat);
        futureSection.append(card);
    }

}

function getDateFuture(data, i) {
    var unixTime = data.daily[i].dt;
    var date = new Date(unixTime*1000);
    var finalDate = date.toLocaleDateString("en-US");
    return finalDate;
}

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
    var dataLog = $("<h1>" + city + " (" + getDate(data) + ")<img src='http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png'></h1>")
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

