<template>
    <section class="charter notification">
        <h3>Уведомления</h3>
        <div class="notification_body">

        </div>
    </section>
</template>

<script>
    export default {
        name: "NotificationComponent"
    }
</script>

<style scoped>
    .notification_body {
        border-radius: 20px;
        overflow-y: scroll;
    }
</style>