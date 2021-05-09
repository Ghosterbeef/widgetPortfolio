<template>
    <div class="notification_element-wrapper" @dragstart.prevent @mousedown="mouseDragElement"
         @touchstart="touchDragElement">
        <h3 class="appName">{{appName}}</h3>
        <p class="content">{{content}}</p>
    </div>
</template>

<script>
    export default {
        name: "NotificationElement",
        props: {
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
            draggable: {
                type: Boolean,
                required: true
            }
        },
        methods: {
            mouseDragElement: function (event) {
                let target
                if (event.target.classList.contains("notification_element-wrapper"))
                    target = event.target
                else
                    target = event.target.closest(".notification_element-wrapper")
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

                function clearListeners(){
                    target.style.marginLeft = "0"
                    target.style.opacity="1"
                    if ((ClientX - shiftX) > 100 || (ClientX - shiftX < -100)) {
                        target.style.display = "none"
                        //Временное решение с исчезновением
                    }
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener("mouseup", clearListeners)
                }


                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener("mouseup", clearListeners)
            },
            touchDragElement: function (event) {
                let target
                if (event.target.classList.contains("notification_element-wrapper"))
                    target = event.target
                else
                    target = event.target.closest(".notification_element-wrapper")
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

                function clearListeners(){
                    target.style.marginLeft = "0"
                    target.style.opacity="1"
                    if ((ClientX- shiftX) > 100 || (ClientX - shiftX < -100)) {
                        target.style.display = "none"
                        //Временное решение с исчезновением
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
    .notification_element-wrapper {
        user-select: none;
        border-radius: 20px;
        background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4));;
        padding: 15px;
        max-width: 100%;
        min-width: 100%;
    }

    .appName {
        text-align: left;
        padding: 0;
        font-size: 1.1rem;
    }

    .content {
        font-size: 0.9rem;
        text-align: justify;
    }
</style>