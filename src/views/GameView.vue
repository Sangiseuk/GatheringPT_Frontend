<template>
  <v-container fluid class="participant-container">
    <!-- 제목 -->
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <h1 class="title">건강미소님</h1>
      </v-col>
    </v-row>

    <!-- 지도 -->
    <v-row>
      <v-col cols="12">
        <div id="map" class="map-container"></div>
      </v-col>
    </v-row>

    <!-- 버튼 -->
    <v-row class="button-row">
      <v-col cols="4" class="d-flex justify-center">
        <v-btn color="#795013" outlined @click="startTreasureHunt"
          >보물 찾기</v-btn
        >
      </v-col>
      <v-col cols="4" class="d-flex justify-center">
        <v-btn color="#795013" outlined @click="sendPhoto">사진 전송</v-btn>
      </v-col>
      <v-col cols="4" class="d-flex justify-center">
        <v-btn color="#795013" outlined @click="viewFoundTreasures"
          >내 보물</v-btn
        >
      </v-col>
    </v-row>

    <!-- 카드 알림 -->
    <v-row v-if="showAlert" class="mt-4">
      <v-col cols="12" class="d-flex justify-center">
        <v-card class="alert-card" elevation="3">
          <v-card-text class="d-flex justify-center">
            게임 구역을 벗어났습니다.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";

let map = null;
const showAlert = ref(false);

// 지도 초기화
onMounted(() => {
  map = new naver.maps.Map("map", {
    center: new naver.maps.LatLng(37.5665, 126.978),
    zoom: 13,
  });
});

// 버튼 클릭 이벤트
const startTreasureHunt = () => {
  alert("보물찾기를 시작합니다!");
};

const sendPhoto = () => {
  alert("사진 전송 기능을 준비 중입니다.");
};

const viewFoundTreasures = () => {
  showAlert.value = true;
  setTimeout(() => {
    showAlert.value = false;
  }, 3000); // 3초 후에 알림 사라짐
};
</script>

<style scoped>
.participant-container {
  background: linear-gradient(to bottom, white 60%, #a1834a);
  min-height: 100vh;
  padding: 20px;
}

.map-container {
  width: 100%;
  height: 500px;
  border: 2px solid #795013;
  border-radius: 8px;
}

.title {
  color: #795013;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}

.button-row {
  margin-top: 20px;
}

.alert-card {
  background-color: #fff3e0;
  color: #795013;
  border: 1px solid #ffcc80;
  border-radius: 8px;
  padding: 10px 20px;
  width: 300px;
  text-align: center;
}
</style>
