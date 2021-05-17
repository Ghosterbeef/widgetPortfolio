<template>
    <section class="clash_royale_app">
        <card></card>
    </section>
</template>

<script>
    import Card from "./Card";
    export default {
        name: "ClashRoyaleStatsApp",
        components: {Card},
        data(){
            return{
                offCardInfo: null, //Информация из официального api
                repoCardInfo: null,//Информация из репозитория
                langCardInfo: null,
                repoCardStats: {},

            }
        },
        mounted() {
            fetch("https://proxy.royaleapi.dev/v1/cards", {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjBkMTFiZTM2LWYzZjUtNGJkYy04YWYzLTM3NWNjNGNlMjg5YSIsImlhdCI6MTYyMDg1ODkyOCwic3ViIjoiZGV2ZWxvcGVyLzFlZmI2OTc0LTllNTQtYjI4NS1lMWZhLTY4MTM5MTJhNWFhMyIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxMjguMTI4LjEyOC4xMjgiXSwidHlwZSI6ImNsaWVudCJ9XX0.ZqVml830YvtVQZud4kzJ6tbEfbsjDTyzL6E9MppXtt5bMOnOzUSleZEa-xCCYnVwk2DubD2Hb6Z12BacteLKag"
                }
            })
                .then(response => response.json())
                .then(json => {
                    this.offCardInfo = json
                    console.log(this.offCardInfo)
                })
            //https://github.com/RoyaleAPI/cr-api-data/tree/master/docs/json
            fetch("https://royaleapi.github.io/cr-api-data/json/cards_stats_characters.json")
                .then(response => response.json())
                .then(json => {
                    this.repoCardStats.troops = json
                    console.log(this.repoCardStats)
                })
            fetch("https://royaleapi.github.io/cr-api-data/json/cards_stats_building.json")
                .then(response => response.json())
                .then(json => {
                    this.repoCardStats.buildings = json
                    console.log(this.repoCardStats)
                })
            fetch("https://royaleapi.github.io/cr-api-data/json/cards_stats_spell.json")
                .then(response => response.json())
                .then(json => {
                    this.repoCardStats.spell = json
                    console.log(this.repoCardStats)
                })
            fetch("https://royaleapi.github.io/cr-api-data/json/cards.json")
                .then(response => response.json())
                .then(json => {
                    this.repoCardInfo = json
                    console.log(this.repoCardInfo)
                })
            fetch("https://royaleapi.github.io/cr-api-data/json/cards_i18n.json")
                .then(response => response.json())
                .then(json => {
                    this.langCardInfo = json
                    console.log(this.langCardInfo)
                })
        }
    }
</script>

<style scoped>
    .clash_royale_app{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
</style>