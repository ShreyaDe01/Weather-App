var key = config.API_KEY

// get current location weather
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        console.log( "Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    long =  position.coords.longitude;

    // make API call to get current location weather
    var link = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + key;
    var request = new XMLHttpRequest();
    request.open('GET', link, true);
    request.onload = function() {
        var obj = JSON.parse(this.response);
        console.log(obj);
        document.getElementById('curr-weather').innerHTML = obj.weather[0].main;
        document.getElementById('curr-location').innerHTML = obj.name;
        document.getElementById('curr-temp').innerHTML = Math.round(obj.main.temp - 273.15);
        document.getElementById('curr-img-icon').src = "https://openweathermap.org/img/w/" + obj.weather[0].icon + ".png";
    }
    request.send();
}
getLocation()

cities = ['Delhi', 'Kolkata', 'Mumbai', 'Chennai']
cities.forEach(city => {
    link = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+key
    var request = new XMLHttpRequest();
    request.open('GET', link, true);
    request.onload = function (){
        var obj = JSON.parse(this.response)
        console.log(obj);
        idx = cities.indexOf(city)
        document.getElementById('weather'+idx).innerHTML = obj.weather[0].main;
        document.getElementById('location'+idx).innerHTML = obj.name;
        document.getElementById('temp'+idx).innerHTML = Math.round(obj.main.temp - 273.15);
        document.getElementById('img-icon'+idx).src="https://openweathermap.org/img/w/" + obj.weather[0].icon +".png";      
    }
    if(request.status >= 200 && request.status <400){
        var temp = obj.main.temp
    }else{
        console.log("The city data is not available")
    }
    request.send();
});