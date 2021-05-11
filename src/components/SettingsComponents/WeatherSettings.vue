<template>
    <section class="settings_charter weather_settings">
        <h3>Погода</h3>
        <div class="weather_settings_body">
            <label for="user_city-input">Введите город по умолчанию</label>
            <input
                    v-if="store"
                    id="user_city-input"
                    class="user_city-input"
                    name="user_city-input"
                    type="text"
                    @change="saveUserCity"
                    v-model="store.state.userData.weatherData.userSelectedLocation">
            <h4 class="auto_update_timing-title">Установите время автообновления погоды (мин)</h4>
            <div class="slider_wrapper">
                <slider
                        id="auto_update_timing"
                        v-if="store"
                        v-model="store.state.userData.weatherData.weatherUpdateTiming"
                        :min="10"
                        :max="120"
                        @change="saveTiming">
                </slider>
            </div>
            <div class="toggle_wrapper">
                <div class="icon_wrapper" @mouseover="displayIpPopup=true" @mouseleave="displayIpPopup=false">
                    <svg class="info_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                        <path d="M14 9.5c0-0.825 0.675-1.5 1.5-1.5h1c0.825 0 1.5 0.675 1.5 1.5v1c0 0.825-0.675 1.5-1.5 1.5h-1c-0.825 0-1.5-0.675-1.5-1.5v-1z"></path>
                        <path d="M20 24h-8v-2h2v-6h-2v-2h6v8h2z"></path>
                        <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z"></path>
                    </svg>
                    <div class="popup" v-show="displayIpPopup">
                        <p>Включение данной опции позволит приложению определять ваше местоположение по ip. Используйте эту опцию, если часто путешествуете.</p>
                    </div>
                </div>
                <h4 class="use_ip_location_title">Включить автоопределениe города</h4>
                <Toggle id="use_ip_location_toggle" v-model="store.state.userData.weatherData.useIpLocation"
                        on-label="Вкл"
                        off-label="Выкл" :width="60" @change="saveUseIpLocation"></Toggle>
            </div>
        </div>
    </section>
</template>

<script>
    import {useStore} from 'vuex'
    import Slider from '@vueform/slider'
    import Toggle from '@vueform/toggle'
    import '@vueform/toggle/themes/default.css'


    export default {
        name: "WeatherSettings",
        components: {
            Slider,
            Toggle
        },
        data() {
            const store = useStore()
            return {
                store,
                value: 20,
                displayIpPopup: false
            }
        },
        methods: {
            saveUserCity: function (e) {
                document.cookie = `userSelectedLocation=${e.target.value}; max-age=2592000000`
                this.store.state.userData.weatherData.location = e.target.value
            },
            saveTiming: function (value) {
                document.cookie = `userWeatherUpdateTiming=${value}; max-age=2592000000`
            },
            saveUseIpLocation: function (value) {
                document.cookie = `userUseIpLocation=${value}; max-age=2592000000`
                this.store.state.userData.weatherData.useIpLocation = value
            }
        }
    }
</script>

<style src="@vueform/slider/themes/default.css"></style>

<style>
    .icon_wrapper{
        z-index: 999;
        position: absolute;
        top: 10px;
        right: -10px;
    }

    .popup{
        top: 20px;
        left:-285px;
        background:linear-gradient(to right top, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.7));
        width: 300px;
        position: absolute;
        padding: 5px;
        border-radius: 5px;
        text-align: justify;
        color: #222222;
        font-size: 15px;
    }

    .info_icon {
        fill: rgba(44, 62, 80, 0.7);
        width: 20px;
        height: 20px;
    }

    .weather_settings_body {
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        user-select: none;
        padding: 10px 30px;
    }


    label[for="user_city-input"] {
        text-align: left;
        width: 100%;
        max-width: 300px;
        font-weight: bold;
        color: rgba(44, 62, 80, 0.7);
    }

    .user_city-input {
        padding-left: 20px;
        color: black;
        font-size: 16px;
        width: 100%;
        max-width: 300px;
        border-radius: 3px;
        background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4));
        border: 1px solid #e7e7e7;
        height: 40px;
        outline-color: rgba(85, 85, 85, 0.5);
    }

    .auto_update_timing-title {
        text-align: left;
        width: 100%;
        max-width: 300px;
        font-weight: bold;
        color: rgba(44, 62, 80, 0.7);
    }

    .toggle_wrapper {
        display: flex;
        flex-wrap: wrap;
        height: 50px;
        width: 100%;
        max-width: 300px;
    }

    .slider_wrapper {
        margin-top: 20px;
        display: block;
        width: 100%;
        max-width: 300px;
    }

    .use_ip_location_title {
        text-align: left;
        width: 100%;
        max-width: 300px;
        font-weight: bold;
        color: rgba(44, 62, 80, 0.7);
    }

    .slider-connect,
    .slider-base {
        background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4));
    }

    .slider-handle {
        opacity: 0.9;
        cursor: pointer;
    }

    .slider-handle:hover {
        background: #41b883;
    }

    .slider-base, .slider-connects {
        height: 4px;
        border-radius: 5px;
    }

</style>