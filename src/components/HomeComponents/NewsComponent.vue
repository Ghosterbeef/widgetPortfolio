<template>
    <section class="charter news">
        <h3>Новости</h3>
        <div class="news_body">

        </div>
    </section>
</template>

<script>
    export default {
        name: "NewsComponent",
        mounted() {
            const NewsAPI = require('newsapi')
            const newsapi = new NewsAPI('9445bbbb0fea431fab616a61724334cf');
            newsapi.v2.topHeadlines({
                category: 'politics',
                language: 'ru',
                country: 'ru'
            }).then(response => {
                console.log(response)
            })
        }
    }
</script>

<style scoped>
    .news_body {
        border-radius: 20px;
        overflow-y: scroll;
    }
</style>