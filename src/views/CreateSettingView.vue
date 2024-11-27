<template>
  <v-container fluid class="game-settings-container">
    <!-- 제목 -->
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <h1 class="title">게임 환경 설정</h1>
      </v-col>
    </v-row>

    <!-- 게임 설정 입력 -->
    <v-row class="info-row">
      <v-col cols="12">
        <v-form ref="gameSettingsForm">
          <!-- 제한 시간 및 최대 인원 -->
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="gameTime"
                label="제한 시간 (분)"
                type="number"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="maxPlayers"
                label="게임 최대 인원"
                type="number"
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- 공지사항 -->
          <v-row>
            <v-col cols="12">
              <v-textarea
                spellcheck="false"
                v-model="announcement"
                label="게임 공지사항"
                outlined
                rows="10"
                required
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>

    <!-- 저장 버튼 -->
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <v-btn @click="saveSettings" color="#795013">설정 저장</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

// 게임 설정 데이터
const gameTime = ref(0); // 제한 시간
const maxPlayers = ref(0); // 최대 인원
const announcement = ref(""); // 공지사항

// 설정 저장 함수
const saveSettings = () => {
  if (gameTime.value <= 0 || maxPlayers.value <= 0) {
    alert("제한 시간과 최대 인원을 올바르게 입력해주세요.");
    return;
  }

  const gameSettings = {
    time: gameTime.value,
    maxPlayers: maxPlayers.value,
    announcement: announcement.value,
  };

  console.log("Game Settings Saved:", gameSettings);
  alert("게임 설정이 저장되었습니다!");
};
</script>

<style scoped>
.game-settings-container {
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

.info-row {
  margin-top: 20px;
}
</style>
