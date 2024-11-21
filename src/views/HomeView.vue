<script setup>
import NavBar from '@/components/NavBar.vue';
import PlayButtons from '@/components/main/PlayButtons.vue';
import ExplainService from '@/components/main/ExplainService.vue';
</script>

<template>
  <v-app>
    <NavBar></NavBar>

    <v-row no-gutters class="content-row">
      <PlayButtons></PlayButtons>
    </v-row>

    <v-row no-gutters class="content-row">
      <ExplainService></ExplainService>
    </v-row>

    <router-view></router-view>
  </v-app>
</template>

<style scoped>
.content-row {
  margin: 0 !important;
  padding: 0 !important;
}
</style>
