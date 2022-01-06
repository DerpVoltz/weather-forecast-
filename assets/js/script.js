var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Houston&appid=70539c089a192ad51dae93112ad8a637"
fetch(apiUrl).then(function(response){
    if (response.ok){
        console.log(response);
    }
})