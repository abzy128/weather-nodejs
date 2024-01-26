class Weather {
  constructor(data) {
    this.temperature = data.temperature;
    this.description = data.description;
    this.icon = data.icon;
    this.feels_like = data.feels_like;
    this.humidity = data.humidity;
    this.pressure = data.pressure;
    this.wind_speed = data.wind_speed;
    this.country_code = data.country_code;
    this.rain = data.rain;
  }
}
module.exports = Weather;
