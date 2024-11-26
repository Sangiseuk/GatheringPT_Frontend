<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';  // useRouter를 import하여 라우터 인스턴스 얻기

const router = useRouter();
const isLoggedIn = ref(false);

// 로그인 폼으로 이동하는 함수
const goToLoginForm = () => {
    router.push('/login');
};

// 회원가입 폼으로 이동하는 함수 
const showSignupForm = () => {
    router.push('/signUp');
};

// 로그아웃 처리 함수
const logout = () => {
    isLoggedIn.value = false;
    router.push('/');
};
</script>

<template>
    <v-app-bar class="nav-bar" elevation="0">
        <v-spacer></v-spacer>
        <!-- 회원가입 버튼 -->
        <v-btn class="signup-btn mx-1" v-if="!isLoggedIn" @click="showSignupForm">
            회원가입
        </v-btn>

        <!-- 로그인 버튼 -->
        <v-btn class="login-btn mx-1" v-if="!isLoggedIn" @click="goToLoginForm">
            로그인
        </v-btn>

        <!-- 로그아웃 버튼 -->
        <v-btn class="logout-btn" v-if="isLoggedIn" @click="logout">
            <p class="font-weight-bold">로그아웃</p>
        </v-btn>
    </v-app-bar>
</template>

<style scoped>
.nav-bar {
    width: 100%;
}

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

@media (max-width: 600px) {
    .nav-bar {
        height: 50px;
    }

    .login-btn,
    .signup-btn,
    .logout-btn {
        font-size: 11px;
        padding: 4px 8px;
        border-radius: 20px;
        height: 3vh;
        justify-content: center;
        margin-top: -10px;
    }
}
</style>
