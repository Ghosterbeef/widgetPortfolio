<template>
    <Preloader v-if="preloader"></Preloader>
    <bubbles></bubbles>
    <DevelopmentOnly></DevelopmentOnly>
    <main>
        <router-view/>
        <nav>
            <router-link to="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <title>Домашняя</title>
                    <path d="M32 18.451l-16-12.42-16 12.42v-5.064l16-12.42 16 12.42zM28 18v12h-8v-8h-8v8h-8v-12l12-9z"></path>
                </svg>
            </router-link>
            <router-link to="/Apps">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <title>Приложения</title>
                    <path d="M15.984 20.016v-4.031h4.031v4.031h-4.031zM15.984 14.016v-4.031h4.031v4.031h-4.031zM9.984 8.016v-4.031h4.031v4.031h-4.031zM15.984 3.984h4.031v4.031h-4.031v-4.031zM9.984 14.016v-4.031h4.031v4.031h-4.031zM3.984 14.016v-4.031h4.031v4.031h-4.031zM3.984 20.016v-4.031h4.031v4.031h-4.031zM9.984 20.016v-4.031h4.031v4.031h-4.031zM3.984 8.016v-4.031h4.031v4.031h-4.031z"></path>
                </svg>
            </router-link>
            <router-link to="/Settings">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <title>Настройки</title>
                    <path d="M29.181 19.070c-1.679-2.908-0.669-6.634 2.255-8.328l-3.145-5.447c-0.898 0.527-1.943 0.829-3.058 0.829-3.361 0-6.085-2.742-6.085-6.125h-6.289c0.008 1.044-0.252 2.103-0.811 3.070-1.679 2.908-5.411 3.897-8.339 2.211l-3.144 5.447c0.905 0.515 1.689 1.268 2.246 2.234 1.676 2.903 0.672 6.623-2.241 8.319l3.145 5.447c0.895-0.522 1.935-0.82 3.044-0.82 3.35 0 6.067 2.725 6.084 6.092h6.289c-0.003-1.034 0.259-2.080 0.811-3.038 1.676-2.903 5.399-3.894 8.325-2.219l3.145-5.447c-0.899-0.515-1.678-1.266-2.232-2.226zM16 22.479c-3.578 0-6.479-2.901-6.479-6.479s2.901-6.479 6.479-6.479c3.578 0 6.479 2.901 6.479 6.479s-2.901 6.479-6.479 6.479z"></path>
                </svg>
            </router-link>
        </nav>
    </main>
    <Footer></Footer>
</template>


