

<template>
  <div id="app" class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <Navbar />
    <main class="pt-16">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <FooterBar />
    <ExitIntent />
    <Advertisement />
  </div>
</template>

<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import FooterBar from "./components/FooterBar.vue";
import ExitIntent from "./components/ExitIntent.vue";
import Advertisement from "./components/Advertisement.vue";
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
