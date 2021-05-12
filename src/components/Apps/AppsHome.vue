<template>
    <div class="apps_home">
        <h2>Приложения</h2>
    <div class="icon" v-for="apps in userApps" :key="apps.name" @click="$router.push({path: apps.ref})">
        <img :src="apps.icon" alt="Иконка">
        <p>{{apps.name}}</p>
    </div>
    </div>
</template>

<script>
    export default {
        name: "AppsHome",
        data(){
            return{
                userApps:[
                    {
                        name: "Погода",
                        icon: require("../../assets/icons/AppsIcons/WeatherAppIcon.svg"),
                        ref: "/Apps/WeatherApp"
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .apps_home{
        display: grid;
        grid-template-rows: max-content 1fr;
        grid-gap: 30px;
        padding: 30px;
        max-height: 100%;
        min-height: 430px;
        transition: 0.1s;
    }
    .icon{
        padding: 1px;
        border-radius: 5px;
        border: 1px solid white;
        background: linear-gradient(to right top, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3));
        cursor: pointer;
        max-height: 50px;
        max-width: 50px;
    }

    .icon img{
        width: 100%;
        height: auto;
    }

    .icon p{
        position: absolute;
        left: 0;
        color: #222222;
    }
</style>