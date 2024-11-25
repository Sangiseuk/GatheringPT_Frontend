<template>
    <v-container class="d-flex justify-center align-center" style="min-height: 100vh">
        <v-card class="input-card" max-width="400px" elevation="2">
            <v-card-text>
                <v-text-field v-model="nickname" label="닉네암" outlined dense :rules="[(v) => !!v || '닉네임을 입력해주세요']" />
                <v-btn @click="gotoStartGame" color="#795013" block>게임 참가</v-btn>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const nickname = ref("");

const gotoStartGame = () => {
    if (nickname.value) {
        router.push("/joinGame/nickname");
    }
};

</script>

<style scoped>
.input-card {
    max-width: 500px;
    width: 80%;
}
</style>