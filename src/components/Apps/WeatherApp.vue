<template>
    <div class="weather_app-wrapper">
        <div class="alerts" v-if="dataToDraw.alerts && dataToDraw.alerts.length">
            <div class="alert_element" v-for="(alert, index) in dataToDraw.alerts" :key="index">
                <h3 v-if="alert.event">{{alert.event}}</h3>
                <h4 v-if="alert.sender_name">{{alert.sender_name}}</h4>
                <p v-if="alert.description">{{alert.description}}</p>
            </div>
        </div>
        <div class="current" v-if="dataToDraw.current">
            <input type="text" v-model="store.state.userData.weatherData.location" @change="showAllWeather">
            <p class="temp">{{dataToDraw.current.temp}}&deg;</p>
            <p class="temp_as">{{dataToDraw.current.feels_like}}&deg;</p>
            <div class="current_group">
                <img v-if="dataToDraw.current.icon" class="weatherImg"
                     :src="require(`../../assets/icons/WeatherIcons/${dataToDraw.current.icon}.svg`)"
                     alt="Текущая погода"
                     ref="weatherImg">
                <p>{{dataToDraw.current.description}}</p>
            </div>
            <div class="cloud_wiz">
                <p>Облачность:</p>
                <p>{{dataToDraw.current.clouds}}%</p>
                <p>Видимость:</p>
                <p>{{dataToDraw.current.visibility}} м</p>
            </div>
            <div class="wind_group">
                <p>Ветер:</p>
                <p>{{dataToDraw.current.wind_deg}}</p>
                <p>{{dataToDraw.current.wind_gust}} м/с</p>
                <p>{{dataToDraw.current.wind_speed}} м/с</p>
            </div>
        </div>
        <div class="wrapper daily_wrapper" v-if="dataToDraw.daily">
            <h4>Погода на ближайшие 8 дней</h4>
            <div class="daily" @wheel.prevent="scrollBlock">
                <div class="header daily_header">
                    <p>Число</p>
                    <p>Темп.(У/Д/В/Н)</p>
                    <p>Экстремумы</p>
                    <p>Ощу.(У/Д/В/Н)</p>
                    <p class="img_p">Описание</p>
                    <p>Облачность</p>
                    <p>Влажность</p>
                    <p>Вер. осадк.</p>
                    <p>Давление</p>
                    <p>УФ-индекс</p>
                    <p>Направ. ветра</p>
                    <p>Порыв ветра</p>
                    <p>Скор. ветра </p>
                </div>
                <div class="element daily_element" v-for="(element, index) in dataToDraw.daily" :key="index">
                    <p v-if="element.day>=10" class="main">{{element.day}}</p>
                    <p v-else class="main">0{{element.day}}</p>
                    <div class="group temp">
                        <p>{{element.temp.morn}}&deg;</p>
                        <p>{{element.temp.day}}&deg;</p>
                        <p>{{element.temp.eve}}&deg;</p>
                        <p>{{element.temp.night}}&deg;</p>
                    </div>
                    <div class="group min-max">
                        <p>мин:{{element.temp.min}}&deg;</p>
                        <p>макс:{{element.temp.max}}&deg;</p>
                    </div>
                    <div class="group feels_like">
                        <p>{{element.feels_like.morn}}&deg;</p>
                        <p>{{element.feels_like.day}}&deg;</p>
                        <p>{{element.feels_like.eve}}&deg;</p>
                        <p>{{element.feels_like.night}}&deg;</p>
                    </div>
                    <div class="group desc">
                        <img v-if="element.icon" class="weatherImg"
                             :src="require(`../../assets/icons/WeatherIcons/${element.icon}.svg`)" alt="Текущая погода"
                             ref="weatherImg">
                        <p>{{element.description}}</p>
                    </div>
                    <p>{{element.clouds}}%</p>
                    <p>{{element.humidity}}%</p>
                    <p>{{element.pop}}</p>
                    <p>{{element.pressure}} гПа</p>
                    <p>{{element.uvi}}</p>
                    <p>{{element.wind_deg}}</p>
                    <p>{{element.wind_gust}} м/с</p>
                    <p>{{element.wind_speed}} м/с</p>
                </div>
            </div>
        </div>
        <div class="wrapper hourly_wrapper" v-if="dataToDraw.hourly">
            <h4>Погода на ближайшие 48 часов</h4>
            <div class="hourly" @wheel.prevent="scrollBlock">
                <div class="header hourly_header">
                    <p>Час</p>
                    <p>Температура</p>
                    <p>Ощущается</p>
                    <p class="img_p">Описание</p>
                    <p>Облачность</p>
                    <p>Влажность</p>
                    <p>Вер. осадк.</p>
                    <p>Давление</p>
                    <p>УФ-индекс</p>
                    <p>Видимость</p>
                    <p>Направ. ветра</p>
                    <p>Порыв ветра</p>
                    <p>Скор. ветра </p>
                </div>
                <div class="element hourly_element" v-for="(element, index) in dataToDraw.hourly" :key="index">
                    <p v-if="element.data>=10" class="main">{{element.data}}ч</p>
                    <p v-else class="main">0{{element.data}}ч</p>
                    <p>{{element.temp}}&deg;</p>
                    <p>{{element.feels_like}}&deg;</p>
                    <div class="group desc">
                        <img v-if="element.icon" class="weatherImg"
                             :src="require(`../../assets/icons/WeatherIcons/${element.icon}.svg`)" alt="Текущая погода"
                             ref="weatherImg">
                        <p class="description">{{element.description}}</p>
                    </div>
                    <p>{{element.clouds}}%</p>
                    <p>{{element.humidity}}%</p>
                    <p>{{element.pop}}</p>
                    <p>{{element.pressure}} гПа</p>
                    <p>{{element.uvi}}</p>
                    <p>{{element.visibility}} м</p>
                    <p>{{element.wind_deg}}</p>
                    <p>{{element.wind_gust}} м/с</p>
                    <p>{{element.wind_speed}} м/с</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {useStore} from 'vuex'

    export default {
        name: "WeatherApp",
        data() {
            const store = useStore()
            return {

                store,
                weatherData: store.state.userData.weatherData,
                directions: ['Северный', 'Северо-восточный', 'Восточный',
                    'Юго-восточный', 'Южный', 'Юго-западный', 'Западный', 'Северо-западный'],
                dataToDraw: {
                    alerts: [],
                    current: {
                        clouds: null,
                        feels_like: null,
                        temp: null,
                        wind_deg: null,
                        wind_gust: null,
                        wind_speed: null,
                        visibility: null,
                        description: "",
                        icon: "",
                    },
                    daily: [],
                    hourly: []
                }
            }
        },
        mounted() {
            this.showAllWeather()
        },
        methods: {
            showAllWeather: function () {
                let scopedData = this.weatherData
                let timeOffset = this.store.state.userData.dateData.selectedTimeZone || this.store.state.userData.dateData.timeZoneOffset
                if (scopedData.oldLocation !== scopedData.location) {
                    console.log(scopedData.oldLocation)
                    console.log(scopedData.location)
                    this.getCoords()
                    setTimeout(this.showAllWeather, 300)
                    return

                }
                if (!timeOffset) {
                    timeOffset = 0
                }

                if (this.dataToDraw.daily.length || this.dataToDraw.hourly.length || this.dataToDraw.alerts.length){
                    this.dataToDraw.alerts = []
                    this.dataToDraw.daily = []
                    this.dataToDraw.hourly = []
                }

                fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${scopedData.lat}&lon=${scopedData.lon}&units=metric&appid=2a0a43cfc4acc7191c01bdc98ed07c9b&lang=ru`)
                    .then(response => response.json())
                    .then(json => {
                        console.log(json)
                        if (json.alerts && json.alerts.length) {
                            json.alerts.forEach(item => {
                                this.dataToDraw.alerts.push(item)
                            })
                        }
                        if (json.current) {
                            this.dataToDraw.current.icon = json.current.weather[0].icon
                            this.dataToDraw.current.description = json.current.weather[0].description
                            this.dataToDraw.current.visibility = json.current.visibility
                            this.dataToDraw.current.wind_speed = json.current.wind_speed
                            this.dataToDraw.current.wind_gust = json.current.wind_gust
                            this.dataToDraw.current.wind_deg = this.calculateWindDir(json.current.wind_deg)
                            this.dataToDraw.current.temp = json.current.temp
                            this.dataToDraw.current.feels_like = json.current.feels_like
                            this.dataToDraw.current.clouds = json.current.clouds
                        }
                        if (json.daily && json.daily.length) {
                            json.daily.forEach(item => {
                                this.dataToDraw.daily.push(
                                    {
                                        day: new Date(parseInt(item.dt + timeOffset)).getDate(),
                                        clouds: item.clouds,
                                        feels_like: {
                                            morn: item.feels_like.morn,
                                            day: item.feels_like.day,
                                            eve: item.feels_like.eve,
                                            night: item.feels_like.night
                                        },
                                        pop: item.pop, //Вероятноть выпадения осадков
                                        pressure: item.pressure,
                                        temp: {
                                            morn: item.temp.morn,
                                            day: item.temp.day,
                                            eve: item.temp.eve,
                                            night: item.temp.night,
                                            min: item.temp.min,
                                            max: item.temp.max
                                        },
                                        humidity: item.humidity,
                                        uvi: item.uvi,
                                        description: item.weather[0].description,
                                        icon: item.weather[0].icon,
                                        wind_deg: this.calculateWindDir(item.wind_deg),
                                        wind_gust: item.wind_gust,
                                        wind_speed: item.wind_speed
                                    }
                                )
                            })
                            console.log(this.dataToDraw.daily)
                        }
                        if (json.hourly && json.hourly.length) {
                            json.hourly.forEach(item => {

                                this.dataToDraw.hourly.push({
                                    clouds: item.clouds,
                                    data: new Date(parseInt(item.dt + timeOffset)).getHours(),
                                    feels_like: item.feels_like,
                                    humidity: item.humidity,
                                    pop: item.pop,
                                    pressure: item.pressure,
                                    temp: item.temp,
                                    uvi: item.uvi,
                                    visibility: item.visibility,
                                    description: item.weather[0].description,
                                    icon: item.weather[0].icon,
                                    wind_deg: this.calculateWindDir(item.wind_deg),
                                    wind_gust: item.wind_gust,
                                    wind_speed: item.wind_speed
                                })
                            })
                        }
                    })
            },
            getCoords: function () {
                if (!this.store.state.userData.weatherData.location) {
                    setTimeout(this.getCoords, 1000)
                    return
                }
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.store.state.userData.weatherData.location}&units=metric&appid=2a0a43cfc4acc7191c01bdc98ed07c9b&lang=ru`)
                    .then(result => result.json())
                    .then(
                        json => {
                            this.store.state.userData.weatherData.lon = json.coord.lon
                            this.store.state.userData.weatherData.lat = json.coord.lat
                            this.store.state.userData.weatherData.oldLocation = this.store.state.userData.weatherData.location
                        }
                    )
            },
            calculateWindDir: function (value) {
                let degrees = value * 8 / 360
                degrees = Math.round(degrees, 0)
                degrees = (degrees + 8) % 8
                return this.directions[degrees]
            },
            scrollBlock: function (e) {
                let target
                if (!e.target.classList.contains("hourly") && !e.target.classList.contains("daily"))
                    target = e.target.closest(".hourly") || e.target.closest(".daily")
                else target = e.target
                let scroled = 0
                const internal = setInterval(function () {
                    target.scrollLeft -= (e.wheelDelta / 60)
                    scroled += Math.abs(e.wheelDelta / 60)
                    if (Math.abs(e.wheelDelta / 2) <= scroled)
                        clearInterval(internal)
                }, 1)

            }
        }
    }
