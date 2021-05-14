<template>
    <router-view></router-view>
</template>

<script>
    export default {
        name: "Apps",
        mounted() {
            fetch("https://proxy.royaleapi.dev/v1/cards", {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjBkMTFiZTM2LWYzZjUtNGJkYy04YWYzLTM3NWNjNGNlMjg5YSIsImlhdCI6MTYyMDg1ODkyOCwic3ViIjoiZGV2ZWxvcGVyLzFlZmI2OTc0LTllNTQtYjI4NS1lMWZhLTY4MTM5MTJhNWFhMyIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxMjguMTI4LjEyOC4xMjgiXSwidHlwZSI6ImNsaWVudCJ9XX0.ZqVml830YvtVQZud4kzJ6tbEfbsjDTyzL6E9MppXtt5bMOnOzUSleZEa-xCCYnVwk2DubD2Hb6Z12BacteLKag"
                }
            })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                this.src = json.items[0].iconUrls.medium
            })
            //https://github.com/RoyaleAPI/cr-api-data/tree/master/docs/json
            fetch("https://royaleapi.github.io/cr-api-data/json/cards.json", {
            })
                .then(response => response.json())
                .then(json => {
                    console.log(json)
                })
        }
    }
</script>

<style scoped>
</style>