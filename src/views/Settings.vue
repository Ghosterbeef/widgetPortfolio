<template>
    <section class="settings">
        <h2>Настройки</h2>
        <div class="settings-inner">
            <account-settings></account-settings>
            <date-settings></date-settings>
            <weather-settings></weather-settings>
            <notifications-settings></notifications-settings>
            <articles-settings></articles-settings>
            <apps-settings></apps-settings>
        </div>
    </section>
</template>

<script>
    import AccountSettings from "../components/SettingsComponents/AccountSettings";
    import DateSettings from "../components/SettingsComponents/DateSettings";
    import WeatherSettings from "../components/SettingsComponents/WeatherSettings";
    import NotificationsSettings from "../components/SettingsComponents/NotificationsSettings";
    import ArticlesSettings from "../components/SettingsComponents/ArticlesSettings";
    import AppsSettings from "../components/SettingsComponents/AppsSettings";

    export default {
        name: "Settings",
        components: {
            AppsSettings,
            ArticlesSettings,
            NotificationsSettings,
            WeatherSettings,
            DateSettings,
            AccountSettings
        }
    }
</script>

<style scoped>
    .settings {
        padding: 30px;
    }

    h2 {
        color: rgba(44, 62, 80, 0.7);
        height: max-content;
    }
    .settings-inner{
        display: grid;
        grid-gap: 30px;
        grid-template-columns: minmax(min-content, 1fr) minmax(min-content, 1fr) minmax(min-content, 1fr);
        justify-content: space-evenly;
        margin: 30px 0;
        width: 100%;
        height: calc(100% - 60px);
        min-height: 430px;
        transition: 0.1s;
    }


    .settings_charter {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 20px;
        background: linear-gradient(to right top, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3));
        padding: 0 0 32px 10px;
        max-height: 100%;
        min-height: max-content;
        min-width: min-content;
    }

    @media (max-width: 1400px) {
        .settings-inner{
            grid-template-columns: minmax(min-content, 1fr) minmax(min-content, 1fr);
        }
    }

    @media (max-width: 550px) {
        .settings{
            overflow-y: auto;
        }
        .settings-inner{
            grid-template-columns: minmax(min-content, 1fr);
            grid-template-rows: repeat(6, 300px);
        }

        .settings-inner::after{
            content: " ";
            display: inline-block;
            grid-area: 7/1/8/2;
            width: 100%;
            height: 1px;
        }
    }
</style>