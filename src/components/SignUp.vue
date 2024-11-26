<template>
  <div class="container">
    <v-card class="signUpCard border-warning" border="double xl" variant="outlined">
      <div class="signUpDiv">
        <!--본문-->
        <v-img max-width="900" :aspect-ratio="4 / 3" :src="loginImg" class="loginImg"></v-img>
        <div class="signUpFormDiv">
          <!-- 회원가입 폼 내용 -->
          <v-row class="my-2" align="center">
            <v-img max-width="900" :aspect-ratio="4 / 3" :src="loginImg" class="loginImgSmall transx"></v-img>
            <h1 class="font-weight-bold mx-2">SIGN UP</h1>
            <v-img max-width="900" :aspect-ratio="4 / 3" :src="loginImg" class="loginImgSmall"></v-img>
          </v-row>
          <p class="mb-3">채집PT에 오신것을 환영합니다.</p>

          <v-text-field width="90%" label="email" v-model="user.email" variant="outlined"
            density="compact"></v-text-field>

          <v-text-field width="90%" label="password" v-model="user.password" variant="outlined" density="compact"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
            @click:append-inner="visible = !visible"></v-text-field>

            <v-text-field width="90%" label="Nickname" v-model="user.nickname" variant="outlined"
            density="compact"></v-text-field>

          <v-btn class="signup-btn" @click="goToLogin" outlined>SIGN UP</v-btn>
          <img class="kakao-login-btn" src="@/assets/kakao_login.png" @click="goToKakaoLogin" alt="Kakao Login"></img>

          <div class="divider mt-2 mb-2">
            <v-divider>Or</v-divider>
            이미 계정이 있으신가요?
            <span class="loginText" @click="goToLoginForm">로그인</span>
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

const goToLoginForm = () => {
    router.push('/login');
};
</script>

<style scoped>
/* 화면 전체를 차지하는 부모 컨테이너 */
.container {
  display: flex;
  justify-content: center;
  /* 가로 중앙 정렬 */
  align-items: center;
  /* 세로 중앙 정렬 */
  height: 100vh;
  /* 화면 전체 높이 */
}

/* 카드 스타일 */
.signUpCard {
  width: 600px;
  padding: 2em;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  border: #d69533;
}

.signUpDiv {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  grid-gap: 1rem;
}

.signUpFormDiv {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.signup-btn {
  background-color: #795013;
  color: white;
  width: 100%;
}

.kakao-login-btn {
  cursor: pointer;
  width: 100%;
  max-width: 300px;
  height: 48px;
  /* 일반 로그인 버튼과 동일한 높이 설정 */
  object-fit: contain;
  /* 이미지가 비율에 맞게 잘리도록 설정 */
  margin-top: 10px;
}

.loginText{
  color: #795013;
  text-decoration: underline;
  cursor: pointer;
}

/* 핸드폰처럼 긴 화면에서 이미지가 위로 가게 하기 위한 미디어 쿼리 */
@media (max-width: 768px) {
  .signUpDiv {
    display: flex;
    flex-direction: column;
    /* 모바일 화면에서는 세로로 배치 */
    justify-content: center;
  }

  .loginImg {
    display: none;
  }

  .loginImgSmall {
    width: 32px;
    height: 32px;
  }

  .transx {
    transform: scaleX(-1);
    /* 좌우 반전 */
  }

  /* 로그인 카드의 크기를 줄여서 모바일에서 더 잘 보이게 함 */
  .signUpCard {
    width: 90%;
    padding: 1.5em;
  }

  /* 이미지 스타일: 모바일에서 이미지가 위로 오도록 */
  .signUpDiv v-img {
    width: 100%;
    max-width: none;
    /* 최대 너비 제거 */
    margin-bottom: 1em;
    /* 이미지와 폼 사이 간격 추가 */
  }
}
</style>
