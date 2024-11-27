<template>
  <v-container fluid class="game-map-management-container">
    <!-- 제목 -->
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <h1 class="title">게임 맵 관리</h1>
      </v-col>
    </v-row>

    <!-- 게임 맵 카드 리스트 -->
    <v-row>
      <v-col cols="12" v-if="games.length === 0">
        <p class="no-games-text">
          저장된 게임이 없습니다. 새 게임을 추가해보세요!
        </p>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="(game, index) in games"
        :key="index"
      >
        <v-card outlined class="game-card">
          <v-card-title>{{ game.name }}</v-card-title>
          <v-card-subtitle>
            제한 시간: {{ game.time }}분 | 최대 인원: {{ game.maxPlayers }}
          </v-card-subtitle>
          <v-card-text>
            <p>{{ game.announcement }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="goToGameDetail(index)"
              >게임 실행</v-btn
            >
            <div class="spacer"></div>
            <v-btn class="edit-btn" color="info" @click="editGame(index)"
              >수정</v-btn
            >
            <v-btn color="error" @click="deleteGame(index)">삭제</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// Vue Router 사용
const router = useRouter();

// 게임 데이터 (예제 데이터를 초기값으로 제공)
const games = ref([
  {
    id: 1,
    name: "9반의 역삼동 보물찾기",
    time: 120,
    maxPlayers: 30,
    announcement: "역삼동 전역에 숨겨진 보물을 찾아보세요!",
    markers: [
      {
        type: "보물",
        content: "첫 번째 보물",
        position: { lat: 37.5, lng: 127.0 },
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
        position: { lat: 33.4, lng: 126.5 },
      },
    ],
  },
]);

// 게임 상세 페이지로 이동
const goToGameDetail = (index) => {
  router.push({
    name: "gameDetail",
    params: { id: games.value[index].id },
  });
};

// 게임 수정
const editGame = (index) => {
  alert(`게임 '${games.value[index].name}' 수정 기능은 준비 중입니다.`);
};

// 게임 삭제
const deleteGame = (index) => {
  if (confirm(`게임 '${games.value[index].name}'을(를) 삭제하시겠습니까?`)) {
    games.value.splice(index, 1);
    alert("게임이 삭제되었습니다.");
  }
};
</script>

<style scoped>
.game-map-management-container {
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

.no-games-text {
  text-align: center;
  font-size: 1.2rem;
  color: #555;
}

.game-card {
  margin: 10px;
  background: #f9f9f9;
}

.game-card .v-card-title {
  font-weight: bold;
  font-size: 1.2rem;
}

.game-card .v-card-text {
  font-size: 0.9rem;
  color: #666;
}

.v-card-actions {
  display: flex;
  align-items: center;
}

.spacer {
  flex-grow: 1; /* 빈 공간 생성 */
}

.edit-btn {
  margin-right: 10px; /* 수정 버튼 오른쪽으로 약간의 간격 추가 */
}
</style>
