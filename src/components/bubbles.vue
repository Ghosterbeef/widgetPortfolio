<template>
    <div id="bubble_wrapper" class="bubble_wrapper">
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
    </div>
</template>

<script>
    let wrapper
    export default {
        name: "bubbles",
        mounted() {
            document.body.addEventListener("mousemove",this.onMousemove)
            wrapper = document.getElementById("bubble_wrapper")
        },
        methods:{
            onMousemove: function (e) {
                const xAxis = (window.innerWidth / 2 - e.clientX) / 10
                const yAxis = (window.innerHeight / 2 - e.clientY) / 10
                wrapper.style.transform = `translate(${xAxis}px,${yAxis}px)`
            }
        }
    }
</script>

<style scoped>
    .bubble_wrapper {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        transition: 0.1s;
    }

    .bubble {
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.3));
        z-index: 1;
        box-shadow: 0 0 10px 0 #d2d2d2;
    }

    .bubble:nth-child(1) {
        width: 7vw;
        height: 7vw;
        z-index: 1;
        top: 30%;
        left: 12%;
    }

    .bubble:nth-child(2) {
        width: 12vw;
        height: 12vw;
        z-index: 1;
        top: 72%;
        left: 89%;
    }

    .bubble:nth-child(3) {
        width: 15vw;
        height: 15vw;
        z-index: 1;
        top: 88%;
        left: 25%;
    }

    .bubble:nth-child(4) {
        width: 13vw;
        height: 13vw;
        z-index: 1;
        top: 63%;
        left: 19%;
    }

    .bubble:nth-child(5) {
        width: 12vw;
        height: 12vw;
        z-index: 1;
        top: 39%;
        left: 93%;
    }

    .bubble:nth-child(6) {
        width: 15vw;
        height: 15vw;
        z-index: 1;
        top: 20%;
        left: 64%;
    }

    .bubble:nth-child(7) {
        width: 16vw;
        height: 16vw;
        z-index: 1;
        top: 12%;
        left: 29%;
    }

    .bubble:nth-child(8) {
        width: 16vw;
        height: 16vw;
        z-index: 1;
        top: 44%;
        left: 40%;
    }
</style>