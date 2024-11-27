<template>
  <v-container
    class="d-flex flex-column justify-center align-center"
    style="min-height: 100vh; text-align: center"
  >
    <!-- 닉네임과 메시지 -->
    <h2 class="nickname-text">건강미소님, <br />잠시 대기해주세요...</h2>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const nickname = ref("");

// 닉네임 가져오기
onMounted(() => {
  nickname.value = route.query.nickname || "익명"; // 닉네임 없으면 '익명' 표시
});
</script>

<style scoped>
.nickname-text {
  color: #795013;
  font-size: 2rem; /* 텍스트 크기를 크게 조정 */
  font-weight: bold;
  text-align: center;
  margin-top: 200px; /* 위쪽 여백 추가 */
}
</style>
