<template>
    <section class="charter notification">
        <h3>Уведомления</h3>
        <p class="empty_notification" v-if="!emptyNotificationDisplay">Уведомлений нет</p>
        <transition-group class="notifications" tag="div" name="notifications">
            <NotificationElement v-for="(item) in store.state.notifications" :key="item.id"
                                 :id="item.id"
                                 :app-name="item.appName"
                                 :content="item.content"
                                 :deletable="item.deletable"
                                 :options="item.options">
            </NotificationElement>
        </transition-group>
        <div class="clear_all-wrapper" v-if="zeroClearableNotifications>-1">
            <button class="clear_all-btn" @click="clearAll">Очистить</button>
        </div>
    </section>
</template>

<script>
    import NotificationElement from "./NotificationElement";
    import {useStore} from 'vuex'

    export default {
        name: "NotificationComponent",
        components: {NotificationElement},
        data() {
            return {
                store: useStore()
            }
        },
        computed: {
            emptyNotificationDisplay: function () {
                return this.store.state.notifications.length
            },
            zeroClearableNotifications: function () {
                return this.store.state.notifications.findIndex(i=> i.deletable === true)
            }
        },
        methods: {
            clearAll: function () {
                this.store.dispatch("clearNotifications")
            }
        }
    }
</script>

<style scoped>
    .notification {
        overflow-x: hidden;
    }

    .notifications {
        transition: 0s;
        overflow: hidden;
        border-radius: 20px;
        overflow-y: scroll;
        max-width: 100%;
        min-width: 100%;
        display: inline-block
    }

    .empty_notification {
        text-align: center;
        padding: 10px;
        color: gray;
    }

    .notifications-enter-from {
        opacity: 0;
        transform: translateX(-100%);
    }

    .notifications-enter-to {
        opacity: 1;
        transform: translateX(0);
    }

    .notifications-enter-active {
        transition: all 0.4s ease;
    }

    .notifications-leave-from {
        opacity: 1;
        transform: translateX(0);
    }

    .notifications-leave-to {
        opacity: 0;
        transform: translateX(-100%);
    }

    .notifications-leave-active {
        transition: all 0.1s ease;
        position: absolute;
    }

    .notifications-move {
        transition: all 0.3s ease;
    }

    .clear_all-wrapper {
        position: absolute;
        bottom: 30px;
        width: 100%;
    }

    .clear_all-btn {
        cursor: pointer;
        right: 15px;
        position: absolute;
        padding: 5px;
        border-radius: 10px;
        border: 1px solid white;
        background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4));
    }
</style>