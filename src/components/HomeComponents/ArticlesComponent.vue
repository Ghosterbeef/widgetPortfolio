<template>
    <section class="charter news">
        <h3>Статьи</h3>
        <div class="news_body">
        </div>
    </section>
</template>

<script>
    export default {
        name: "NewsComponent",
        mounted() {
            //fetch('https://www.liga.net/news/all/rss.xml').then(response => console.log(response))
        }
    }
</script>

<style scoped>
    .news_body {
        border-radius: 20px;
        overflow-y: scroll;
    }
</style>