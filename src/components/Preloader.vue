<template>
    <div class="preloaderWrapper">
        <div class="box">G</div>
        <div class="box">H</div>
        <div class="box">O</div>
        <div class="box">S</div>
        <div class="box">T</div>
        <div class="box">E</div>
        <div class="box">R</div>
        <div class="box">B</div>
        <div class="box">E</div>
        <div class="box">E</div>
        <div class="box">F</div>
    </div>
</template>

<script>
    export default {
        name: "Preloader"
    }
</script>

<style scoped>
    .preloaderWrapper{
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9000;
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100%;
        background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.5));
        backdrop-filter: blur(20px);
        user-select: none;
    }

    .box{
        position:absolute;
        width: 30px;
        height: 30px;
        background-color: rgba(255, 255, 255, 0.6);
        font-weight: bold;
        border: 2px solid #222222;
        box-shadow: 0 0 5px 5px white;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5%;
        opacity:0;
        animation:move 2s linear infinite;
        -o-animation:move 2s linear infinite;
        -moz-animation:move 2s linear infinite;
        -webkit-animation:move 2s linear infinite;
        transform:rotate(180deg);
        -o-transform:rotate(180deg);
        -moz-transform:rotate(180deg);
        -webkit-transform:rotate(180deg);
        color:black;
    }

    .box:nth-child(2) {
        animation-delay:0.2s;
        -o-animation-delay:0.2s;
        -moz-animation-delay:0.2s;
        -webkit-animation-delay:0.2s;
    }
    .box:nth-child(3) {
        animation-delay:0.4s;
        -o-animation-delay:0.4s;
        -moz-animation-delay:0.4s;
        -webkit-animation-delay:0.4s;
    }
    .box:nth-child(4) {
        animation-delay:0.6s;
        -o-animation-delay:0.6s;
        -moz-animation-delay:0.6s;
        -webkit-animation-delay:0.6s;
    }
    .box:nth-child(5) {
        animation-delay:0.8s;
        -o-animation-delay:0.8s;
        -moz-animation-delay:0.8s;
        -webkit-animation-delay:0.8s;
    }
    .box:nth-child(6) {
        animation-delay:1s;
        -o-animation-delay:1s;
        -moz-animation-delay:1s;
        -webkit-animation-delay:1s;
    }
    .box:nth-child(7) {
        animation-delay:1.2s;
        -o-animation-delay:1.2s;
        -moz-animation-delay:1.2s;
        -webkit-animation-delay:1.2s;
    }

    .box:nth-child(8) {
        animation-delay:1.4s;
        -o-animation-delay:1.4s;
        -moz-animation-delay:1.4s;
        -webkit-animation-delay:1.4s;
    }

    .box:nth-child(9) {
        animation-delay:1.6s;
        -o-animation-delay:1.6s;
        -moz-animation-delay:1.6s;
        -webkit-animation-delay:1.6s;
    }

    .box:nth-child(10) {
        animation-delay:1.8s;
        -o-animation-delay:1.8s;
        -moz-animation-delay:1.8s;
        -webkit-animation-delay:1.8s;
    }

    .box:nth-child(11) {
        animation-delay:2s;
        -o-animation-delay:2s;
        -moz-animation-delay:2s;
        -webkit-animation-delay:2s;
    }

    @keyframes move {
        0% {
            top: 30%;
            left:100%;

            opacity:0;
        }
        35% {
            left:59%;
            top: 49%;
            -moz-transform:rotate(0deg);
            -webkit-transform:rotate(0deg);
            -o-transform:rotate(0deg);
            transform:rotate(0deg);
            opacity:1;
        }
        65% {
            left: 41%;
            top: 49%;
            -moz-transform:rotate(0deg);
            -webkit-transform:rotate(0deg);
            -o-transform:rotate(0deg);
            transform:rotate(0deg);
            opacity:1;
        }
        100% {
            left:0;
            top: 30%;
            -moz-transform:rotate(-180deg);
            -webkit-transform:rotate(-180deg);
            -o-transform:rotate(-180deg);
            transform:rotate(-180deg);
            opacity:0;
        }
    }

    @-moz-keyframes move {
        0% {
            left:0;
            opacity:0;
        }
        35% {
            left:41%;
            -moz-transform:rotate(0deg);
            transform:rotate(0deg);
            opacity:1;
        }
        65% {
            left:59%;
            -moz-transform:rotate(0deg);
            transform:rotate(0deg);
            opacity:1;
        }
        100% {
            left:100%;
            -moz-transform:rotate(-180deg);
            transform:rotate(-180deg);
            opacity:0;
        }
    }

    @-webkit-keyframes move {
        0% {
            left:0;
            opacity:0;
        }
        35% {
            left:41%;
            -webkit-transform:rotate(0deg);
            transform:rotate(0deg);
            opacity:1;
        }
        65% {
            left:59%;
            -webkit-transform:rotate(0deg);
            transform:rotate(0deg);
            opacity:1;
        }
        100% {
            left:100%;
            -webkit-transform:rotate(-180deg);
            transform:rotate(-180deg);
            opacity:0;
        }
    }

    @-o-keyframes move {
        0% {
            left:0;
            opacity:0;
        }
        35% {
            left:41%;
            -o-transform:rotate(0deg);
            transform:rotate(0deg);
            opacity:1;
        }
        65% {
            left:59%;
            -o-transform:rotate(0deg);
            transform:rotate(0deg);
            opacity:1;
        }
        100% {
            left:100%;
            -o-transform:rotate(-180deg);
            transform:rotate(-180deg);
            opacity:0;
        }
    }

</style>