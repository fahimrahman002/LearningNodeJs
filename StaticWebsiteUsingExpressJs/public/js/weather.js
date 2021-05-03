function openSearch() {
  document.getElementById("myOverlay").style.display = "block";
}

function closeSearch() {
  document.getElementById("myOverlay").style.display = "none";
}

const home = document.getElementById("home");
home.addEventListener("click", () => {
  window.location.href = "/";
});

const sunset = document.getElementById("sunset");
const sunrise = document.getElementById("sunrise");
const location_country = document.getElementById("location_country");
const temp = document.getElementById("temp");
const weather = document.getElementById("weather");
const wind = document.getElementById("wind");
const feels_like = document.getElementById("feels_like");
const tempmax = document.getElementById("tempmax");
const tempmin = document.getElementById("tempmin");
const humidity = document.getElementById("humidity");

const getInfo = async (event) => {
  event.preventDefault();
  let city = cityName.value;
  if (city === "") {
    alert("Write the name before search");
  } else {
    try {
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f47a4ee422529a5f19ce0b20405b9097`;
      const res = await fetch(url);
      const data = await res.json();
      const arrData = [data];
      temp.innerHTML = `${arrData[0].main.temp.toFixed(1)}°C`;
      location_country.innerHTML = `${arrData[0].name}, ${arrData[0].sys.country}`;
      weather.innerHTML = `${arrData[0].weather[0].main}`;
      humidity.innerHTML = `${arrData[0].main.humidity} %`;
      tempmin.innerHTML = `${arrData[0].main.temp_min.toFixed(2)}°C`;
      tempmax.innerHTML = `${arrData[0].main.temp_max.toFixed(2)}°C`;
      sunrise.innerHTML = getTime(arrData[0].sys.sunrise);
      sunset.innerHTML = getTime(arrData[0].sys.sunset);
      feels_like.innerHTML = `${arrData[0].main.feels_like.toFixed(2)}°C`;
      wind.innerHTML = `${arrData[0].wind.speed} km/h`;
      closeSearch();
    } catch (err) {
      alert("Enter the city name properly.");
    }
  }
};
const searchSubmitBtn = document.getElementById("searchSubmitBtn");
searchSubmitBtn.addEventListener("click", getInfo);
const cityName = document.getElementById("cityName");

const weekday = document.getElementById("weekday");
const date = document.getElementById("date");

const getWeekDay = () => {
  var d = new Date();
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  return weekday[d.getDay()];
};
const getCurrentDate = () => {
  var d = new Date();
  var month = new Array();
  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "Aug";
  month[8] = "Sept";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";
  var date = d.getDate();
  var year = d.getFullYear();
  return `${date} ${month[d.getMonth()]} ${year}`;
};
const getTime = (UTCtime) => {
  let unix_timestamp = UTCtime;

  var date = new Date(unix_timestamp * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var mins = date.getMinutes();

  let periods = "AM";
  if (hours > 11) {
    periods = "PM";
    if (hours > 12) hours -= 12;
  }
  if (mins < 10) {
    mins = "0" + mins;
  }

  var formattedTime = hours + " : " + mins + "  " + periods;

  return formattedTime;
};
date.innerHTML = getCurrentDate();
weekday.innerHTML = getWeekDay();
