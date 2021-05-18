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
                    },
                    {
                        name: "Хэш-таблица",
                        icon: require("../Apps/HashTableVisualApp/icons/table.svg"),
                        ref: "/Apps/HashTableApp"
                    }
                ]
            }
        }
    }
</script>

<style scoped>

    .apps_home{
        min-width: 100%;
        display: grid;
        grid-template-rows: max-content 1fr;
        grid-template-columns: repeat(6, 1fr);
        grid-gap: 30px;
        padding: 30px;
        max-height: 100%;
        min-height: 430px;
        transition: 0.1s;
    }

    h2{
        grid-column: 1/7;
    }

    .icon{
        margin: 30px;
        padding: 1px;
        border-radius: 5px;
        border: 1px solid white;
        background: linear-gradient(to right top, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3));
        cursor: pointer;
        height: 50px;
        min-height: 50px;
        width: 50px;
        min-width: 50px;
        position: relative;
    }

    .icon img{
        width: 100%;
        height: auto;
    }

    .icon p{
        width: 100px;
        position: absolute;
        left: -25px;
        color: #222222;
    }
</style>