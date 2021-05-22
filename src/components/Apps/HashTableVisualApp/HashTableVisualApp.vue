<template>
    <section class="hash-table-visual-app">
        <div class="app_container">
            <button class="test_button" @click="addRandomElement">Добавить случайный элемент</button>
            <transition-group class="table_trashcan_wrapper" tag="div" name="table_trashcan_wrapper">
                <div class="hash_table_body" :key="'hash_table_body'" ref="hash_table_body">
                    <div class="hash_table_header">
                        <button id="hashSort" class="sortChange-btn" @click.stop="sortChange">#
                            <span class="asc"
                                  v-if="typeOfSort.type === 'hashSort' && typeOfSort.counter === 0"></span>
                            <span class="desc"
                                  v-else-if="typeOfSort.type === 'hashSort' && typeOfSort.counter === 1"></span>
                        </button>
                        <button id="surnameSort" class="sortChange-btn" @click.stop="sortChange">Фамилия
                            <span class="asc"
                                  v-if="typeOfSort.type === 'surnameSort' && typeOfSort.counter === 0"></span>
                            <span class="desc"
                                  v-else-if="typeOfSort.type === 'surnameSort' && typeOfSort.counter === 1"></span>
                        </button>
                        <button id="nameSort" class="sortChange-btn" @click.stop="sortChange">Имя
                            <span class="asc"
                                  v-if="typeOfSort.type === 'nameSort' && typeOfSort.counter === 0"></span>
                            <span class="desc"
                                  v-else-if="typeOfSort.type === 'nameSort' && typeOfSort.counter === 1"></span>
                        </button>
                        <button id="patronymicSort" class="sortChange-btn" @click.stop="sortChange">Отчество
                            <span class="asc"
                                  v-if="typeOfSort.type === 'patronymicSort' && typeOfSort.counter === 0"></span>
                            <span class="desc"
                                  v-else-if="typeOfSort.type === 'patronymicSort' && typeOfSort.counter === 1"></span>
                        </button>
                        <button id="ageSort" class="sortChange-btn" @click.stop="sortChange">Возраст
                            <span class="asc"
                                  v-if="typeOfSort.type === 'ageSort' && typeOfSort.counter === 0"></span>
                            <span class="desc"
                                  v-else-if="typeOfSort.type === 'ageSort' && typeOfSort.counter === 1"></span>
                        </button>
                    </div>
                    <Hash_Table_element v-for="(elements, index) in elementsToDraw" :key="index"
                                        :hash="elements.hash"
                                        :surname="elements.surname"
                                        :name="elements.name"
                                        :patronymic="elements.patronymic"
                                        :age="elements.age"
                                         @deleteElement="deleteElement" @show="show">
                    </Hash_Table_element>
                </div>
                <div class="trashcan_body" v-if="displayTrashCan" :key="'trashcan_body'">
                    <div class="trash_can_header">
                        <h3>Корзина</h3>
                    </div>
                    <trash-can-element v-for="element in trashCan" :key="element.hash"
                                       :hash="element.hash"
                                       :surname="element.surname"
                                       :name="element.name"
                                       :patronymic="element.patronymic"
                                       :age="element.age" @rollBack="rollBackElement">
                    </trash-can-element>
                </div>
            </transition-group>
            <div class="control_panel-wrapper">
                <Hash_table_control_panel :length="trashCanLength" @addElement="addElement"
                                          @searchElement="searchElement"
                                          @deleteElement="deleteElement" @rollBack="rollBack">
                </Hash_table_control_panel>
                <button class="search_cancellation" v-if="isSearched" @click.stop="cancelSearch">
                    <img src="./icons/cross.svg" alt="Крестик"></button>
            </div>
        </div>
    </section>
</template>

