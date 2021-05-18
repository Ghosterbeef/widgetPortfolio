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
                <p>Редкость</p>
                <p>Тип</p>
            </div>
        </div>
        <div class="back">
            <div class="card_info">
                <h3 class="card_name">{{cardData.name}}</h3>
                <p>Урон</p>
                <p>Урон в секунду</p>
                <p>Здоровье</p>
                <p>Скорость атаки</p>
                <p>Цель</p>
                <p>Скорость</p>
                <p>Дальность</p>
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
        position: relative;
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
    }

    .front {
        width: 120px;
        border-radius: 20px;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        z-index: 1;
    }

    .card img {
        transition: transform 200ms;
        max-width: 100%;
        height: auto;
    }


    .card h3 {
        padding: 0;
        color: white;
    }


    .card:hover img {
        transform: translateY(-40px);
    }

    .card:hover .front_info {
        opacity: 0;
    }

    .back {
        position: absolute;
        top: 0;
        left: -30px;
        width: 180px;
        background-color: #333333;
        min-height: 200px;
        z-index: -1;
        transform: scale(0, 0);
        border-radius: 20px;
    }

    .card:hover .back {
        transition: transform 200ms;
        transform: scale(1, 1);
    }

    .card_info {
        width: 100%;
        z-index: 1;
        position: absolute;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        color: white;
    }
</style>