<template>
    <section class="charter weather">
        <h3>Погода</h3>
        <div id="weather_body" class="weather_body">
            <h4 class="cityName" ref="cityName"></h4>
            <img class="weatherImg" src="" alt="Текущая погода" ref="weatherImg">
            <p class="description" ref="description"></p>
            <div class="temperature">
                <p class="temp" ref="temp"></p>
                <p class="feelsLike" ref="feelsLike"></p>
            </div>
            <div class="wind">
                <p class="windSpeed" ref="windSpeed"></p>
                <p class="windDir" ref="windDir"></p>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "WeatherComponent",
        data() {
            return {
                directions: ['Северный', 'Северо-восточный', 'Восточный',
                    'Юго-восточный', 'Южный', 'Юго-западный', 'Западный', 'Северо-западный'],
            }
        },
        mounted() {
            fetch("http://www.geoplugin.net/json.gp")
                .then(response => response.json())
                .then(json => {
                    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${json.geoplugin_city}&units=metric&appid=2a0a43cfc4acc7191c01bdc98ed07c9b&lang=ru`)
                        .then(response => response.json())
                        .then(json => {
                            this.$refs.weatherImg.src = require(`../../assets/icons/WeatherIcons/${json.weather[0].icon}.svg`)
                            this.$refs.cityName.textContent = json.name
                            this.$refs.description.textContent = json.weather[0].description
                            this.$refs.temp.innerHTML = 'Температура ' + json.main.temp + '&deg;'
                            this.$refs.feelsLike.innerHTML = 'Ощущается как ' + json.main.feels_like + '&deg;'
                            this.$refs.windSpeed.textContent = 'Скорость ветра ' + json.wind.speed + " м/с"
                            let degrees = json.wind.deg * 8 / 360
                            degrees = Math.round(degrees, 0)
                            degrees = (degrees + 8) % 8
                            this.$refs.windDir.textContent = "Направление ветра "+this.directions[degrees]
                        })
                })
        },
    }
</script>

<style scoped>
    .weather_body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        max-width: 100%;
        min-width: 100%;
        min-height: 100%;
        max-height: 100%;
        color: rgba(44, 62, 80, 0.7);
        font-weight: bold;
    }

    .cityName {
        font-size: 1.1rem;
    }

    .description:first-letter {
        text-transform: uppercase;
    }

    .temperature{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    .temp {
        width: 170px;
    }

    .feelsLike{
        width: 170px;
    }


    .weatherImg {
        width: 100px;
        height: 100px;
    }

    .wind {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    .windSpeed{
        width: 155px;
    }

    .windDir{
        width: 155px;
    }
</style>