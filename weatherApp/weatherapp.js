const apiKey = "a6b5184101e029abcc08a9bcf8969704";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".searchbox input");
const searchButton = document.querySelector(".searchbox button");
const weatherImg = document.querySelector(".image");
const windText = document.querySelector("#temp");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  console.log(response);
  var data = await response.json();

  console.log(data);

  if (data.cod == "404") {
    document.getElementById("city").innerHTML = data.message;
    document.getElementById("city").style.color = "red";
    document.getElementById("temp").innerHTML = " Enter Valid City";
    document.getElementById("temp").style.fontSize = "30px";
    weatherImg.style.backgroundImage = "url('assets/404.png')";
    weatherImg.style.backgroundSize = "contain";
    weatherImg.style.backgroundRepeat = "no-repeat";
    document.getElementById("wind").innerHTML = " ";
    document.getElementById("humidity").innerHTML = " ";
    console.clear(data);
  } else {
    document.getElementById("temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.getElementById("city").innerHTML = data.name;
    document.getElementById("wind").innerHTML = data.wind.speed + "kph";
    document.getElementById("humidity").innerHTML = data.main.humidity + "%";
    document.getElementById("city").style.color = "green";
    document.getElementById("description").innerHTML = data.weather[0].description;

    weatherImg.style.backgroundSize = "contain";
    weatherImg.style.backgroundRepeat = "no-repeat";
    document.getElementById("temp").style.fontSize = "65px";

    if (data.weather[0].main == "Clouds") {
      weatherImg.style.backgroundImage = "url('assets/cloudy.png')";
      windText.style.color = "lightblue";
    } else if (data.weather[0].main == "Haze") {
      weatherImg.style.backgroundImage = "url('assets/haze.png')";
      windText.style.color = "lightpink";
    } else if (data.weather[0].main == "Rain") {
      weatherImg.style.backgroundImage = "url('assets/rain.png')";
      windText.style.color = "blue";
    } else if (data.weather[0].main == "Mist") {
      weatherImg.style.backgroundImage = "url('assets/mist.png')";
      windText.style.color = "blue";
    }
  }
}

searchButton.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    checkWeather(searchBox.value);
  }
});


window.onload(checkWeather("pune"));
