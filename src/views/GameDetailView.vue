<template>
  <v-container fluid class="game-detail-container">
    <!-- 제목 -->
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <h1 class="title">{{ game?.name }}</h1>
      </v-col>
    </v-row>

    <!-- 게임 정보 -->
    <v-row>
      <v-col cols="6">
        <p><strong>제한 시간:</strong> {{ game?.time }}분</p>
      </v-col>
      <v-col cols="6">
        <p><strong>최대 인원:</strong> {{ game?.maxPlayers }}명</p>
      </v-col>
    </v-row>

    <!-- 공지사항 카드 -->
    <v-row>
      <v-col cols="12">
        <v-card outlined class="announcement-card">
          <v-card-title>
            <strong>공지사항</strong>
          </v-card-title>
          <v-card-text>
            <span>{{
              isExpanded ? game?.announcement : shortenedAnnouncement
            }}</span>
            <v-btn small text class="toggle-btn" @click="toggleAnnouncement">
              {{ isExpanded ? "간단히 보기" : "전체 보기" }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 지도 -->
    <v-row>
      <v-col cols="12">
        <div id="map" class="map-container"></div>
      </v-col>
    </v-row>

    <!-- 게임 시작 버튼 -->
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <v-btn color="success" @click="startGame">게임 시작</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const game = ref(null);
let map = null;
const isExpanded = ref(false);

// 공지사항 길이를 제한
const shortenedAnnouncement = computed(() =>
  game.value?.announcement.length > 50
    ? game.value.announcement.substring(0, 50) + "..."
    : game.value?.announcement
);

// 공지사항 토글
const toggleAnnouncement = () => {
  isExpanded.value = !isExpanded.value;
};

// 게임 데이터 (임시 저장소)
const allGames = [
  {
    id: 1,
    name: "9반의 역삼동 보물찾기",
    time: 120,
    maxPlayers: 30,
    announcement:
      "싸피 9반 여러분, 이번 보물찾기 대작전은 단순한 게임을 넘어 여러분의 추억 속 가장 빛나는 장면으로 기억될 것입니다. 팀원들과 협력하며, 여러분만의 보물을 꼭 손에 넣으세요. 끝까지 열심히 달려온 여러분을 응원합니다! 이제 마지막 도전, 보물찾기 대작전에 여러분의 모든 것을 걸어보세요!",
    markers: [
      {
        type: "보물",
        content: "첫 번째 보물",
        position: { lat: 37.500008, lng: 127.03508 },
      },
      {
        type: "이벤트",
        content: "특별 이벤트",
        position: { lat: 37.6, lng: 127.1 },
      },
    ],
  },
  {
    id: 2,
    name: "제주도 정복하기!",
    time: 45,
    maxPlayers: 10,
    announcement: "제주도에서 탈출하기 위한 단서를 찾으세요!",
    markers: [
      {
        type: "보물",
        content: "숨겨진 보물",
        position: { lat: 37.500008, lng: 127.03508 },
      },
    ],
  },
];

// 페이지 로드 시 게임 데이터 가져오기 및 지도 초기화
onMounted(() => {
  const gameId = 1; // 예시로 ID 1인 게임 데이터 로드
  game.value = allGames.find((g) => g.id === gameId);

  if (game.value) {
    map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(
        game.value.markers[0]?.position.lat,
        game.value.markers[0]?.position.lng
      ),
      zoom: 13,
    });

    // 마커 추가
    game.value.markers.forEach((marker) => {
      new naver.maps.Marker({
        position: new naver.maps.LatLng(
          marker.position.lat,
          marker.position.lng
        ),
        map: map,
        title: marker.content,
      });
    });
  }
});

// 게임 시작
const startGame = () => {
  alert(`게임 '${game.value.name}'이 시작되었습니다!`);
};
</script>
<style scoped>
.game-detail-container {
  background: linear-gradient(to bottom, white 60%, #a1834a);
  min-height: 100vh;
  padding: 20px;
}

.title {
  color: #795013;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}

.announcement-card {
  margin-top: 00px; /* 제한 시간 줄과 공지사항 카드 사이 공백 감소 */
  margin-bottom: 00px; /* 공지사항 카드와 지도 사이 공백 감소 */
  padding: 10px;
}

.map-container {
  width: 100%;
  height: 450px;
  margin-top: 0px; /* 공지사항 카드와 지도 사이 추가 여백 감소 */
  border: 2px solid #795013;
  border-radius: 8px;
}

.toggle-btn {
  margin-left: 10px;
  font-size: 0.8rem;
  color: #795013;
}
</style>
