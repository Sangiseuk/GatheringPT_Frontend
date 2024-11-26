<script setup>
// import NavBar from '@/components/NavBar.vue';
</script>

<template>
    <v-app>
        <div class="background-container">
            <router-view></router-view>
        </div>
    </v-app>
</template>

<style scoped>
.background-container {
    background-image: url('@/assets/paper.png');
    background-size: auto;
    background-position: center;
    width: 100%;
    height: 100%;
    position: absolute;
}
</style>
