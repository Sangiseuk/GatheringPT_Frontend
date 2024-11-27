<template>
  <v-container fluid class="game-map-management-container">
    <!-- 제목 -->
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <h1 class="title">종료된 게임 관리</h1>
      </v-col>
    </v-row>

    <!-- 종료된 게임 카드 리스트 -->
    <v-row>
      <v-col cols="12" v-if="finishedGames.length === 0">
        <p class="no-games-text">종료된 게임이 없습니다.</p>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="(game, index) in finishedGames"
        :key="index"
      >
        <v-card outlined class="game-card">
          <v-card-title>{{ game.name }}</v-card-title>
          <v-card-subtitle>
            날짜: {{ game.date }} | 참여 인원: {{ game.participants }}명
          </v-card-subtitle>
          <v-card-text>
            <p>{{ game.summary }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="viewGameDetails(index)"
              >결과 보기</v-btn
            >
            <div class="spacer"></div>
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

// 종료된 게임 데이터 (임의 데이터)
const finishedGames = ref([
  {
    id: 1,
    name: "9반의 역삼동 보물찾기",
    date: "2024-11-25",
    participants: 25,
    summary: "역삼동 전역에서 숨겨진 보물을 찾아 보물을 찾아보세요.",
  },
  {
    id: 2,
    name: "제주도 정복하기!",
    date: "2024-10-15",
    participants: 10,
    summary: "제주도에서 탈출하기 위한 단서를 찾으세요.",
  },
  {
    id: 3,
    name: "도심 속 힐링 보물찾기",
    date: "2024-09-05",
    participants: 15,
    summary: "서울 도심에서 힐링하며 즐길 수 있는 보물찾기를 진행했습니다.",
  },
]);

// 게임 상세 결과 보기
const viewGameDetails = (index) => {
  alert(`'${finishedGames.value[index].name}' 결과 보기 기능은 준비 중입니다.`);
};

// 게임 삭제
const deleteGame = (index) => {
  if (
    confirm(
      `종료된 게임 '${finishedGames.value[index].name}'을(를) 삭제하시겠습니까?`
    )
  ) {
    finishedGames.value.splice(index, 1);
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
</style>
