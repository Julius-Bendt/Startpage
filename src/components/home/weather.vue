<template>
  <div class="row">
    <div class="col-md-12">
      <h1>{{ location }}</h1>
      <div class="row">
        <div class="col-md-3">
          <img
            class="img-fluid weather-icon"
            style="width:80%; height:auto;"
            :src="iconUrl"
            alt="Weather"
          />
        </div>
        <div class="col-md-6 my-auto">
          <p>{{ condition }} ({{ windDirection }})</p>
          <p>
            Average: <span class="text-warning">{{ tempAvg }}</span
            >°C, Feels like: {{ temp_feels_like }}°C
          </p>
          <p>{{ pressure }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/assets/config.json";
export default {
  name: "weather",
  data: function() {
    return {
      location: "Unknown",
      iconUrl: "Error",
      condition: "Unknown",
      temp_feels_like: "Unknown",
      tempAvg: "Unknown",
      pressure: "Unknown",
      windDirection: "NE"
    };
  },
  created() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.GetWeatherFromPosition);
    } else {
      console.log("Geo data Unavailable.");
    }
  },
  methods: {
    GetWeatherFromPosition(position) {
      const apiToken = config.weatherApikey;
      const weatherEndpoint =
        "https://api.openweathermap.org/data/2.5/weather?units=metric&";

      let url = `${weatherEndpoint}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiToken}`;

      //api call
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const weatherIcon = data.weather[0].icon; //
          const weatherDesc = data.weather[0].description;

          this.tempAvg = data.main.temp; //c
          this.temp_feels_like = data.main.feels_like;
          const pressure = data.main.pressure; //hpa
          const humidity = data.main.humidity; // %

          const windSpeed = data.wind.speed; //m/s
          this.windDirection = this.getWindDescription(data.wind.deg);

          const locationName = data.name;
          this.condition = `${weatherDesc}, Wind speeds: ${windSpeed} m/s`;
          //this.temp = `avenge: ${temperatureAvg}${celciusIcon}, min: ${temperatureMin}${celciusIcon}, max: ${temperatureMax}${celciusIcon}`;
          this.pressure = `humidity: ${humidity}%, pressure: ${pressure} hPa`;

          this.iconUrl = this.GetIcon(weatherIcon);
          this.location = locationName;
        });
    },
    GetIcon(icon) {
      let component = "cloud";
      switch (icon) {
        case "01d":
          component = "sun";
          break;
        case "01n":
          component = "moon";
          break;
        case "02d":
          component = "02d";
          break;
        case "02n":
          component = "02n";
          break;
        case "03d":
          component = "03";
          break;
        case "03n":
          component = "03";
          break;
        case "04d":
          component = "04";
          break;
        case "04n":
          component = "04";
          break;
        case "09d":
          component = "cloud-drizzle";
          break;
        case "09n":
          component = "cloud-drizzle";
          break;
        case "10d":
          component = "ccloud-rain";
          break;
        case "10n":
          component = "cloud-rain";
          break;
        case "11d":
          component = "cloud-lightning";
          break;
        case "11n":
          component = "cloud-lightning";
          break;
        case "13d":
          component = "cloud-snow";
          break;
        case "13n":
          component = "cloud-snow";
          break;
        case "50d":
          component = "fogd";
          break;
        case "50n":
          component = "fogn";
          break;
      }
      return "images/weather/" + component + ".svg";
    },
    getWindDescription(deg) {
      if (deg >= 384.75 || (deg > 0 && deg < 11.25)) {
        return "NNE";
      } else if (deg >= 11.25 && deg < 33.75) {
        return "NE";
      } else if (deg >= 33.75 && deg < 56.25) {
        return "NE";
      } else if (deg >= 56.25 && deg < 78.75) {
        return "ENE";
      } else if (deg >= 78.75 && deg < 101.25) {
        return "E";
      } else if (deg >= 101.25 && deg < 123.75) {
        return "ESE";
      } else if (deg >= 123.75 && deg < 146.25) {
        return "SE";
      } else if (deg >= 146.25 && deg < 168.75) {
        return "SSE";
      } else if (deg >= 168.75 && deg < 191.25) {
        return "S";
      } else if (deg >= 191.25 && deg < 213.75) {
        return "SSW";
      } else if (deg >= 213.75 && deg < 236.25) {
        return "SW";
      } else if (deg >= 236.25 && deg < 258.75) {
        return "WSW";
      } else if (deg >= 258.75 && deg < 281.25) {
        return "W";
      } else if (deg >= 281.25 && deg < 303.75) {
        return "WNW";
      } else if (deg >= 303.75 && deg < 326.25) {
        return "NW";
      } else if (deg >= 326.25 && deg < 348.75) {
        return "NNW";
      }
    }
  }
};
</script>
