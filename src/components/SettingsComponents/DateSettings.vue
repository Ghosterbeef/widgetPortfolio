<template>
    <section class="settings_charter date_settings">
        <h3>Дата и время</h3>
        <div class="date_settings_body">
            <h4 class="timeZoneTitle">Выберите часовой пояс</h4>
            <multi-select v-model="store.state.userData.dateData.selectedTimeZone" :options="options" :searchable="true"
                          @select="saveSelected"></multi-select>
            <div class="AmPmFormat_toggle-wrapper">
                <h4 class="AmPmTitle">Включить 12-часовой формат</h4>
                <Toggle v-model="store.state.userData.dateData.AmPmType" on-label="Вкл"
                        off-label="Выкл" :width="60" @change="saveAmPm"></Toggle>
            </div>
        </div>
    </section>
</template>

<script>
    import {useStore} from 'vuex'
    import multiSelect from '@vueform/multiselect'
    import Toggle from '@vueform/toggle'
    import '@vueform/toggle/themes/default.css'

    export default {
        name: "DateSettings",
        components: {
            multiSelect,
            Toggle
        },
        data() {
            const store = useStore()
            return {
                store,
                options: [
                    {label: 'GMT -11', value: -660},
                    {label: 'GMT -10', value: -600},
                    {label: 'GMT -9', value: -540},
                    {label: 'GMT -8', value: -480},
                    {label: 'GMT -7', value: -420},
                    {label: 'GMT -6', value: -360},
                    {label: 'GMT -5', value: -300},
                    {label: 'GMT -4', value: -240},
                    {label: 'GMT -3.30', value: -210},
                    {label: 'GMT -3', value: -180},
                    {label: 'GMT -1', value: -60},
                    {label: 'GMT', value: 0},
                    {label: 'GMT +1', value: 60},
                    {label: 'GMT +2', value: 120},
                    {label: 'GMT +3', value: 180},
                    {label: 'GMT +3.30', value: 210},
                    {label: 'GMT +4', value: 240},
                    {label: 'GMT +5', value: 300},
                    {label: 'GMT +5.30', value: 330},
                    {label: 'GMT +6', value: 360},
                    {label: 'GMT +7', value: 420},
                    {label: 'GMT +8', value: 480},
                    {label: 'GMT +9', value: 540},
                    {label: 'GMT +9.30', value: 570},
                    {label: 'GMT +10', value: 600},
                    {label: 'GMT +11', value: 660},
                    {label: 'GMT +12', value: 720},
                ]
            }
        },
        methods: {
            saveSelected: function f(selected) {
                document.cookie = `userSelectedTimeZoneOffset=${selected}; max-age=2592000000`
            },
            saveAmPm: function (value) {
                document.cookie = `userSelectedAmPmFormat=${value}; max-age=2592000000`
            }
        }
    }
</script>

