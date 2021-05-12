<template>
        <section class="charter weather" @click="this.$router.push({path:'/Apps/WeatherApp'})">
            <h3>Погода</h3>
            <div id="weather_body" class="weather_body">
                <input type="text" class="cityName" ref="cityName" v-model="store.state.userData.weatherData.location"
                       @change="updateWeather">
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
    import {useStore} from 'vuex'

    export default {
        name: "WeatherComponent",
        data() {
            const store = useStore()
            return {
                store,
                directions: ['Северный', 'Северо-восточный', 'Восточный',
                    'Юго-восточный', 'Южный', 'Юго-западный', 'Западный', 'Северо-западный'],
                weatherUpdateInterval: null
            }
        },
        mounted() {
            this.updateWeather()
            this.weatherUpdateInterval = setInterval(this.updateWeather, this.store.state.userData.weatherData.weatherUpdateTiming * 60 * 1000)
        },
        methods: {
            updateWeather: function () {
                if (!this.store.state.userData.weatherData.location) {
                    setTimeout(this.updateWeather, 1000)
                    return
                }
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.store.state.userData.weatherData.location}&units=metric&appid=2a0a43cfc4acc7191c01bdc98ed07c9b&lang=ru`)
                    .then(response => response.json())
                    .then(json => {
                        //Сохраняем координаты города в хранилище
                        this.store.state.userData.weatherData.lon = json.coord.lon
                        this.store.state.userData.weatherData.lat = json.coord.lat
                        //
                        this.$refs.weatherImg.src = require(`../../assets/icons/WeatherIcons/${json.weather[0].icon}.svg`)
                        this.$refs.description.textContent = json.weather[0].description
                        this.$refs.temp.innerHTML = 'Температура ' + json.main.temp + '&deg;'
                        this.$refs.feelsLike.innerHTML = 'Ощущается как ' + json.main.feels_like + '&deg;'
                        this.$refs.windSpeed.textContent = 'Скорость ветра ' + json.wind.speed + " м/с"
                        let degrees = json.wind.deg * 8 / 360
                        degrees = Math.round(degrees, 0)
                        degrees = (degrees + 8) % 8
                        this.$refs.windDir.textContent = "Направление ветра " + this.directions[degrees]
                    })
                    .catch((error) => {
                        console.log("error")
                        this.store.commit('addNotification', {
                            id: new Date().getTime(),
                            appName: "Виджет погоды",
                            content: error,
                            options: {},
                            deletable: true
                        })
                        setTimeout(this.updateWeather, 30000)
                    })
            },
        },
        beforeUnmount() {
            clearInterval(this.weatherUpdateInterval)
        }
    }
</script>

<style>
    .weather_body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        min-height: 100%;
        max-width: 100%;
        color: rgba(44, 62, 80, 0.7);
        font-weight: bold;
    }

    .cityName {
        max-width: 80%;
        padding-left: 10px;
        border: 1px solid white;
        background: transparent;
        border-radius: 5px;
        color: rgba(44, 62, 80, 0.7);
        text-align: center;
        font-size: 1.1rem;
        outline-color: white;
    }

    .description:first-letter {
        text-transform: uppercase;
    }

    .temperature {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    .temp {
        width: 170px;
    }

    .feelsLike {
        width: 170px;
    }


    .weatherImg {
        width: 35%;
        height: 35%;
    }

    .wind {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    .windSpeed {
        width: 155px;
    }

    .windDir {
        width: 155px;
    }


    @media (max-width: 720px) {
        .weather_body {
            font-size: 14px;
        }
    }
</style>