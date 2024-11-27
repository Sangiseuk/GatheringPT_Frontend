<template>
  <v-container fluid class="game-result-container">
    <!-- 제목 -->
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <h1 class="title">{{ game.name }}</h1>
      </v-col>
    </v-row>

    <!-- 날짜 및 시간 정보 -->
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <p class="game-info">
          날짜: {{ game.date }} <br />
          시작 시간: {{ game.startTime }} <br />
          종료 시간: {{ game.endTime }}
        </p>
      </v-col>
    </v-row>

    <!-- 캐러셀 -->
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <v-carousel cycle hide-delimiters show-arrows-on-hover class="carousel">
          <v-carousel-item v-for="(image, index) in game.images" :key="index">
            <div class="carousel-image-wrapper">
              <img :src="image" alt="Game Image" class="carousel-image" />
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const game = {
  id: 1,
  name: "9반의 역삼동 보물찾기",
  date: "2024-11-25",
  startTime: "14:00",
  endTime: "16:00",
  images: [
    new URL("@/assets/treasure.png", import.meta.url).href, // 이미지 경로 1
    new URL("@/assets/treasure.png", import.meta.url).href, // 이미지 경로 2
    new URL("@/assets/treasure.png", import.meta.url).href, // 이미지 경로 3
  ],
};
</script>

<style scoped>
.game-result-container {
  background: linear-gradient(to bottom, white 60%, #a1834a);
  min-height: 100vh;
  padding: 20px;
}

.title {
  color: #795013;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.game-info {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 20px;
}

.carousel {
  max-width: 800px;
  max-height: 400px;
  border-radius: 8px;
  overflow: hidden;
}

.carousel-image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 부모 높이에 맞추어 중앙 정렬 */
  margin-top: 0px;
}

.carousel-image {
  max-width: 100%; /* 이미지 크기 제한 */
  height: auto;
  object-fit: cover; /* 이미지 비율 유지하며 맞춤 */
}
</style>
