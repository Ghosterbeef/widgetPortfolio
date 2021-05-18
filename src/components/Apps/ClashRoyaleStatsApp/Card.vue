<template>
    <section class="card">
        <div class="elixir">
            <img src="./icons/Elixir.png" alt="">
            <p>{{cardData.elixir}}</p>
        </div>

        <div class="front">
            <img :src="cardData.imgSrc" alt="Карта">
            <h3 class="card_name">{{cardData.name}}</h3>
        </div>
        <div class="back">
            <div class="card_info">
                <h3 class="card_name">{{cardData.name}}</h3>
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
    .card{
        position: relative;
    }

    .elixir{
        width: 30px;
        max-height: 30px;
        position: absolute;
        z-index: 100;
        right: 0;
    }

    .elixir img{
        position: absolute;
        top: 0;
        left: 0;
        width: 30px;
    }

    .elixir p{
        color: white;
        font-weight: bold;
        position: absolute;
        top: 6px;
        left: 11px
    }

    .front{
        width: 120px;
        border-radius: 20px;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        z-index: 1;
    }

    .card img{
        transition: transform 200ms;
        max-width: 100%;
        height: auto;
    }


    .card h3{
        padding: 0;
        color: white;
    }


    .card:hover img{
        transform: translateY(-40px);
    }

    .card:hover .front h3{
        opacity: 0;
    }

    .back{
        position: absolute;
        top:0;
        left: -30px;
        width: 180px;
        background-color: #333333;
        min-height: 200px;
        z-index: -1;
        transform: scale(0, 0);
        border-radius: 20px;
    }

    .card:hover .back{
        transition: transform 200ms;
        transform: scale(1,1);
    }

    .card_info{
        width: 100%;
        z-index: 1;
        position: absolute;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }
</style>