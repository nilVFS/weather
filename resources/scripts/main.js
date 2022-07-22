const form = document.querySelector(".location-form");
const input = document.getElementById("location-input");
const apiKey = "0a463a5f7244f644f78aafc1611f66e9";

form.addEventListener("submit", e => {
    e.preventDefault();
    let inputVal = input.value;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric&lang=ru`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const { main, name, wind, sys, visibility } = data;
            const sunrise = new Date(sys.sunrise).toLocaleTimeString("ru");
            const metersToKm = 1000;
            const hpaToMillimeters = 0.75006;
            document.querySelector(".current-city").innerHTML = name;
            document.querySelector(".sunrise").innerHTML =  sunrise;
            document.querySelector(".visibility").innerHTML = `${visibility / metersToKm} км`;
            document.querySelector(".current-temp").innerHTML = main.temp + "˚C";
            document.querySelector(".temp-max").innerHTML = "↑ " + main.temp_max + "˚C";
            document.querySelector(".temp-min").innerHTML =  "↓ " + main.temp_min + "˚C";
            document.querySelector(".pressure").innerHTML = `${(main.pressure * hpaToMillimeters).toFixed(0)} мм рт.ст.`
            document.querySelector(".wind").innerHTML = wind.speed + "км/ч"
        })
})