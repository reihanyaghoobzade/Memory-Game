import { createApp } from "vue";
import { createStore } from "vuex";

export const store = createStore({
    state: {
        info: {
            counter: 40,
            minutes: 2,
            seconds: 0,
            done: false,
            firstChoice: null,
            secondChoice: null,
            activeTimer: true,
            config: true
        },
    },
    mutations: {
        changeInfo(state, { key, value }) {
            state.info[key] = value;
        },
    },
    getters: {
        getInfo(state) {
            return state.info;
        },
    },
});