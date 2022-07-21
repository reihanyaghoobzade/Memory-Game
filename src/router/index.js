import { createRouter, createWebHistory } from "vue-router";
import GameInfo from "../components/Modal.vue";
import MainGame from "../components/MainGame.vue";
const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
        path: "/",
        component: GameInfo,
        name: 'game-info',
    }, {
        path: "/game",
        component: MainGame,
        name: 'main-game',
    }],
});

export default router;