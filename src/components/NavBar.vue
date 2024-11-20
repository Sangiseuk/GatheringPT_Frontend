<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';  // useRouter를 import하여 라우터 인스턴스 얻기

const router = useRouter();
const isLoggedIn = ref(false);

// 로그인 폼으로 이동하는 함수
const goToLoginForm = () => {
    router.push('/login');  // '/login' 경로로 이동
};

// 회원가입 폼으로 이동하는 함수 (예시로 추가)
const showSignupForm = () => {
    router.push('/signup');  // '/signup' 경로로 이동
};

// 로그아웃 처리 함수
const logout = () => {
    isLoggedIn.value = false;  // 로그아웃 시 isLoggedIn 상태를 false로 변경
    router.push('/');  // 로그아웃 후 메인 페이지로 이동
};
</script>

<template>
    <!-- Vuetify의 v-app으로 감싸기 -->
    <v-app ref="app">
        <!-- 앱바 추가, 'app' 속성으로 고정 -->
        <v-app-bar>
            <v-spacer></v-spacer>
            <!-- 회원가입 버튼 -->
            <v-btn class="signup-btn mx-1" v-if="!isLoggedIn" @click="showSignupForm">
                <p class="font-weight-bold">회원가입</p>
            </v-btn>

            <!-- 로그인 버튼 -->
            <v-btn class="login-btn mx-1" v-if="!isLoggedIn" @click="goToLoginForm">
                <p class="font-weight-bold">로그인</p>
            </v-btn>

            <!-- 로그아웃 버튼 -->
            <v-btn class="logout-btn" v-if="isLoggedIn" @click="logout">
                <p class="font-weight-bold">로그아웃</p>
            </v-btn>
        </v-app-bar>

        <!-- 메인 콘텐츠 -->
        <v-main>
            <router-view></router-view>
        </v-main>

        <!-- 푸터 -->
        <v-footer>
            <!-- 푸터 내용 -->
        </v-footer>
    </v-app>
</template>

<style scoped>
.login-btn {
    border-radius: 25px;
    font-size: 16px;
    border: 2px solid #795013;
    background-color: #795013;
    color: aliceblue;
    font-weight: bold;
    text-align: center;
    justify-content: center;
}

.signup-btn {
    border-radius: 25px;
    font-size: 16px;
    border: 2px solid #795013;
    color: black;
    font-weight: bold;
    text-align: center;
    justify-content: center;
}

.logout-btn {
    border-radius: 25px;
    font-size: 16px;
    border: 2px solid #795013;
    background-color: #795013;
    color: aliceblue;
    font-weight: bold;
    text-align: center;
    justify-content: center;
}
</style>
