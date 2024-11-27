<template>
  <v-container fluid class="end-game-container">
    <!-- 제목 -->
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <h1 class="end-title">게임이 종료되었습니다!</h1>
      </v-col>
    </v-row>

    <!-- 이미지 카드 갤러리 -->
    <v-row class="gallery-row" justify="center">
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="(image, index) in images"
        :key="index"
        class="d-flex justify-center"
      >
        <v-card class="gallery-card" outlined>
          <v-img :src="image" class="gallery-image" aspect-ratio="1.6"></v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const images = [
  new URL("@/assets/treasure.png", import.meta.url).href,
  new URL("@/assets/paper.png", import.meta.url).href,
  new URL("@/assets/kakao_login.png", import.meta.url).href,
];
</script>

<style scoped>
.end-game-container {
  background: linear-gradient(to bottom, white 60%, #a1834a);
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.end-title {
  color: #795013;
  margin-top: 100px;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}

.gallery-row {
  margin-top: 20px;
  width: 100%;
}

.gallery-card {
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.gallery-card:hover {
  transform: scale(1.05);
}

.gallery-image {
  object-fit: cover;
}
</style>
