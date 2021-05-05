<template>
    <bubbles></bubbles>
    <DevelopmentOnly></DevelopmentOnly>
    <main>
        <router-view/>
        <nav>
            <router-link to="/">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <title>HOME</title>
                    <path d="M32 18.451l-16-12.42-16 12.42v-5.064l16-12.42 16 12.42zM28 18v12h-8v-8h-8v8h-8v-12l12-9z"></path>
                </svg>
            </router-link>
            <router-link to="/Apps">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <title>APPS</title>
                    <path d="M15.984 20.016v-4.031h4.031v4.031h-4.031zM15.984 14.016v-4.031h4.031v4.031h-4.031zM9.984 8.016v-4.031h4.031v4.031h-4.031zM15.984 3.984h4.031v4.031h-4.031v-4.031zM9.984 14.016v-4.031h4.031v4.031h-4.031zM3.984 14.016v-4.031h4.031v4.031h-4.031zM3.984 20.016v-4.031h4.031v4.031h-4.031zM9.984 20.016v-4.031h4.031v4.031h-4.031zM3.984 8.016v-4.031h4.031v4.031h-4.031z"></path>
                </svg>
            </router-link>
            <router-link to="/Info">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <title>INFO</title>
                    <path d="M14 9.5c0-0.825 0.675-1.5 1.5-1.5h1c0.825 0 1.5 0.675 1.5 1.5v1c0 0.825-0.675 1.5-1.5 1.5h-1c-0.825 0-1.5-0.675-1.5-1.5v-1z"></path>
                    <path d="M20 24h-8v-2h2v-6h-2v-2h6v8h2z"></path>
                    <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z"></path>
                </svg>
            </router-link>
        </nav>
    </main>
    <Footer></Footer>
</template>


<script>
    import DevelopmentOnly from "./components/DevelopmentOnly";
    import Bubbles from "./components/bubbles";
    import Footer from "./components/Footer";

    export default {
        name: "app",
        components: {
            Footer,
            Bubbles,
            DevelopmentOnly
        },
        data() {
            const app = document.querySelector("#app")
            return {
                app
            }
        },
        mounted() {
            let rotateTo = 60
            let ctx = this
            setInterval(function () {
                rotateTo += 0.2
                if (rotateTo === 420)
                    rotateTo = 60
                ctx.app.style.background = `linear-gradient(${rotateTo}deg, rgba(63,94,251,1) 0%, rgba(77,171,199,1) 50%, rgba(252,70,107,1) 100%)`
            }, 16)
        },
        methods: {}
    }
</script>


<style>
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        z-index: 10;
        position: relative;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        min-width: 100vw;
        min-height: 100vh;
        background: linear-gradient(60deg, rgba(63, 94, 251, 1) 0%, rgba(77, 171, 199, 1) 50%, rgba(252, 70, 107, 1) 100%);
        overflow: hidden;
        display: grid;
        grid-template-rows: max-content 1fr;
        align-items: center;
        justify-items: center;
    }


    main {
        min-width: 300px;
        width: 80vw;
        max-width: 1400px;
        grid-row: 2/3;
        background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4));
        min-height: 500px;
        height: 70vh;
        border-radius: 40px;
        backdrop-filter: blur(20px);
        display: grid;
        grid-template-columns: 1fr max-content;
        overflow: hidden;
    }

    nav{
        grid-column: 2/3;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4));
        padding: 0 20px;
    }

    nav a {
        fill: #2c3e50;
    }

    nav a.router-link-exact-active {
        fill: cornflowerblue;
    }
    
    @media (max-width: 720px) {
        main{
            grid-template-columns: 1fr;
            grid-template-rows: 1fr max-content;
        }

        nav{
            grid-column: 1/2;
            grid-row: 2/3;
            padding: 20px 0;
            flex-direction: row;
        }
    }

</style>
