import {createStore} from 'vuex'

export default createStore({
    state() {
        return {
            notifications: [     //Хранит в себе все уведомления
            ],
            userData:{
                dateData:{
                    AmPmType: false,
                    timeZoneOffset: null,
                    selectedTimeZone: null,
                },
                weatherData:{
                    useIpLocation : false,
                    location: "",
                    oldLocation: "not_city",
                    userSelectedLocation: "",
                    weatherUpdateTiming: 20,
                    lat: null,
                    lon: null,
                }
            }
        }
    },
    mutations: {
        addNotification(state, data) {
            state.notifications.unshift(data)
        },
        deleteNotification(state, props) {
            if (!props) {
                let index = state.notifications.findIndex(i => i.deletable === true)
                if (index >= 0)
                    state.notifications.splice(index, 1)
                return index
            }
            let index = state.notifications.findIndex(i => i.id === props.id)
            if (state.notifications[index].deletable)
                state.notifications.splice(index, 1)
        }
    },
    actions: {
        clearNotifications(state) {
            let oldLength = state.state.notifications.length
            while (state.state.notifications.length > 0) {
                state.commit("deleteNotification")
                if (oldLength === state.state.notifications.length) {
                    break
                }
                oldLength = state.state.notifications.length
            }
        }
    },
    modules: {}
})
