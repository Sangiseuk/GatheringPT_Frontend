<template>
    <v-container class="content-container">
        <v-row>
            <v-col cols="6" offset="4" class="d-flex justify-center">
                <img :src="BigLogo" alt="Big Logo" class="big-logo" />
            </v-col>
        </v-row>
    </v-container>

    <!-- 메인 콘텐츠 -->
    <v-main>
        <router-view></router-view>
    </v-main>

    <!-- 푸터 -->
    <v-footer>
        <!-- 푸터 내용 -->
    </v-footer>
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
</script>

<style scoped>
.big-logo {
    width: 100%;
    height: auto;
    object-fit: contain;
}

.content-container {
    padding-top: 64px;
    /* 앱바의 높이에 맞춰 여백 추가 */
}

@media (max-width: 600px) {
    .big-logo {
        max-width: 80%;
    }

    .content-container {
        padding-top: 56px;
        /* 모바일 화면에서 앱바 높이를 고려한 여백 조정 */
    }
}
</style>
