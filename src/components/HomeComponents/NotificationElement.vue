<template>
    <div class="notifications-item" @dragstart.prevent @mousedown="mouseDragElement"
         @touchstart.passive="touchDragElement" :ref="'N'+id">
        <h3 class="appName">{{appName}}</h3>
        <p class="content">{{content}}</p>
    </div>
</template>

<script>
    import {useStore} from 'vuex'

    export default {
        name: "NotificationElement",
        props: {
            id: {
                type: Number,
                required: true
            },
            appName: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            },
            options: {
                type: Object,
                required: false
            },
            deletable: {
                type: Boolean,
                required: true
            }
        },
        data() {
            const notificationID = this.$props.id
            const isDeletable = this.$props.deletable
            return {
                store: useStore(),
                notificationID,
                isDeletable
            }
        },
        methods: {
            mouseDragElement: function (event) {
                const ctx = this
                let target
                if (event.target.classList.contains(".notifications-item"))
                    target = event.target
                else
                    target = event.target.closest(".notifications-item")
                let shiftX = event.clientX;
                let ClientX

                function moveAt(clientX) {
                    ClientX = clientX
                    target.style.marginLeft = clientX - shiftX + 'px';
                    target.style.opacity = (100 - Math.abs(clientX - shiftX)) / 100
                }

                function onMouseMove(event) {
                    moveAt(event.clientX);
                }

                function clearListeners() {
                    target.style.marginLeft = "0"
                    target.style.opacity = "1"
                    if ((ClientX - shiftX) > 100 || (ClientX - shiftX < -100)) {
                        if (ctx.isDeletable) {
                            ctx.store.commit("deleteNotification", {
                                id: ctx.notificationID
                            })
                        } else {
                            ctx.$refs['N' + ctx.notificationID].classList.add("notDeletable")
                            setTimeout(function () {
                                ctx.$refs['N' + ctx.notificationID].classList.remove("notDeletable")
                            }, 500)
                        }
                    }
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener("mouseup", clearListeners)
                }


                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener("mouseup", clearListeners)
            },
            touchDragElement: function (event) {
                const ctx = this
                let target
                if (event.target.classList.contains(".notifications-item"))
                    target = event.target
                else
                    target = event.target.closest(".notifications-item")
                let shiftX = event.targetTouches[0].clientX;
                let ClientX

                function moveAt(clientX) {
                    ClientX = clientX
                    target.style.marginLeft = clientX - shiftX + 'px';
                    target.style.opacity = (100 - Math.abs(clientX - shiftX)) / 100
                }

                function onTouchMove(event) {
                    moveAt(event.targetTouches[0].clientX);
                }

                function clearListeners() {
                    target.style.marginLeft = "0"
                    target.style.opacity = "1"
                    if (((ClientX - shiftX) > 100 || (ClientX - shiftX < -100))) {
                        if (ctx.isDeletable) {
                            ctx.store.commit("deleteNotification", {
                                id: ctx.notificationID
                            })
                        } else {
                            ctx.$refs['N' + ctx.notificationID].classList.add("notDeletable")
                            setTimeout(function () {
                                ctx.$refs['N' + ctx.notificationID].classList.remove("notDeletable")
                            }, 500)
                        }
                    }
                    document.removeEventListener('touchmove', onTouchMove);
                    document.removeEventListener("touchend", clearListeners)
                }

                document.addEventListener('touchmove', onTouchMove);
                document.addEventListener("touchend", clearListeners)
            }
        }
    }
</script>

<style scoped>
    .notifications-item {
        margin: 10px 0 0 0;
        user-select: none;
        border-radius: 20px;
        background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4));;
        padding: 15px;
        width: 100%;
        max-height: 90px;
    }

    .notDeletable {
        animation: shake 0.5s ease;
    }

    @keyframes shake {
        from {
            background: white;
            transform: translateX(0);
        }
        10%{
            transform: translateX(10px);
        }
        20%{
            transform: translateX(-10px);
        }
        30%{
            transform: translateX(10px);
        }
        40%{
            transform: translateX(-10px);
        }
        50%{
            background: #ffd9d9;
            transform: translateX(10px);
        }
        60%{
            transform: translateX(-10px);
        }
        70%{
            transform: translateX(10px);
        }
        80%{
            transform: translateX(-10px);
        }
        90%{
            transform: translateX(10px);
        }
        to {
            background: white;
            background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4));
            transform: translateX(0);
        }
    }

    .appName {
        text-align: left;
        padding: 0;
        font-size: 1.1rem;
        -webkit-line-clamp: 2; /* Число отображаемых строк */
        display: -webkit-box; /* Включаем флексбоксы */
        -webkit-box-orient: vertical; /* Вертикальная ориентация */
        overflow: hidden; /* Обрезаем всё за пределами блока */
    }

    .content {
        text-overflow: ellipsis;
        font-size: 0.9rem;
        text-align: justify;
        -webkit-line-clamp: 2; /* Число отображаемых строк */
        display: -webkit-box; /* Включаем флексбоксы */
        -webkit-box-orient: vertical; /* Вертикальная ориентация */
        overflow: hidden; /* Обрезаем всё за пределами блока */
    }
</style>