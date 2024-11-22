<template>
  <v-container fluid class="content-container">
    <v-row class="button-row" justify="center" align="center"> </v-row>
    <v-col cols="12" class="text-center">
      <p class="intro-text">
        잃어버린 보물을 찾아보는 즐거운 시간! <br />
        여러분만의 보물을 발견할 준비가 되셨나요?
      </p>
    </v-col>
  </v-container>
</template>

<script setup>
import BigLogo from "@/assets/BigLogo.png";

import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<style scoped>
.big-logo {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.content-container {
  width: 100%;
  padding-top: 64px;
  background: #a1834a;
  object-fit: contain;
}

.intro-text {
  font-size: 25px;
  font-weight: bold;
  color: black;
  margin-bottom: 24px;
}

@media (max-width: 600px) {
  .big-logo {
    max-width: 80%;
  }

  .content-container {
    padding-top: 56px;
    /* 모바일 화면에서 앱바 높이를 고려한 여백 조정 */
  }

  .game-btn {
    font-size: 8px;
    height: 3vh;
  }

  .intro-text {
    font-size: 15px;
    margin-bottom: 16px;
  }
}
</style>
