<template>
  <div class="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16" v-reveal>
        <h1
          class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
        >
          Fikrlarim
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Texnologiya, dizayn va development haqida o'ylaganlarim, tajribalarim
          va fikrlarim. Har bir post o'z ichiga qimmatli ma'lumotlarni oladi.
        </p>
      </div>

      <!-- Search -->
      <div class="mb-12" v-reveal>
        <div class="relative max-w-md mx-auto">
          <Search
            class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Fikr nomi yoki mazmunini qidirish..."
            class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus-ring"
          />
        </div>
      </div>

      <!-- Thoughts Grid -->
      <div
        v-if="filteredThoughts.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <div
          v-for="thought in filteredThoughts"
          :key="thought.id"
          class="card p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          v-reveal
        >
          <div class="mb-4">
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {{ formatDate(thought.createdAt) }}
            </span>
          </div>

          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
            {{ thought.title }}
          </h3>

          <p class="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
            {{ getExcerpt(thought.content) }}
          </p>

          <div class="flex items-center justify-between">
            <router-link
              :to="`/fikrlar/${thought.id}`"
              class="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-medium transition-colors"
            >
              O'qishni davom ettirish →
            </router-link>

            <ReactionBar target-type="post" :target-id="thought.id" />
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-else class="text-center py-20" v-reveal>
        <div
          class="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Search class="w-12 h-12 text-gray-400" />
        </div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Hech qanday fikr topilmadi
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Qidiruv so'rovi bo'yicha hech qanday fikr topilmadi.
        </p>
        <button
          @click="clearSearch"
          class="inline-flex items-center px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 focus-ring transition-colors"
        >
          Qidiruvni tozalash
          <RefreshCw class="w-4 h-4 ml-2" />
        </button>
      </div>

      <!-- Stats -->
      <div class="mt-20 text-center" v-reveal>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div
              class="text-3xl font-bold text-brand-600 dark:text-brand-400 mb-2"
            >
              {{ thoughts.length }}
            </div>
            <div class="text-gray-600 dark:text-gray-400">Jami fikrlar</div>
          </div>
          <div class="text-center">
            <div
              class="text-3xl font-bold text-brand-600 dark:text-brand-400 mb-2"
            >
              {{ latestThoughtDate }}
            </div>
            <div class="text-gray-600 dark:text-gray-400">So'nggi fikr</div>
          </div>
          <div class="text-center">
            <div
              class="text-3xl font-bold text-brand-600 dark:text-brand-400 mb-2"
            >
              {{ averageWordsPerThought }}
            </div>
            <div class="text-gray-600 dark:text-gray-400">O'rtacha so'zlar</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Search, RefreshCw } from "lucide-vue-next";
import { thoughts } from "@/data/thoughts";
import ReactionBar from "@/components/ReactionBar.vue";
import { vReveal } from "@/utils/reveal";

// State
const searchQuery = ref("");

// Computed
const filteredThoughts = computed(() => {
  if (!searchQuery.value) return thoughts;

  return thoughts.filter(
    (thought) =>
      thought.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      thought.content.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const latestThoughtDate = computed(() => {
  if (thoughts.length === 0) return "Yok";

  const latest = thoughts.reduce((latest, thought) =>
    new Date(thought.createdAt) > new Date(latest.createdAt) ? thought : latest
  );

  return new Date(latest.createdAt).toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
});

const averageWordsPerThought = computed(() => {
  if (thoughts.length === 0) return 0;

  const totalWords = thoughts.reduce((sum, thought) => {
    const words = thought.content.split(/\s+/).length;
    return sum + words;
  }, 0);

  return Math.round(totalWords / thoughts.length);
});

// Methods
const clearSearch = () => {
  searchQuery.value = "";
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getExcerpt = (content: string): string => {
  // Remove markdown and get first 150 characters
  const plainText = content.replace(/[#*`]/g, "").replace(/\n/g, " ");
  return plainText.length > 150
    ? plainText.substring(0, 150) + "..."
    : plainText;
};
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