<style>
    .date_settings_body {
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        user-select: none;
        padding: 10px 30px;
    }

    .timeZoneTitle {
        width: 100%;
        max-width: 300px;
        text-align: left;
        color: rgba(44, 62, 80, 0.7);
    }


    .AmPmFormat_toggle-wrapper{
        width: 100%;
        max-width: 300px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: left;
        align-items: center;
    }

    .AmPmTitle{
        width: 100%;
        text-align: left;
        color: rgba(44, 62, 80, 0.7);
    }

    .multiselect {
        z-index: 100;
        width: 100%;
        max-width: 300px;
        position: relative;
        margin: 0 auto;
        font-size: 0
    }

    .multiselect > * {
        font-size: medium
    }

    .multiselect.is-searchable {
        cursor: auto
    }

    .multiselect-input {
        background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4));
        width: 100%;
        display: flex;
        align-items: center;
        min-height: 40px;
        border: 1px solid #e7e7e7;
        border-radius: 3px;
        box-sizing: border-box;
        cursor: pointer;
        position: relative;
        outline: none
    }

    .multiselect-caret {
        position: absolute;
        right: 12px;
        top: 50%;
        color: #999;
        border-color: #999 transparent transparent;
        border-style: solid;
        border-width: 5px 5px 0;
        content: "";
        transform: translateY(-50%);
        transition: transform .3s
    }

    .is-disabled .multiselect-input {
        background: #737373
    }

    .is-open .multiselect-input {
        border-radius: 3px 3px 0 0
    }

    .is-open .multiselect-caret {
        transform: translateY(-50%) rotate(180deg)
    }

    .multiselect-multiple-label, .multiselect-placeholder, .multiselect-single-label {
        display: flex;
        align-items: center;
        height: 100%;
        padding-left: 14px;
        position: absolute;
        left: 0;
        top: 0;
        pointer-events: none;
        background: transparent
    }

    .multiselect-placeholder {
        color: #777
    }

    .is-multiple .multiselect-search, .is-single .multiselect-search {
        display: flex;
        height: 100%;
        width: 100%;
        background: transparent
    }

    .is-multiple .multiselect-search input, .is-single .multiselect-search input {
        width: 100%;
        border: 0;
        padding: 8px 35px 8px 14px;
        outline: none;
        background: transparent;
        font-size: 16px;
        font-family: inherit
    }

    .is-multiple.no-caret .multiselect-search input, .is-single.no-caret .multiselect-search input {
        padding: 8px 14px
    }

    .is-tags .multiselect-search {
        flex-grow: 1
    }

    .is-tags .multiselect-search input {
        outline: none;
        border: 0;
        margin: 0 0 5px 3px;
        flex-grow: 1;
        min-width: 100%;
        font-size: 16px;
        font-family: inherit
    }

    .multiselect-clear {
        position: absolute;
        right: 0;
        top: 1px;
        width: 36px;
        height: 36px;
        background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4))
    }

    .multiselect-clear:after, .multiselect-clear:before {
        position: absolute;
        top: 12px;
        left: 16px;
        content: " ";
        height: 12px;
        width: 2px;
        background-color: #999
    }

    .multiselect-clear:before {
        transform: rotate(45deg)
    }

    .multiselect-clear:after {
        transform: rotate(-45deg)
    }

    .multiselect-clear:hover:after, .multiselect-clear:hover:before {
        background-color: #555
    }

    .multiselect-tags {
        display: flex;
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: flex-start;
        padding-left: 9px;
        margin-top: 5px;
        flex-wrap: wrap;
        padding-right: 36px
    }

    .no-caret .multiselect-tags {
        padding-right: 9px
    }

    .multiselect-tag {
        background: #41b883;
        color: #fff;
        font-size: 14px;
        font-weight: 600;
        padding: 0 0 0 8px;
        border-radius: 3px;
        margin-right: 5px;
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        cursor: text;
        white-space: nowrap
    }

    .multiselect-tag i {
        cursor: pointer
    }

    .multiselect-tag i:before {
        content: "\D7";
        color: #266d4d;
        font-size: 14px;
        font-weight: 700;
        padding: 1px 5px;
        margin-left: 3px;
        display: flex;
        font-style: normal
    }

    .multiselect-tag i:hover:before {
        color: #fff;
        background: hsla(0, 0%, 100%, .2)
    }

    .is-disabled .multiselect-tag {
        background: #a0a0a0;
        padding: 1px 8px
    }

    .multiselect-fake-input {
        background: transparent;
        width: 100%;
        height: 1px;
        border: 0;
        padding: 0;
        font-size: 0;
        margin-top: -1px;
        outline: none
    }

    .multiselect-fake-input:active, .multiselect-fake-input:focus {
        outline: none
    }

    .multiselect-options {
        position: absolute;
        left: 0;
        right: 0;
        border: 1px solid #e8e8e8;
        margin-top: -1px;
        max-height: 160px;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        z-index: 100;
        background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4))
    }

    .multiselect-option {
        display: flex;
        min-height: 40px;
        padding: 9px 12px;
        box-sizing: border-box;
        color: #222;
        text-decoration: none;
        align-items: center;
        justify-content: flex-start;
        text-align: left
    }

    .multiselect-option.is-pointed {
        background: #e6e6e6
    }

    .multiselect-option.is-disabled {
        background: #f9f9f9;
        color: #a6a6a6;
        cursor: not-allowed
    }

    .multiselect-option.is-selected {
        background: #41b883;
        color: #fff
    }

    .multiselect-option.is-selected.is-pointed {
        background: #4fbd8c
    }

    .is-multiple .multiselect-option.is-selected, .is-tags .multiselect-option.is-selected {
        color: #999;
        background: transparent
    }

    .is-multiple .multiselect-option.is-selected.is-pointed, .is-tags .multiselect-option.is-selected.is-pointed {
        background: #f1f1f1
    }

    .multiselect-no-options, .multiselect-no-results {
        display: flex;
        padding: 10px 12px;
        color: #777
    }

    .multiselect-spinner {
        position: absolute;
        right: 12px;
        top: 0;
        width: 16px;
        height: 16px;
        background: #fff;
        display: block;
        transform: translateY(50%)
    }

    .multiselect-spinner:after, .multiselect-spinner:before {
        position: absolute;
        content: "";
        top: 50%;
        left: 50%;
        margin: -8px 0 0 -8px;
        width: 16px;
        height: 16px;
        border-radius: 100%;
        border: 2px solid transparent;
        border-top-color: #41b883;
        box-shadow: 0 0 0 1px transparent
    }

    .is-disabled .multiselect-spinner {
        background: #f9f9f9
    }

    .is-disabled .multiselect-spinner:after, .is-disabled .multiselect-spinner:before {
        border-color: #999 transparent transparent
    }

    .multiselect-spinner:before {
        -webkit-animation: spinning 2.4s cubic-bezier(.41, .26, .2, .62);
        animation: spinning 2.4s cubic-bezier(.41, .26, .2, .62);
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite
    }

    .multiselect-spinner:after {
        -webkit-animation: spinning 2.4s cubic-bezier(.51, .09, .21, .8);
        animation: spinning 2.4s cubic-bezier(.51, .09, .21, .8);
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite
    }

    .multiselect-enter-active {
        transition: all .15s ease
    }

    .multiselect-leave-active {
        transition: all 0s
    }

    .multiselect-enter, .multiselect-leave-active {
        opacity: 0
    }

    .multiselect-loading-enter-active, .multiselect-loading-leave-active {
        transition: opacity .4s ease-in-out;
        opacity: 1
    }

    .multiselect-loading-enter, .multiselect-loading-leave-active {
        opacity: 0
    }

    @-webkit-keyframes spinning {
        0% {
            transform: rotate(0)
        }
        to {
            transform: rotate(2turn)
        }
    }

    @keyframes spinning {
        0% {
            transform: rotate(0)
        }
        to {
            transform: rotate(2turn)
        }
    }


</style>