<template>
    <section class="charter date">
        <h3>Дата</h3>
        <div class="date_body">
            <div class="first_row">
                <p class="time hours"  v-if="date.getHours()<10">
                    0{{date.getHours()}} :
                </p>
                <p class="time seconds" v-else>
                    {{date.getHours()}} :
                </p>
                <p class="time minutes" v-if="date.getMinutes()<10">
                    0{{date.getMinutes()}} :
                </p>
                <p class="time seconds" v-else>
                    {{date.getMinutes()}} :
                </p>
                <p class="time seconds" v-if="date.getSeconds()<10">
                    0{{date.getSeconds()}}
                </p>
                <p class="time seconds" v-else>
                    {{date.getSeconds()}}
                </p>
            </div>
            <div class="second_row">
                <p class="time year">
                    {{date.getFullYear()}}.
                </p>
                <p class="time month" v-if="(date.getMonth()+1)<10">
                    0{{date.getMonth()+1}}.
                </p>
                <p class="time month" v-else>
                    {{date.getMonth()+1}}.
                </p>
                <p class="time day" v-if="date.getDate()<10">
                    0{{date.getDate()}}
                </p>
                <p class="time day" v-else>
                    {{date.getDate()}}
                </p>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "DateComponent",
        data() {
            return {
                date: new Date()
            }
        },
        mounted() {
            const ctx = this
            setInterval(function () {
                ctx.date = new Date()
            }, 1000)
        }
    }
</script>

<style scoped>
    .date_body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .first_row{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }

    .second_row{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }

    .time {
        font-family: 'Titan One', cursive;
        padding: 5px;
        font-weight: 400;
        font-size: 1.9rem;
        color: rgba(44, 62, 80, 0.7);
        width: max-content;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
</style>