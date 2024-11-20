<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <v-app ref="app">
    <!-- <v-app-bar></v-app-bar>
    <v-main></v-main>
    <v-footer></v-footer> -->
    <router-view></router-view>
  </v-app>
</template>

<style scoped></style>
