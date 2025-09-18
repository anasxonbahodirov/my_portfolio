<template>
  <div class="advertisement-container" v-if="showAd">
    <!-- Main Ad Banner -->
    <div class="fixed bottom-4 right-4 z-40 max-w-sm" v-reveal>
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <!-- Ad Header -->
        <div class="bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <div
                class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
              >
                <span class="text-white text-sm font-bold">📢</span>
              </div>
              <span class="text-white font-semibold">Young Coder 💻</span>
            </div>
            <button
              @click="closeAd"
              class="text-white/80 hover:text-white transition-colors"
            >
              <X class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Ad Content -->
        <div class="p-4">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">
            🚀 Dasturlashni o'rganganingizda!
          </h3>
          <p
            class="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed"
          >
            <strong>Young Coder</strong> kanalida HTML, CSS, JavaScript, React
            bo'yicha foydali ma'lumotlar, kodlar, maslahatlar va loyihalar bilan
            tanishing!
          </p>

          <!-- Stats -->
          <div
            class="flex items-center justify-between mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div class="text-center">
              <div class="text-lg font-bold text-brand-600 dark:text-brand-400">
                262+
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400">
                Obunachilar
              </div>
            </div>
            <div class="text-center">
              <div class="text-lg font-bold text-green-600 dark:text-green-400">
                100+
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400">
                Postlar
              </div>
            </div>
            <div class="text-center">
              <div
                class="text-lg font-bold text-purple-600 dark:text-purple-400"
              >
                24/7
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400">
                Qo'llab-quvvatlash
              </div>
            </div>
          </div>

          <!-- CTA Button -->
          <a
            href="https://t.me/next_gen_coder"
            target="_blank"
            rel="noopener noreferrer"
            class="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            📱 Telegram kanalga qo'shilish
          </a>

          <!-- Footer -->
          <div class="mt-3 text-center">
            <p class="text-xs text-gray-500 dark:text-gray-400">
              💡 Birga o'rganganingizda va rivojlanamiz!
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Ad Button (if main ad is closed) -->
    <div v-if="!showAd" class="fixed bottom-4 right-4 z-40">
      <button
        @click="showAd = true"
        class="w-14 h-14 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        title="Young Coder kanalini ko'rish"
      >
        <span class="text-xl">📢</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { X } from "lucide-vue-next";

// State
const showAd = ref(true);

// Methods
const closeAd = () => {
  showAd.value = false;
  localStorage.setItem("adClosed", "true");
};

// Lifecycle
onMounted(() => {
  // Check if ad was previously closed
  const adClosed = localStorage.getItem("adClosed");
  if (adClosed === "true") {
    showAd.value = false;
  }

  // Auto-hide ad after 10 seconds
  setTimeout(() => {
    if (showAd.value) {
      showAd.value = false;
    }
  }, 10000);
});
</script>

<style scoped>
.advertisement-container {
  animation: slideInUp 0.5s ease-out;
}

@keyframes slideInUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.shadow-3xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
</style>
