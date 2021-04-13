var searchList = [];

$("#card1").hide();
$("#card2").hide();
$("#card3").hide();
$("#card4").hide();
$("#card5").hide();

var today = new Date();
var day = String(today.getDate());
var month = String(today.getMonth() + 1);
var year = today.getFullYear();
var displayDate = day + "/" + month + "/" + year;


function displayCityWeather() {
    event.preventDefault();

    var citySearch = $("#citySearchBar").val();
    var queryURLCWD = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=48eb8f7025236f284142f7fe0b9f55b4&units=metric";

    $.ajax({
        url: queryURLCWD,
        method: "GET"
    }).then(function (response) {
        $("#cityName").text(response.name + " " + displayDate);
        var tempNumber = Math.round(response.main.temp);
        $("#temperature").text("Temperature: " + tempNumber + "°C");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#windSpeed").text("Wind Speed: " + response.wind.speed + " KM/H");

        var long = response.coord.lon;
        var lat = response.coord.lat;

        var queryURLUVIndex = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&appid=48eb8f7025236f284142f7fe0b9f55b4";

        $.ajax({
            url: queryURLUVIndex,
            method: "GET"
        }).then(function (response) {

            var uvIndexValue = response.value;

            var indexLow = $("<span>");
            indexLow.addClass("badge badge-success");
            indexLow.text(response.value);

            var indexMid = $("<span>");
            indexMid.addClass("badge badge-warning");
            indexMid.text(response.value);

            var indexHigh = $("<span>");
            indexHigh.addClass("badge badge-danger");
            indexHigh.text(response.value);

            if (uvIndexValue <= 3) {
                $("#uvIndex").append(indexLow);
            }
            else if (uvIndexValue <= 7) {
                $("#uvIndex").append(indexMid);
            }
            else if (uvIndexValue => 7) {
                $("#uvIndex").append(indexHigh);
            }
        });
    });

    var queryURLFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=48eb8f7025236f284142f7fe0b9f55b4&units=metric";

    
    $.ajax({
        url: queryURLFiveDay,
        method: "GET"
    }).then(function (response) {
        //Card 1
        $("#dateCard1").text(response.list[6].dt_txt);
        $("#temperatureCard1").text("Temp: " + response.list[6].main.temp + "°C");
        $("#humidityCard1").text("Humidity: " + response.list[6].main.humidity + "%");
        //Card 2
        $("#dateCard2").text(response.list[14].dt_txt);
        $("#temperatureCard2").text("Temp: " + response.list[14].main.temp + "°C");
        $("#humidityCard2").text("Humidity: " + response.list[14].main.humidity + "%");
        //Card 3
        $("#dateCard3").text(response.list[22].dt_txt);
        $("#temperatureCard3").text("Temp: " + response.list[22].main.temp + "°C");
        $("#humidityCard3").text("Humidity: " + response.list[22].main.humidity + "%");
        //Card 4
        $("#dateCard4").text(response.list[30].dt_txt);
        $("#temperatureCard4").text("Temp: " + response.list[30].main.temp + "°C");
        $("#humidityCard4").text("Humidity: " + response.list[30].main.humidity + "%");
        //Card 5
        $("#dateCard5").text(response.list[38].dt_txt);
        $("#temperatureCard5").text("Temp: " + response.list[38].main.temp + "°C");
        $("#humidityCard5").text("Humidity: " + response.list[38].main.humidity + "%");


    });
}

function renderSearchList() {
    $("#searchListPrevious").empty();

    for (var i = 0; i < searchList.length; i++) {
        var newCity = $("<li>");
        newCity.addClass("list-group-item");
        newCity.attr("data-name", searchList[i]);
        newCity.text(searchList[i]);
        $("#searchListPrevious").append(newCity);
    }
}

$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    
    var cityList = $("#citySearchBar").val().trim();

    searchList.push(cityList);

    renderSearchList();
});

$(document).ready(function () {
    $("#searchBtn").on("click", function () {
        $("#card1").show();
        $("#card2").show();
        $("#card3").show();
        $("#card4").show();
        $("#card5").show();
    });
});