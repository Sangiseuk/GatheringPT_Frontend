<template>
  <div class="container">
    <v-card
      class="loginCard border-warning"
      border="double xl"
      variant="outlined"
    >
      <div class="loginDiv">
        <!--본문-->
        <v-img max-width="900" :aspect-ratio="4 / 3" :src="loginImg"></v-img>
        <div class="loginFormDiv">
          <!-- 로그인 폼 내용 -->
          <h1 class="font-weight-bold">LOG IN</h1>
          <p class="mb-3">이메일과 비밀번호를 입력해주세요.</p>

          <v-text-field
            width="90%"
            label="email"
            v-model="user.email"
            variant="outlined"
            density="compact"
          ></v-text-field>

          <v-text-field
            width="90%"
            label="password"
            v-model="user.password"
            variant="outlined"
            density="compact"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            @click:append-inner="visible = !visible"
          ></v-text-field>

          <v-btn class="login-btn" @click="goToLogin" outlined>LOG IN</v-btn>
          <div class="divider mt-2 mb-2">
            <v-divider>Or</v-divider>
            계정이 없으신가요?
            <span class="pink" @click="goToSignUp">회원가입</span>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import loginImg from "@/assets/login_left.png";

import { ref } from "vue";
import { useRouter } from "vue-router";

const visible = ref(false);
const router = useRouter();

const user = ref({
  email: "",
  password: "",
});
</script>

<style scoped>
/* 화면 전체를 차지하는 부모 컨테이너 */
.container {
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  height: 100vh; /* 화면 전체 높이 */
  /*background-color: #f5f5f5; /* 선택적으로 배경색 추가 */
}

/* 카드 스타일 */
.loginCard {
  width: 600px;
  padding: 2em;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  border: #d69533;
}

/* 로그인 폼 스타일 */
.loginDiv {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
}

.login-btn {
  background-color: #795013;
  color: white;
  width: 100%;
}

.pink {
  color: #d69533;
  cursor: pointer;
  text-decoration: underline;
}
</style>