</script>

<style scoped>
    .weather_app-wrapper {
        width: 100%;
        height: 100%;
        max-height: 100%;
        max-width: 100%;
        overflow-y: auto;
        display: grid;
        grid-column-gap: 10px;
        grid-template-columns: 1fr 1fr;
        justify-content: space-evenly;
        grid-template-rows: 1fr 2fr 2fr;
        padding: 20px;
    }

    .alerts {
        border: 1px solid white;
        min-width: 300px;
        display: flex;
        flex-direction: column;
        background: linear-gradient(to right top, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3));
        border-radius: 5px;
        padding: 5px;
        overflow-y: auto;
    }

    .alert_element {
        padding: 5px;
        margin: 5px;
        border-radius: 5px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        background: linear-gradient(to right top, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3));
    }

    .alert_element h3 {
        padding: 10px;
    }

    .alert_element p {
        text-align: justify;
    }

    .alert_element p:first-letter {
        text-transform: uppercase;
    }

    .current {
        min-width: max-content;
        width: 100%;
        display: grid;
        grid-row-gap: 5px;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: max-content max-content max-content max-content;
        border-radius: 5px;
        justify-items: center;
        border: 1px solid white;
        padding: 5px 0;
        background: linear-gradient(to right top, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3));
    }

    .current input {
        grid-area: 1/1/2/3;
        max-width: 300px;
        border: 1px solid white;
        padding: 5px;
        border-radius: 5px;
        background: linear-gradient(to right top, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3));
        font-weight: bolder;
        text-align: center;
        text-transform: uppercase;
    }

    .current .temp {
        grid-area: 2/1/3/3;
        width: 100%;
        font-size: 20px;
    }

    .current .temp_as {
        grid-area: 3/1/4/3;
        width: 100%;
        font-size: 15px;
    }

    .current_group {
        grid-area: 4/1/5/3;
        width: 80%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }

    .current_group img {
        width: 60px;
        height: 60px;
    }

    .current_group p {
        width: max-content;
        max-width: 100px;
        text-align: left;
    }

    .current_group p:first-letter{
        text-transform: uppercase;
    }

    .cloud_wiz {
        grid-area: 5/1/6/3;
        display: flex;
        width: 100%;
        justify-content: space-evenly;
    }

    .current .wind_group {
        grid-area: 6/1/7/3;
        display: flex;
        width: 100%;
        justify-content: space-evenly;
    }

    .header {
        position: sticky;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        padding: 5px 0;
        width: max-content;
        z-index: 20;
        background: linear-gradient(to right top, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3));
        backdrop-filter: blur(10px);
        border-radius: 5px;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }

    .daily_wrapper {
        grid-area: 2/1/3/3;
    }

    .hourly_wrapper {
        grid-area: 3/1/4/3;
    }

    .current {
        grid-area: 1/1/2/2;
    }

    .alerts {
        grid-area: 1/2/2/3;
    }


    .daily {
        max-width: 100%;
        height: max-content;
        display: flex;
        overflow-x: auto;
        overflow-y: hidden;
        padding-bottom: 5px;
    }

    .group {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    .desc {
        justify-content: center;
        align-items: center;
    }

    .desc p {
        margin-left: 20px;
        width: max-content;
        text-align: left;
    }

    .desc img {
        margin-left: 10px;
        width: 40px;
        height: 40px;
    }

    .hourly {
        max-width: 100%;
        height: max-content;
        display: flex;
        overflow-x: auto;
        overflow-y: hidden;
        padding-bottom: 5px;
    }

    .element {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        margin: 0 5px;
        padding: 5px;
        border: 1px solid white;
        background: linear-gradient(to right top, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3));
        min-height: 100%;
        min-width: 205px;
        border-radius: 5px;
    }

    /*.header p::after {*/
    /*    position: absolute;*/
    /*    display: inline-block;*/
    /*    content: " ";*/
    /*    width: 100%;*/
    /*    border-bottom: 1px solid rgba(34, 34, 34, 0.7);*/
    /*    left: 0;*/
    /*    bottom: 0;*/
    /*}*/

    p {
        font-size: 15px;
        font-weight: bold;
        text-align: center;
        width: max-content;
        padding: 1px 0;
    }

    .header p {
        min-width: max-content;
        width: 100%;
        padding: 1px 5px;
    }


    .img_p {
        height: 40px;
        line-height: 40px;
    }

    .desc p:first-letter {
        text-transform: uppercase;
    }

    p.main {
        font-weight: bolder;
        color: black;
        background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.5));
        width: 100%;
    }

    img {
        width: 30px;
        height: 30px;
    }

    @media (max-width: 920px) {
        .weather_app-wrapper {
            grid-column-gap: 0;
            grid-template-columns: 1fr;
            grid-row-gap: 20px;
            grid-template-rows: minmax(max-content, 300px) minmax(170px, max-content) 2fr 2fr;
        }


        .current {
            grid-area: 1/1/2/2;
        }

        .alerts {
            grid-area: 2/1/3/2;
        }

        .daily_wrapper {
            grid-area: 3/1/4/2;
        }

        .hourly_wrapper {
            grid-area: 4/1/5/2;
        }

        .wrapper {
            width: 1px;
            min-width: 100%;
        }

        .daily {
        }

        .hourly {
        }

    }

</style>