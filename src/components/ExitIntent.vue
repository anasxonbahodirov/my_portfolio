<template>
  <div
    v-if="showModal"
    class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
    @click="closeModal"
  >
    <div
      class="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center"
      @click.stop
    >
      <!-- Animated Icon -->
      <div
        class="w-20 h-20 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce"
      >
        <Heart class="w-10 h-10 text-brand-600 dark:text-brand-400" />
      </div>

      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Kuting! 😊
      </h3>

      <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
        Saytdan chiqishdan oldin, bizning loyihalar va fikrlarimizni ko'rib
        chiqdingizmi? Keling, birgalikda ishlaymiz!
      </p>

      <!-- Quick Actions -->
      <div class="space-y-3 mb-6">
        <router-link
          to="/projects"
          @click="closeModal"
          class="block w-full px-6 py-3 bg-brand-600 text-white rounded-xl hover:bg-brand-700 focus-ring transition-colors font-medium"
        >
          🚀 Loyihalarimni ko'rish
        </router-link>

        <router-link
          to="/fikrlar"
          @click="closeModal"
          class="block w-full px-6 py-3 border-2 border-brand-600 text-brand-600 dark:text-brand-400 rounded-xl hover:bg-brand-50 dark:hover:bg-brand-900/20 focus-ring transition-colors font-medium"
        >
          💡 Fikrlarimni o'qish
        </router-link>
      </div>

      <!-- Social Links -->
      <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">
          Ijtimoiy tarmoqlarda ham kuzatib boring:
        </p>

        <div class="flex justify-center space-x-4">
          <a
            href="#"
            class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-brand-100 dark:hover:bg-brand-900/30 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            title="GitHub"
          >
            <Github class="w-5 h-5" />
          </a>

          <a
            href="#"
            class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-brand-100 dark:hover:bg-brand-900/30 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            title="LinkedIn"
          >
            <Linkedin class="w-5 h-5" />
          </a>

          <a
            href="#"
            class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-brand-100 dark:hover:bg-brand-900/30 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            title="Telegram"
          >
            <MessageCircle class="w-5 h-5" />
          </a>
        </div>
      </div>

      <!-- Close Button -->
      <button
        @click="closeModal"
        class="mt-6 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
      >
        Yaxshi, davom etaman
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Heart, Github, Linkedin, MessageCircle } from "lucide-vue-next";

// State
const showModal = ref(false);
const hasShownModal = ref(false);

// Methods
const closeModal = () => {
  showModal.value = false;
  hasShownModal.value = true;
  localStorage.setItem("exitIntentShown", "true");
};

const handleMouseLeave = (event: MouseEvent) => {
  // Faqat yuqori qismdan chiqishda modal ko'rsatish
  if (event.clientY <= 0 && !hasShownModal.value) {
    const hasShown = localStorage.getItem("exitIntentShown");
    if (!hasShown) {
      showModal.value = true;
    }
  }
};

const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  if (!hasShownModal.value) {
    const hasShown = localStorage.getItem("exitIntentShown");
    if (!hasShown) {
      event.preventDefault();
      event.returnValue = "";
      return "";
    }
  }
};

// Lifecycle
onMounted(() => {
  // localStorage dan holatni yuklash
  const hasShown = localStorage.getItem("exitIntentShown");
  if (hasShown) {
    hasShownModal.value = true;
  }

  // Event listenerlarni qo'shish
  document.addEventListener("mouseleave", handleMouseLeave);
  window.addEventListener("beforeunload", handleBeforeUnload);
});

onUnmounted(() => {
  // Event listenerlarni tozalash
  document.removeEventListener("mouseleave", handleMouseLeave);
  window.removeEventListener("beforeunload", handleBeforeUnload);
});
</script>