<script>
    import Hash_Table_element from "./Hash_Table_element";
    import Hash_table_control_panel from "./Hash_table_control_panel";
    import TrashCanElement from "./TrashCanElement";


    let hashTable = {}
    let trashCan = []
    export default {
        name: "HashTableVisualApp",
        components: {TrashCanElement, Hash_table_control_panel, Hash_Table_element},
        data() {
            return {
                elementsToDraw: [],
                typeOfSort: {
                    type: "default",
                    counter: 0
                },
                isCloseAll: false,
                isSearched: false,
                trashCanLength: trashCan.length,
                randomData: null,
                displayTrashCan: false,
                trashCan
            }
        },
        mounted() {
            fetch('../../../randomInfo.json').then(response => response.json()).then(json => {
                this.randomData = json
            })
            this.hashFunction({
                surname: "Вахнин",
                name: "Антон",
                patronymic: "Владимирович",
                age: "20"
            })
            this.getElementsToDraw()
        },
        methods: {
            hashFunction: function (data) {
                return "#" + data.surname.charCodeAt(0)
                    + data.surname[1]
                    + data.name.charCodeAt(0)
                    + data.name[1]
                    + data.patronymic.charCodeAt(0)
                    + data.patronymic[1]
                    + data.age
            },
            addElement: function (data) {
                const hash = this.hashFunction(data)
                const result = this.isHashEmpty(hash)
                if (!result) {
                    hashTable[hash] = {
                        dataField: {
                            surname: data.surname,
                            name: data.name,
                            patronymic: data.patronymic,
                            age: data.age
                        },
                        next: null
                    }
                } else {
                    if (this.searchElementWithCollision(result, data)) {
                        alert("Точно такой же элемент уже есть в таблице!")
                        return
                    }
                    let tempElement = hashTable[hash]
                    while (tempElement.next) {
                        tempElement = tempElement.next
                    }
                    tempElement.next = {
                        dataField: {
                            surname: data.surname,
                            name: data.name,
                            patronymic: data.patronymic,
                            age: data.age
                        },
                        next: null
                    }
                }
                this.getElementsToDraw()
            },
            searchElement: function (data) {
                const hash = this.hashFunction(data)
                const result = this.isHashEmpty(hash)
                if (!result) {
                    alert("Элемент с введенными данными отсутствует в таблице")
                } else {
                    const searchResult = this.searchElementWithCollision(result, data)
                    if (!searchResult) {
                        alert("Элемент с введенными данными отсутствует в таблице!")
                        return
                    }
                    this.elementsToDraw = []
                    this.elementsToDraw.push({
                        hash: hash,
                        surname: searchResult.dataField.surname,
                        name: searchResult.dataField.name,
                        patronymic: searchResult.dataField.patronymic,
                        age: searchResult.dataField.age
                    })
                    this.isSearched = true
                }
            },
            deleteElement: function (data) {
                const hash = this.hashFunction(data)
                const result = this.isHashEmpty(hash)
                if (!result) {
                    alert("Элемент с введенными данными отсутствует в таблице")
                } else {
                    let searchResult = this.searchElementWithCollision(result, data)
                    let prevElement = this.searchPrevElement(result, searchResult)
                    if (prevElement === -1) {
                        hashTable[hash] = searchResult.next
                        trashCan.unshift({
                            hash: hash,
                            surname: data.surname,
                            name: data.name,
                            patronymic: data.patronymic,
                            age: data.age,
                        })
                        searchResult = null
                    } else {
                        prevElement.next = searchResult.next
                        trashCan.unshift({
                            hash: hash,
                            surname: data.surname,
                            name: data.name,
                            patronymic: data.patronymic,
                            age: data.age,
                        })
                        searchResult = null
                    }
                }
                if (hashTable[hash] === null) {
                    delete hashTable[hash]
                }
                this.trashCanLength = trashCan.length
                this.getElementsToDraw()
            },
            isHashEmpty: function (hash) {
                const result = hashTable[hash]
                if (result) return result
                else return null
            },
            searchElementWithCollision: function (slot, data) {
                let tempElement = slot
                if (tempElement.dataField.surname === data.surname &&
                    tempElement.dataField.name === data.name &&
                    tempElement.dataField.patronymic === data.patronymic &&
                    tempElement.dataField.age === data.age) {
                    return tempElement
                }
                while (tempElement.next !== null) {
                    tempElement = tempElement.next
                    if (tempElement.dataField.surname === data.surname &&
                        tempElement.dataField.name === data.name &&
                        tempElement.dataField.patronymic === data.patronymic &&
                        tempElement.dataField.age === data.age) {
                        return tempElement
                    }
                }
                return null
            },
            searchPrevElement: function (result, element) {
                let tempElement = result
                if (result === element) {
                    return -1
                }
                while (tempElement.next !== element) {
                    tempElement = tempElement.next
                }
                return tempElement
            },
            getElementsToDraw: function () {
                this.isSearched = false
                this.elementsToDraw = []
                for (let element in hashTable) {
                    let tempElement = hashTable[element]
                    while (tempElement) {
                        this.elementsToDraw.push({
                            hash: element,
                            surname: tempElement.dataField.surname,
                            name: tempElement.dataField.name,
                            patronymic: tempElement.dataField.patronymic,
                            age: tempElement.dataField.age
                        })
                        tempElement = tempElement.next
                    }
                }
                switch (this.typeOfSort.type) {
                    case "hashSort": {
                        if (!this.typeOfSort.counter) {
                            this.elementsToDraw.sort(function (a, b) {
                                const hashA = a.hash.toLowerCase()
                                const hashB = b.hash.toLowerCase()
                                if (hashA < hashB)
                                    return -1
                                if (hashA > hashB)
                                    return 1
                                return 0
                            })
                        } else {
                            this.elementsToDraw.sort(function (a, b) {
                                const hashA = a.hash.toLowerCase()
                                const hashB = b.hash.toLowerCase()
                                if (hashA > hashB)
                                    return -1
                                if (hashA < hashB)
                                    return 1
                                return 0
                            })
                        }
                        break
                    }
                    case "surnameSort": {
                        if (!this.typeOfSort.counter) {
                            this.elementsToDraw.sort(function (a, b) {
                                const surnameA = a.surname.toLowerCase()
                                const surnameB = b.surname.toLowerCase()
                                if (surnameA < surnameB)
                                    return -1
                                if (surnameA > surnameB)
                                    return 1
                                return 0
                            })
                        } else {
                            this.elementsToDraw.sort(function (a, b) {
                                const surnameA = a.surname.toLowerCase()
                                const surnameB = b.surname.toLowerCase()
                                if (surnameA > surnameB)
                                    return -1
                                if (surnameA < surnameB)
                                    return 1
                                return 0
                            })
                        }
                        break
                    }
                    case "nameSort": {
                        if (!this.typeOfSort.counter) {
                            this.elementsToDraw.sort(function (a, b) {
                                const nameA = a.name.toLowerCase()
                                const nameB = b.name.toLowerCase()
                                if (nameA < nameB)
                                    return -1
                                if (nameA > nameB)
                                    return 1
                                return 0
                            })
                        } else {
                            this.elementsToDraw.sort(function (a, b) {
                                const nameA = a.name.toLowerCase()
                                const nameB = b.name.toLowerCase()
                                if (nameA > nameB)
                                    return -1
                                if (nameA < nameB)
                                    return 1
                                return 0
                            })
                        }
                        break
                    }
                    case "patronymicSort": {
                        if (!this.typeOfSort.counter) {
                            this.elementsToDraw.sort(function (a, b) {
                                const patronymicA = a.patronymic.toLowerCase()
                                const patronymicB = b.patronymic.toLowerCase()
                                if (patronymicA < patronymicB)
                                    return -1
                                if (patronymicA > patronymicB)
                                    return 1
                                return 0
                            })
                        } else {
                            this.elementsToDraw.sort(function (a, b) {
                                const patronymicA = a.patronymic.toLowerCase()
                                const patronymicB = b.patronymic.toLowerCase()
                                if (patronymicA > patronymicB)
                                    return -1
                                if (patronymicA < patronymicB)
                                    return 1
                                return 0
                            })
                        }
                        break
                    }
                    case "ageSort": {
                        if (!this.typeOfSort.counter) {
                            this.elementsToDraw.sort(function (a, b) {
                                const ageA = parseInt(a.age)
                                const ageB = parseInt(b.age)
                                return ageA - ageB
                            })
                        } else {
                            this.elementsToDraw.sort(function (a, b) {
                                const ageA = parseInt(a.age)
                                const ageB = parseInt(b.age)
                                return ageB - ageA
                            })
                        }
                        break
                    }
                    default: {
                        break
                    }
                }
            },
            getRandomIntInclusive: function (min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
            },
            addRandomElement: function () {
                const data = {
                    surname: this.randomData.surnames[this.getRandomIntInclusive(0, this.randomData.surnames.length - 1)].toString(),
                    name: this.randomData.names[this.getRandomIntInclusive(0, this.randomData.names.length - 1)].toString(),
                    patronymic: this.randomData.patronymics[this.getRandomIntInclusive(0, this.randomData.patronymics.length - 1)].toString(),
                    age: this.getRandomIntInclusive(1, 120).toString()
                }
                this.addElement(data)
                this.getElementsToDraw()
            },
            sortChange: function (e) {
                let target
                if (e.target.tagName === "IMG") {
                    target = e.target.parentNode
                } else target = e.target
                switch (target.id) {
                    case "hashSort": {
                        if (this.typeOfSort.type !== "hashSort") {
                            this.typeOfSort = {
                                type: "hashSort",
                                counter: 0
                            }
                            break
                        }
                        if (this.typeOfSort.counter === 1) {
                            this.typeOfSort = {
                                type: "default",
                                counter: 0
                            }
                            break
                        }
                        this.typeOfSort.counter++
                        break
                    }
                    case "surnameSort": {
                        if (this.typeOfSort.type !== "surnameSort") {
                            this.typeOfSort = {
                                type: "surnameSort",
                                counter: 0
                            }
                            break
                        }
                        if (this.typeOfSort.counter === 1) {
                            this.typeOfSort = {
                                type: "default",
                                counter: 0
                            }
                            break
                        }
                        this.typeOfSort.counter++
                        break
                    }
                    case "nameSort": {
                        if (this.typeOfSort.type !== "nameSort") {
                            this.typeOfSort = {
                                type: "nameSort",
                                counter: 0
                            }
                            break
                        }
                        if (this.typeOfSort.counter === 1) {
                            this.typeOfSort = {
                                type: "default",
                                counter: 0
                            }
                            break
                        }
                        this.typeOfSort.counter++
                        break
                    }
                    case "patronymicSort": {
                        if (this.typeOfSort.type !== "patronymicSort") {
                            this.typeOfSort = {
                                type: "patronymicSort",
                                counter: 0
                            }
                            break
                        }
                        if (this.typeOfSort.counter === 1) {
                            this.typeOfSort = {
                                type: "default",
                                counter: 0
                            }
                            break
                        }
                        this.typeOfSort.counter++
                        break
                    }
                    case "ageSort": {
                        if (this.typeOfSort.type !== "ageSort") {
                            this.typeOfSort = {
                                type: "ageSort",
                                counter: 0
                            }
                            break
                        }
                        if (this.typeOfSort.counter === 1) {
                            this.typeOfSort = {
                                type: "default",
                                counter: 0
                            }
                            break
                        }
                        this.typeOfSort.counter++
                        break
                    }
                    default: {
                        console.log("Какие то траблы с id")
                        break
                    }
                }
                this.getElementsToDraw()
            },
            cancelSearch: function () {
                this.isSearched = false
                this.getElementsToDraw()
            },
            rollBack: function () {
                if (this.trashCanLength)
                    this.displayTrashCan = !this.displayTrashCan
                else
                    this.displayTrashCan = false
            },
            rollBackElement: function (data) {
                this.addElement(data)
                trashCan.splice(trashCan.findIndex(x => x.name === data.name &&
                    x.surname === data.surname
                    && x.patronymic === data.patronymic
                    && x.age === data.age), 1)
                this.trashCanLength = trashCan.length
                if (!this.trashCanLength)
                    this.displayTrashCan = false
            },
            show: function () {
                const target = this.$refs.hash_table_body
                let scrolled = 0
                const internal = setInterval(function () {
                    target.scrollTop += 1
                    scrolled += 1
                    if (30 <= scrolled)
                        clearInterval(internal)
                }, 1)
            }
        }
    }
