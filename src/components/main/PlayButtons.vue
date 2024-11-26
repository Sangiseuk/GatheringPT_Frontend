<template>
    <v-container fluid class="content-container">
        <v-row>
            <v-col cols="6" offset="4" class="d-flex justify-center">
                <img :src="BigLogo" alt="Big Logo" class="big-logo" />
            </v-col>
        </v-row>

        <v-row class="button-row" justify="center" align="center">
            <!-- 첫 번째 버튼 -->
            <v-col cols="3" class="d-flex justify-center">
                <v-btn @click="gotoJoinGameView" color="#795013" block class="game-btn">Join Game</v-btn>
            </v-col>

            <!-- 두 번째 버튼 -->
            <v-col cols="3" class="d-flex justify-center">
                <v-btn @click="gotoCreateGameView" color="#795013" block class="game-btn">Create Game</v-btn>
            </v-col>
        </v-row>
    </v-container>
    <!-- 메인 콘텐츠 -->
    <v-main>
        <router-view></router-view>
    </v-main>
</template>

<script setup>
import BigLogo from "@/assets/BigLogo.png";

import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const user = ref({
    email: "",
    password: "",
});

const gotoJoinGameView = () => {
    router.push("/joinGame");
};

const gotoCreateGameView = () => {
    router.push("/create-game");
};
</script>

<style scoped>
.big-logo {
    width: 100%;
    height: auto;
    object-fit: contain;
}

.content-container {
    padding-top: 60px;
    background: linear-gradient(to bottom, white 70%, #a1834a);
    min-height: 50vh;
    object-fit: contain;
}

.game-btn {
    font-size: 14px;
    height: 5vh;
}

@media (max-width: 600px) {
    .big-logo {
        max-width: 80%;
    }

    .content-container {
        padding-top: 56px;
        min-height: 20vh;
    }

    .game-btn {
        font-size: 8px;
        height: 3vh;
    }
}
</style>
