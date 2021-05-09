<template>
    <section class="charter notification">
        <h3>Уведомления</h3>
        <div class="notification_body" >
            <NotificationElement
                    :app-name="'От разработчика'"
                    :content="'Приложение находится в разработке. Просто смахните это уведомление.'"
                    :draggable="true"
                    :options="{}">
            </NotificationElement>
        </div>
    </section>
</template>

<script>
    import NotificationElement from "./NotificationElement";

    export default {
        name: "NotificationComponent",
        components: {NotificationElement},
    }
</script>

<style scoped>
    .notification{
        overflow-x: hidden;
    }

    .notification_body {
        overflow: hidden;
        border-radius: 20px;
        overflow-y: scroll;
        max-width: 100%;
        min-width: 100% ;
        margin: 0;
    }
</style>