</script>

<style scoped>

    @font-face {
        font-family: 'icomoon';
        src: url('./fonts/icomoon.eot?5ttvyb');
        src: url('./fonts/icomoon.eot?5ttvyb#iefix') format('embedded-opentype'),
        url('./fonts/icomoon.ttf?5ttvyb') format('truetype'),
        url('./fonts/icomoon.woff?5ttvyb') format('woff'),
        url('./fonts/icomoon.svg?5ttvyb#icomoon') format('svg');
        font-weight: normal;
        font-style: normal;
        font-display: block;
    }


    .hash-table-visual-app {
        display: flex;
        justify-content: center;
        position: static;
        height: 100%;
    }

    .app_container {
        width: 90%;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: static;
        justify-content: space-evenly;
        height: 100%;
        max-height: 100%;
    }

    .trash_can_header {
        z-index: 100;
        grid-template-columns: repeat(5, minmax(30px, 1fr));
        grid-template-rows: max-content;
        border-bottom: 1px solid black;
        position: sticky;
        background-color: rgba(138, 43, 226, 0.7);
        font-weight: bold;
        top: 0;
    }

    .trash_can_header h3 {
        width: 100%;
        color: black;
        background-color: rgba(252, 70, 107, 1);
    }

    .table_trashcan_wrapper {
        width: 100%;
        max-height: 40vh;
        min-height: 40vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        position: relative;
    }

    .trashcan_body {
        margin-top: 50px;
        max-height: 50%;
        min-height: 100px;
        overflow-y: auto;
    }

    .hash_table_header {
        z-index: 100;
        display: grid;
        grid-template-columns: repeat(5, minmax(30px, 1fr));
        grid-template-rows: max-content;
        border-bottom: 1px solid black;
        position: sticky;
        background-color: rgba(138, 43, 226, 1);
        color: #2c3e50;
        font-weight: bold;
        top: 0;
    }

    .hash_table_header button {
        position: relative;
    }

    .hash_table_header button span::after {
        position: absolute;
        top: 8px;
        right: 5px;
        font-family: 'icomoon' !important;
        /*speak: never;*/
        font-size: 1.1rem;
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        line-height: 1;

        /* Enable Ligatures ================ */
        letter-spacing: 0;
        -webkit-font-feature-settings: "liga";
        -moz-font-feature-settings: "liga=1";
        -moz-font-feature-settings: "liga";
        -ms-font-feature-settings: "liga" 1;
        font-feature-settings: "liga";
        -webkit-font-variant-ligatures: discretionary-ligatures;
        font-variant-ligatures: discretionary-ligatures;

        /* Better Font Rendering =========== */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .asc::after {
        content: "\ea4c";
    }

    .desc::after {
        content: "\ea4d";
    }

    .sortChange-btn {
        height: 30px;
        position: relative;
        text-align: center;
        font-weight: bold;
        color: black;
        background-color: rgba(138, 43, 226, 0.7);
        border: 1px solid black;
        cursor: pointer;
    }

    img {
        position: absolute;
        right: 10px;
        width: 20px;
        height: 20px;
    }

    .sortChange-btn:hover {
        background-color: rgba(96, 26, 162, 0.9);
        color: white;
    }

    .hash_table_body {
        overflow-y: auto;
        width: 100%;
        min-width: 300px;
    }


    .test_button {
        width: 120px;
        opacity: 0;
        position: absolute;
        top: 100px;
        left: 5vw;
        padding: 5px 10px;
        background-color: white;
        border: 2px solid gray;
        font-weight: bold;
        font-size: 1.05rem;
        border-radius: 5px;
        cursor: pointer;
        transition: 0.1s;
        z-index: 20;
    }

    .test_button:hover {
        opacity: 1;
        background-color: gray;
        color: black;
        border: 2px solid black;
    }


    .control_panel-wrapper {
        position: relative;
    }

    .search_cancellation {
        border: 2px solid crimson;
        background-color: white;
        border-radius: 5px;
        width: 20px;
        height: 20px;
        position: absolute;
        left: calc(41% - 5px);
        transition: 0.2s;
        cursor: pointer;
    }

    .search_cancellation img {
        width: 80%;
        margin-right: -8px;
        margin-top: -10px;
    }

    .search_cancellation:hover {
        transform: scale(1.2);
        background-color: crimson;
    }


    .table_trashcan_wrapper-enter-from {
        opacity: 0;
        transform: translateY(100%);
    }

    .table_trashcan_wrapper-enter-active {
        transition: all 0.3s ease;
    }

    .table_trashcan_wrapper-leave-to {
        opacity: 0;
        transform: translateY(100%);
    }

    .table_trashcan_wrapper-leave-active {
        transition: all 0.3s ease;
    }

</style>