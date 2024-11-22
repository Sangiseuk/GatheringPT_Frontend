<template>
  <v-container
    class="d-flex justify-center align-center"
    style="min-height: 100vh"
  >
    <v-card class="input-card" max-width="400px" elevation="2">
      <v-card-text>
        <v-text-field
          v-model="gamePin"
          label="게임 PIN"
          outlined
          dense
          :rules="[(v) => !!v || '올바른 게임 PIN을 입력해주세요']"
        />
        <v-btn @click="gotoInsertNickname" color="#795013" block>입력</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const user = ref({
  email: "",
  password: "",
});

const gotoInsertNickname = () => {
  router.push("/joinGame");
};
</script>

<style scoped>
.input-card {
  max-width: 500px;
  width: 80%;
}
</style>
