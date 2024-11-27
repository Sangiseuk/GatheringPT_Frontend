<template>
  <v-container fluid class="host-container">
    <!-- 제목 -->
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <h1 class="title">주최자 콘솔</h1>
      </v-col>
    </v-row>

    <!-- 지도 -->
    <v-row>
      <v-col cols="12">
        <div id="map" class="map-container"></div>
      </v-col>
    </v-row>

    <!-- 관리 패널 -->
    <v-row class="control-panel">
      <!-- 제한 시간 설정과 종료 버튼 -->
      <v-col cols="12" class="d-flex align-center justify-center gap-3">
        <v-text-field
          label="게임 제한 시간 (분)"
          v-model="gameTime"
          type="number"
          outlined
          class="time-field"
        ></v-text-field>
        <v-btn color="#795013" outlined @click="updateGameTime">
          제한 시간 설정
        </v-btn>
        <v-btn color="#e53935" outlined @click="endGame"> 게임 종료 </v-btn>
      </v-col>
    </v-row>

    <!-- 공지사항 -->
    <v-row>
      <v-col cols="12" class="d-flex flex-column align-center">
        <v-textarea
          label="공지사항"
          v-model="announcement"
          outlined
          class="announcement-field"
        ></v-textarea>
        <v-btn color="#795013" outlined @click="sendAnnouncement">
          공지사항 발송
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";

let map = null;
const gameTime = ref(30); // 초기 제한 시간 (분)
const announcement = ref("");
const participants = ref([
  { id: 1, name: "참가자1", lat: 37.5665, lng: 126.978 },
  { id: 2, name: "참가자2", lat: 37.567, lng: 126.979 },
]); // 참가자 위치 데이터
const markers = ref([]); // 지도 마커 데이터

// 지도 초기화
onMounted(() => {
  map = new naver.maps.Map("map", {
    center: new naver.maps.LatLng(37.5665, 126.978),
    zoom: 13,
  });

  // 참가자 위치 표시
  participants.value.forEach((participant) => {
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(participant.lat, participant.lng),
      map: map,
      title: participant.name,
    });

    markers.value.push(marker);
  });

  // 테스트용 마커 추가
  addTestMarkers();
});

// 테스트용 마커 추가 함수
const addTestMarkers = () => {
  const testMarkers = [
    { id: 1, lat: 37.500008, lng: 127.03508, isPublic: true },
    { id: 2, lat: 37.567, lng: 126.979, isPublic: false },
  ];

  testMarkers.forEach((markerData) => {
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(markerData.lat, markerData.lng),
      map: map,
    });

    // 마커 클릭 이벤트
    naver.maps.Event.addListener(marker, "click", () => {
      toggleMarkerVisibility(markerData);
    });

    markers.value.push(marker);
  });
};

// 마커 공개/비공개 토글 함수
const toggleMarkerVisibility = (markerData) => {
  markerData.isPublic = !markerData.isPublic;
  alert(
    `마커 #${markerData.id}의 상태가 ${
      markerData.isPublic ? "공개" : "비공개"
    }로 변경되었습니다.`
  );
};

// 제한 시간 업데이트 함수
const updateGameTime = () => {
  alert(`게임 제한 시간이 ${gameTime.value}분으로 설정되었습니다.`);
};

// 공지사항 발송 함수
const sendAnnouncement = () => {
  alert(`공지사항 발송: "${announcement.value}"`);
};

// 게임 종료 함수
const endGame = () => {
  alert("게임이 종료되었습니다.");
};
</script>

<style scoped>
.host-container {
  background: linear-gradient(to bottom, white 60%, #a1834a);
  min-height: 100vh;
  padding: 20px;
}

.map-container {
  width: 100%;
  height: 400px;
  border: 2px solid #795013;
  border-radius: 8px;
}

.title {
  color: #795013;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}

.control-panel {
  margin-top: 20px;
}

.time-field {
  max-width: 200px;
}

.announcement-field {
  max-width: 500px;
  width: 100%;
}
</style>