<script>
    import Preloader from "./components/Preloader";
    import DevelopmentOnly from "./components/DevelopmentOnly";
    import Bubbles from "./components/bubbles";
    import Footer from "./components/Footer";
    import {useStore} from 'vuex'

    export default {
        name: "app",
        components: {
            Preloader,
            Footer,
            Bubbles,
            DevelopmentOnly
        },
        data() {
            const app = document.querySelector("#app")
            return {
                preloader: true,
                app,
                store: useStore()
            }
        },
        beforeMount() {
            //vuex init
            let useIpLocation = this.getCookie("userUseIpLocation")
            let location = this.getCookie("userIPLocation")
            let userSelectedLocation = this.getCookie("userSelectedLocation")
            let timeZoneOffset = this.getCookie("userTimeZoneOffset")
            let selectedTimeZoneOffset = this.getCookie("userSelectedTimeZoneOffset")
            let AmPmFormat = this.getCookie("userSelectedAmPmFormat")
            let weatherUpdateTiming = this.getCookie('userWeatherUpdateTiming')

            if (weatherUpdateTiming === undefined || !weatherUpdateTiming) {
                weatherUpdateTiming = 30
            }

            if (AmPmFormat === undefined || AmPmFormat === "false" || AmPmFormat===null) {
                AmPmFormat = false
            } else {
                AmPmFormat = true
            }

            if (timeZoneOffset === undefined || timeZoneOffset === null) {
                timeZoneOffset = new Date().getTimezoneOffset() * (-1)
                document.cookie = `userTimeZoneOffset=${timeZoneOffset}; max-age=2592000000`
            }

            if (selectedTimeZoneOffset === undefined || selectedTimeZoneOffset === null) {
                selectedTimeZoneOffset = timeZoneOffset
            }

            if (useIpLocation === undefined || useIpLocation === "false" || useIpLocation===null) {
                useIpLocation = false
            } else {
                useIpLocation = true
            }


            if (useIpLocation) {
                fetch("https://api.ipgeolocation.io/ipgeo?apiKey=9a6726603499432885466ac4ffb606b4")
                    .then(response => response.json())
                    .then(json => {
                        location = json.district.split("'").join('')
                        document.cookie = `userIPLocation=${location}`
                        this.store.state.userData.weatherData.location = location
                    })
                    .catch(error => {
                        this.store.state.commit('addNotification', {
                            id: new Date().getTime(),
                            appName: "Определение местоположения",
                            content: error,
                            options: {},
                            deletable: true
                        })
                    })
            } else {
                if (!location)
                    fetch("https://api.ipgeolocation.io/ipgeo?apiKey=9a6726603499432885466ac4ffb606b4")
                        .then(response => response.json())
                        .then(json => {
                            location = json.district.split("'").join('')
                            document.cookie = `userIPLocation=${location}; max-age=2592000000`
                        })
                        .then(() => {
                            if (!userSelectedLocation) {
                                this.store.state.userData.weatherData.location = location
                            }
                            else {
                                this.store.state.userData.weatherData.location = userSelectedLocation
                                this.store.state.userData.weatherData.userSelectedLocation = userSelectedLocation
                            }
                        })
                        .catch(error => {
                            this.store.state.commit('addNotification', {
                                id: new Date().getTime(),
                                appName: "Определение местоположения",
                                content: error,
                                options: {},
                                deletable: true
                            })
                        })
                else {
                    if (!userSelectedLocation)
                        this.store.state.userData.weatherData.location = location
                    else {
                        this.store.state.userData.weatherData.location = userSelectedLocation
                        this.store.state.userData.weatherData.userSelectedLocation = userSelectedLocation
                    }
                }
            }
            this.store.state.userData.dateData.timeZoneOffset = timeZoneOffset
            this.store.state.userData.dateData.selectedTimeZone = selectedTimeZoneOffset
            this.store.state.userData.dateData.AmPmType = AmPmFormat
            this.store.state.userData.weatherData.weatherUpdateTiming = weatherUpdateTiming
            this.store.state.userData.weatherData.useIpLocation = useIpLocation
        },
        mounted() {
            //DevelopmentOnly
            const devCtx = this
            setTimeout(function () {
                devCtx.store.commit("addNotification", {
                    id: 1,
                    appName: "Ghosterbeef",
                    content: "Приложение находится в разработке. Вы не сможете убрать это уведомление.",
                    options: {},
                    deletable: false
                })
            }, 1000)
            setTimeout(function () {
                devCtx.store.commit("addNotification", {
                    id: 200,
                    appName: "Ghosterbeef",
                    content: "Просто смахните это уведомление=) Это уведомление для теста переполнения контейнера текстом",
                    options: {},
                    deletable: true
                })
            }, 3000)
            //DevelopmentOnly

            let ctx = this
            window.addEventListener("load", function () {
                setTimeout(function () {
                    ctx.preloader = false
                }, 2000)
            })

            let rotateTo = 60
            setInterval(function () {
                rotateTo += 0.2
                if (rotateTo === 420)
                    rotateTo = 60
                ctx.app.style.background = `linear-gradient(${rotateTo}deg, rgba(63,94,251,1) 0%, rgba(77,171,199,1) 50%, rgba(252,70,107,1) 100%)`
            }, 16)
        },
        methods: {
            getCookie: function (cookie_name) {
                let results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
                if (results)
                    return (unescape(results[2]));
                else
                    return null;
            }
        }
    }
</script>


<style>
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        z-index: 10;
        position: relative;
    }

    html {
        width: 100vw;
        height: 100%;
    }

    body {
        width: 100vw;
        height: 100%;
        overflow-x: hidden;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        min-width: 100vw;
        min-height: 100%;
        background: linear-gradient(60deg, rgba(63, 94, 251, 1) 0%, rgba(77, 171, 199, 1) 50%, rgba(252, 70, 107, 1) 100%);
        overflow-x: hidden;
        display: grid;
        grid-template-rows: max-content 1fr;
        align-items: center;
        justify-items: center;
    }


    main {
        min-width: 300px;
        width: 80vw;
        max-width: 1400px;
        grid-row: 2/3;
        background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4));
        min-height: 500px;
        height: 70vh;
        max-height: 70vh;
        border-radius: 40px;
        backdrop-filter: blur(20px);
        display: grid;
        grid-template-columns: 1fr max-content;
        grid-template-rows: 1fr;
        overflow: hidden;
    }

    nav {
        grid-column: 2/3;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4));
        padding: 0 20px;
    }

    nav a {
        fill: #2c3e50;
    }

    nav a.router-link-exact-active {
        fill: cornflowerblue;
    }

    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 100px;
        background: linear-gradient(to right top, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3));
    }

    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(to right top, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
    }

    @media (max-width: 720px) {
        main {
            width: 100vw;
            min-height: 100%;
            border-radius: 0;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr max-content;
        }

        nav {
            grid-column: 1/2;
            grid-row: 2/3;
            padding: 7px 0;
            flex-direction: row;
        }

        nav svg {
            height: 25px;
            width: 25px;
        }
    }

</style>
