<template>
    <footer>
        <div class="container">
            <p>Владелец и разработчик сайта Ghosterbeef</p>
            <p class="copyright" v-if="currentYear===2021">Все права защищены 2021</p>
            <p class="copyright" v-else>Все права защищены 2021-{{currentYear}}</p>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "Footer",
        computed: {
            currentYear: function () {
                const date = new Date()
                return date.getFullYear()
            }
        }
    }
</script>

<style scoped>
    footer{
        width: 100%;
        display: flex;
        justify-content: center;
        grid-row: 3/4;
        padding: 20px;
        background: linear-gradient(to right top, rgba(255,255, 255, 0.7), rgba(255,255, 255, 0.4));
        backdrop-filter: blur(20px);
    }

    p{
        margin: 5px;
        color: #2c3e50;
        font-weight: bold;
        font-size: 1.2rem;
    }

    @media (max-width: 720px) {
        footer{
            display: none;
        }
    }
</style>