<script setup>
import NavBar from '@/components/NavBar.vue';
// import ExplainService from '@/main/components/ExplainService.vue';
// import PlayButtons from '@/main/components/PlayButtons.vue';
</script>

<template>
  <v-app ref="app">
    <NavBar></NavBar>
    <!-- <v-main> -->
    <v-container>
      <v-row></v-row>
      <v-row></v-row>

    </v-container>
    <p>main입니다.</p>
    <router-view></router-view>
    <!-- </v-main> -->
  </v-app>
</template>

<style scoped></style>