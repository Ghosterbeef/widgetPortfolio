<template>
    <div class="developmentInfo" v-if="showInfo">
        <h2>Веб-приложение все еще находится в разработке.
            О всех багах сообщайте по адресу vahnin24@gmail.com</h2>
        <button type="button" @click="hideInfo"></button>
    </div>
</template>

<script>
    export default {
        name: "DevelopmentOnly",
        data() {
            return {
                showInfo: true
            }
        },
        methods: {
            hideInfo: function () {
                this.showInfo = false
            }
        }
    }
</script>

<style scoped>
    .developmentInfo {
        width: 100vw;
        min-height: 50px;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgb(63, 94, 251);
        background: linear-gradient(48deg, rgba(63, 94, 251, 1) 0%, rgba(252, 70, 107, 1) 100%);
    }


    h2 {
        font-size: 1.1rem;
        color: #ffffff;
    }

    button {
        position: relative;
        border: none;
        font-weight: bold;
        font-size: 1.3rem;
        background: none;
        width: 32px;
        height: 32px;
        opacity: 0.3;
        cursor: pointer;
    }

    button:hover {
        opacity: 1;
    }

    button::before {
        position: absolute;
        top: 0;
        left: 15px;
        content: ' ';
        height: 33px;
        width: 2px;
        background-color: #333;
        transform: rotate(45deg);
    }

    button::after {
        position: absolute;
        top: 0;
        left: 15px;
        content: ' ';
        height: 33px;
        width: 2px;
        background-color: #333;
        transform: rotate(-45deg);
    }
</style>