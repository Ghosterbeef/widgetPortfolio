<template>
    <div class="control_panel">
        <form @submit.prevent="addElement">
            <input class="getSurname" type="text" placeholder="Фамилия" v-model="formData.surname">
            <input class="getName" type="text" placeholder="Имя" v-model="formData.name">
            <input class="getPatronymic" type="text" placeholder="Отчество" v-model="formData.patronymic">
            <input class="getAge" type="number" placeholder="Возраст" v-model="formData.age" max="999">
        </form>
        <button class="addElement-btn" @click.prevent="addElement" @mouseup="deleteFocus">Добавить</button>
        <button class="searchElement-btn" @click.prevent="searchElement" @mouseup="deleteFocus">Поиск</button>
        <button class="deleteElement-btn" @click.prevent="deleteElement" @mouseup="deleteFocus">Удалить</button>
        <div class="rollBack_btn-container">
            <button class="rollBack-btn" @click.prevent="rollBack" @mouseup="deleteFocus" :disabled="length===0">
                <img src="./icons/bin2.png" alt="Откат">
                <span v-if="length!==0" class="length">{{length}}</span>
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Hash_table_control_panel",
        props: {
            length: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                formData: {
                    surname: "",
                    name: "",
                    patronymic: "",
                    age: ""
                }
            }
        },
        methods: {
            addElement: function () {
                if (this.formData.age <0){
                    this.formData.age = this.formData.surname = this.formData.name = this.formData.patronymic = ""
                    return;
                }
                if (this.formData.surname === ""
                    && this.formData.name === "" && this.formData.patronymic === ""
                    && this.formData.age === "") {
                    return
                }
                if (this.formData.surname !== ""
                    && this.formData.name !== "" && this.formData.patronymic !== ""
                    && this.formData.age !== "") {
                    this.$emit("addElement", this.formData)
                    this.formData.age = this.formData.surname = this.formData.name = this.formData.patronymic = ""
                }

            },
            searchElement: function () {
                if (this.formData.surname === ""
                    && this.formData.name === "" && this.formData.patronymic === ""
                    && this.formData.age === "") {
                    return
                }
                if (this.formData.surname !== ""
                    && this.formData.name !== "" && this.formData.patronymic !== ""
                    && this.formData.age !== "") {
                    this.$emit("searchElement", this.formData)
                    this.formData.age = this.formData.surname = this.formData.name = this.formData.patronymic = ""
                }
            },
            deleteElement: function () {
                if (this.formData.surname === ""
                    && this.formData.name === "" && this.formData.patronymic === ""
                    && this.formData.age === "") {
                    return
                }
                if (this.formData.surname !== ""
                    && this.formData.name !== "" && this.formData.patronymic !== ""
                    && this.formData.age !== "") {
                    this.$emit("deleteElement", this.formData)
                    this.formData.age = this.formData.surname = this.formData.name = this.formData.patronymic = ""
                }
            },
            rollBack: function (e) {
                this.$emit("rollBack")
                this.deleteFocus(e)
            },
            deleteFocus: function (e) {
                e.target.blur()
            }
        }
    }
</script>

<style scoped>
    .control_panel {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        position: relative;
    }

    .control_panel button {
        outline: none;
        margin: 20px 0;
        padding: 5px 10px;
        background-color: white;
        font-weight: bold;
        font-size: 1.05rem;
        border-radius: 5px;
        cursor: pointer;
        transition: 0.1s;
    }

    .addElement-btn {
        border: 2px solid lime;
        color: lime;
    }

    .searchElement-btn {
        border: 2px solid blueviolet;
        color: blueviolet;
    }

    .deleteElement-btn {
        border: 2px solid red;
        color: red;
    }

    .rollBack-btn {
        border: 2px solid black;
        position: relative;
        color: black;
    }

    .rollBack-btn img{
        position: static;
    }


    .addElement-btn:hover, .addElement-btn:focus {
        color: white;
        background-color: lime;
        cursor: url("./icons/plus.png") 12 12, pointer;
    }

    .searchElement-btn:hover, .searchElement-btn:focus {
        color: white;
        background-color: blueviolet;
        cursor: url("./icons/search.png") 12 12, pointer;
    }

    .deleteElement-btn:hover, .deleteElement-btn:focus {
        color: white;
        background-color: red;
        cursor: url("./icons/bin2.png") 12 12, pointer;
    }

    .rollBack-btn:hover, .rollBack-btn:focus {
        background-color: lightgrey;
    }

    .rollBack-btn:disabled {
        background-color: white;
        border: 2px solid rgba(0, 0, 0, 0.5);
        color: rgba(0, 0, 0, 0.5);

    }

    .rollBack-btn:disabled:hover {
        cursor: url("./icons/block.png") 12 12, no-drop;
    }

    .rollBack_btn-container{
        position: relative;
    }

    .rollBack_btn-container span{
        top:0;
        display: inline-block;
        background: inherit;
    }

    .length{
        position: absolute;
        right: 3px;
        top: 22px;
        color: black;
        font-weight: bold;
        background-color: white;
    }

    form {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
    }

    input {
        padding: 5px 10px;
        margin: 5px 0;
        color: black;
        border: 2px solid gray;
        transition: 0.1s;
    }

    input:hover {
        border: 2px solid black;
    }
</style>