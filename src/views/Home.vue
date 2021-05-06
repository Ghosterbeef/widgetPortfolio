<template>
    <section class="home">
        <h2>Домашняя</h2>
        <DateComponent></DateComponent>
        <NewsComponent></NewsComponent>
        <WeatherComponent></WeatherComponent>
        <NotificationComponent></NotificationComponent>
    </section>
</template>

<script>
    // @ is an alias to /src

    import DateComponent from "../components/HomeComponents/DateComponent";
    import NewsComponent from "../components/HomeComponents/NewsComponent";
    import WeatherComponent from "../components/HomeComponents/WeatherComponent";
    import NotificationComponent from "../components/HomeComponents/NotificationComponent";
    export default {
        name: 'Home',
        components: {NotificationComponent, WeatherComponent, NewsComponent, DateComponent},
    }
</script>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Titan+One&display=swap');

    .home {
        display: grid;
        grid-template-columns: 2fr 3fr;
        grid-template-rows: max-content max-content 1fr 2fr;
        grid-gap: 30px;
        padding: 30px;
        max-height: 70vh;
        min-height: 430px;
        transition: 0.1s;
    }

    h2 {
        grid-area: 1/1/2/3;
        color: rgba(44, 62, 80, 0.7);
    }

    .charter {;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 20px;
        background: linear-gradient(to right top, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3));
        padding: 0 0 32px 10px;
        max-height: 100%;
        min-height: 100%;
        max-width: 100%;
        min-width: 100%;
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

    h3 {
        padding: 10px 0 0 0;
        color: rgba(44, 62, 80, 0.7);
    }

    .date {
        grid-area: 2/1/2/2;
    }


    .news {
        grid-area: 4/2/5/3;
    }


    .notification {
        grid-area: 3/1/5/2;
    }


    .weather {
        grid-area: 2/2/4/3;
    }


    @media (max-width: 1200px) {
        .home {
            grid-template-columns: 1fr 1fr;
            transition: 0.1s;
        }
    }

    @media (max-width: 720px) {
        .home {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(5, minmax(max-content, 400px));
            transition: 0.1s;
            overflow-y: scroll;
            grid-column-gap: 0;
        }

        .date {
            grid-area: 2/1/2/2;
        }

        .notification {
            grid-area: 3/1/4/2;
        }

        .weather {
            grid-area: 4/1/5/2;
        }

        .news {
            grid-area: 5/1/6/2;
        }


    }
</style>
