<template>
    <section class="card">

        <div class="front">
            <div class="elixir">
                <img src="./icons/Elixir.png" alt="">
                <p class="elixir_value">{{cardData.elixir}}</p>
            </div>
            <img :src="cardData.imgSrc" alt="Карта">
            <div class="front_info">
                <h3 class="card_name">{{cardData.name}}</h3>
                <div class="front_stats">
                    <p>Редкость {{cardData.rarity}}</p>
                    <p>Тип {{cardData.type}}</p>
                </div>
            </div>
        </div>
        <div class="back">
            <div class="card_info">
                <h3 class="card_name">{{cardData.name}}</h3>
                <p>Урон {{cardData.damage}}</p>
                <p>Урон в секунду {{cardData.DPS}}</p>
                <p>Здоровье {{cardData.hitpoints}}</p>
                <p>Скорость атаки {{cardData.atackSpeed}}</p>
                <p>Дальность {{cardData.range}}</p>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "Card",
        props: {
            cardData: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>
    .card {
        border-radius: 10px;
        position: relative;
        margin: 10px;
    }

    .elixir {
        width: 30px;
        max-height: 30px;
        position: absolute;
        z-index: 100;
        top: 0;
        right: 0;
    }

    .elixir img {
        position: absolute;
        top: 0;
        left: 0;
        width: 30px;
    }

    .elixir .elixir_value {
        color: white;
        font-weight: bold;
        position: absolute;
        right: 10px;
        top: 8px;
        transition: transform 200ms;
    }

    .front {
        width: 120px;
        border-radius: 20px;
        color: #222222;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        z-index: 1;
    }

    .front_info{
        display: flex;
        flex-direction: column;
    }

    .front_stats{
        display: flex;
        justify-content: space-evenly;
    }

    .card img {
        transition: transform 200ms;
        max-width: 100%;
        height: auto;
    }


    .card h3 {
        padding: 0;
        color: #222222;
    }


    .card:hover{
        z-index: 100000
    }

    .card:hover img {
        transform: translateY(-40px);
    }

    .card:hover .front_info {
        opacity: 0;
    }

    .card:hover .elixir_value{
        transform: translateY(-40px);
    }

    .back {
        position: absolute;
        top: 0;
        left: -30px;
        width: 180px;
        background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.5));
        min-height: 220px;
        z-index: -1;
        transform: scale(0, 0);
        border-radius: 20px;
        backdrop-filter: blur(10px);
    }

    .card:hover .back {
        transition: transform 200ms;
        transform: scale(1, 1);
    }

    .card_info {
        padding: 10px;
        width: 100%;
        z-index: 1;
        position: absolute;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: space-evenly;
        color: #222222;
        font-size: 15px;
    }
</style>