<template>
    <div class="table_element" @click="rollBack">
        <p class="element_text">{{hash}}</p>
        <p class="element_text">{{surname}}</p>
        <p class="element_text">{{name}}</p>
        <p class="element_text">{{patronymic}}</p>
        <p class="element_text">{{age}}</p>
    </div>
</template>

<script>
    export default {
        name: "TrashCanElement",
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
        methods:{
            rollBack: function () {
                this.$emit("rollback",{
                    hash: this.$props.hash,
                    surname: this.$props.surname,
                    name: this.$props.name,
                    patronymic: this.$props.patronymic,
                    age: this.$props.age,
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
        cursor: pointer;
    }

    .table_element:hover {
        background-color: rgba(252, 70, 107, 1);
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

</style>