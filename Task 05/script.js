const apiKey = "84a13a34b3e4e8d173628bbecd3d128e";

// Search by city
function getWeather() {
  let city = document.getElementById("city").value;

  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      console.log(data);

      if (data.cod !== 200) {
        alert("City not found");
        return;
      }

      displayWeather(data);
    })
    .catch(error => {
      console.log(error);
      alert("Error fetching data");
    });
}

// Display weather
function displayWeather(data) {
  document.getElementById("cityName").innerText = data.name;
  document.getElementById("temp").innerText = data.main.temp + "°C";
  document.getElementById("desc").innerText = data.weather[0].description;
  document.getElementById("humidity").innerText =
    "Humidity: " + data.main.humidity + "%";
}

// Location weather
function getLocationWeather() {
  navigator.geolocation.getCurrentPosition(position => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
      .then(res => res.json())
      .then(data => displayWeather(data));
  });
}