<template>
   <div class="element_wrapper">
        <div class="table_element" @click="toggleShow" :class="{spirit:show}">
            <p class="element_text">{{hash}}</p>
            <p class="element_text">{{surname}}</p>
            <p class="element_text">{{name}}</p>
            <p class="element_text">{{patronymic}}</p>
            <p class="element_text">{{age}}</p>
        </div>
        <transition class="delEl" name="delEl" v-show="show">
            <div class="deleteElement">
                <button type="button" @click="deleteElement">Удалить элемент</button>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "Hash_Table_element",
        emits: ["deleteElement", "show"],
        props: {
            hash: {
                type: String,
                required: true
            },
            surname: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            patronymic: {
                type: String,
                required: true
            },
            age: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                show: false,
            }
        },
        methods: {
            toggleShow: function () {
                this.show = !this.show
                if (this.show)
                    this.$emit('show')
            },
            deleteElement: function () {
                this.show = false
                this.$emit('deleteElement', {
                    surname: this.$props.surname,
                    name: this.$props.name,
                    patronymic: this.$props.patronymic,
                    age: this.$props.age
                })
            }
        }
    }
</script>

<style scoped>
    .table_element {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        margin: 5px 0 5px;
        background-color: white;
    }

    .table_element:hover {
        background-color: rgba(252, 70, 107, 1);
        cursor: url("./icons/down-arrow.png") 12 12, pointer;
    }

    .element_text {
        line-height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        border: 1px solid black;
        text-align: center;
        color: black;
        height: 30px;
    }


    .deleteElement {
        width: 100%;
        height: 30px;
        background: white;
        padding: 4px 10px;
        bottom: -30px;
    }

    .deleteElement button {
        border-radius: 3px;
        width: 100%;
        height: 100%;
        background-color: #ff4c4c;
        border: none;
        color: white;
        font-weight: bold;
        transition: background-color 200ms;
        cursor: pointer;
    }

    .deleteElement button:hover,
    .deleteElement button:focus {
        background-color: red;
        cursor: url("./icons/bin2.png") 12 12, pointer;
    }

    .spirit {
        opacity: 0.5;
    }

    .spirit:hover {
        cursor: url("./icons/up-arrow.png") 12 12, pointer;
    }


    .delEl-enter-from {
        opacity: 0;
        transform: translateY(-100%);
    }

    .delEl-enter-active {
        transition: all 0.1s ease;
    }

    .delEl-leave-from {
        opacity: 1;
        transform: translateY(0);
    }

    .delEl-leave-to {
        z-index: -1;
        opacity: 0;
        transform: translateY(-100%);
    }

    .delEl-leave-active {
        transition: all 0.1s ease;
    }

    .delEl-move {
        transition: all 0.3s ease;
    }
</style>