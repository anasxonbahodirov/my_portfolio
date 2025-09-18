<template>
  <div v-if="thought" class="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Back Button -->
      <div class="mb-8" v-reveal>
        <router-link
          to="/fikrlar"
          class="inline-flex items-center text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors focus-ring"
        >
          <ArrowLeft class="w-5 h-5 mr-2" />
          Fikrlar ro'yxatiga qaytish
        </router-link>
      </div>

      <!-- Article Header -->
      <header class="mb-12" v-reveal>
        <div class="text-center mb-8">
          <h1
            class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
          >
            {{ thought.title }}
          </h1>

          <div
            class="flex items-center justify-center space-x-4 text-gray-500 dark:text-gray-400"
          >
            <div class="flex items-center">
              <Calendar class="w-5 h-5 mr-2" />
              <span>{{ formatDate(thought.createdAt) }}</span>
            </div>

            <div class="flex items-center">
              <Clock class="w-5 h-5 mr-2" />
              <span>{{ readingTime }} daqiqa o'qish</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Article Content -->
      <article
        class="prose prose-lg dark:prose-invert prose-brand max-w-none mb-12"
        v-reveal
      >
        <div v-html="formattedContent"></div>
      </article>

      <!-- Share Section -->
      <div class="mb-12" v-reveal>
        <div class="border-t border-gray-200 dark:border-gray-700 pt-8">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Ushbu fikrni ulashish
          </h3>
          <div class="flex items-center space-x-4">
            <button
              @click="copyLink"
              class="inline-flex items-center px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 focus-ring transition-colors"
            >
              <Link class="w-4 h-4 mr-2" />
              Havolani nusxalash
            </button>

            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ copyStatus }}
            </div>
          </div>
        </div>
      </div>

      <!-- Reactions -->
      <div class="mb-12" v-reveal>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Fikr haqida fikr
        </h3>
        <ReactionBar target-type="post" :target-id="thought.id" />
      </div>

      <!-- Rating System -->
      <div class="mb-12" v-reveal>
        <RatingSystem target-type="post" :target-id="thought.id" />
      </div>

      <!-- Comments -->
      <div class="mb-12" v-reveal>
        <CommentSection target-type="post" :target-id="thought.id" />
      </div>

      <!-- Navigation -->
      <div class="border-t border-gray-200 dark:border-gray-700 pt-8" v-reveal>
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0"
        >
          <div v-if="previousThought" class="flex-1">
            <router-link
              :to="`/fikrlar/${previousThought.id}`"
              class="group inline-flex items-center text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
            >
              <ArrowLeft
                class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform"
              />
              <div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  Oldingi fikr
                </div>
                <div class="font-medium">{{ previousThought.title }}</div>
              </div>
            </router-link>
          </div>

          <div v-if="nextThought" class="flex-1 text-right">
            <router-link
              :to="`/fikrlar/${nextThought.id}`"
              class="group inline-flex items-center justify-end text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
            >
              <div class="text-right">
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  Keyingi fikr
                </div>
                <div class="font-medium">{{ nextThought.title }}</div>
              </div>
              <ArrowRight
                class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
              />
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div
        class="w-16 h-16 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"
      ></div>
      <p class="text-gray-600 dark:text-gray-400">Yuklanmoqda...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ArrowLeft, ArrowRight, Calendar, Clock, Link } from "lucide-vue-next";
import { getThoughtById, thoughts } from "@/data/thoughts";
import ReactionBar from "@/components/ReactionBar.vue";
import RatingSystem from "@/components/RatingSystem.vue";
import CommentSection from "@/components/CommentSection.vue";
import { vReveal } from "@/utils/reveal";

const route = useRoute();
const router = useRouter();
const copyStatus = ref("");

const thought = computed(() => {
  const id = route.params.id as string;
  return getThoughtById(id);
});

const previousThought = computed(() => {
  if (!thought.value) return null;

  const currentIndex = thoughts.findIndex((t) => t.id === thought.value?.id);
  if (currentIndex <= 0) return null;

  return thoughts[currentIndex - 1];
});

const nextThought = computed(() => {
  if (!thought.value) return null;

  const currentIndex = thoughts.findIndex((t) => t.id === thought.value?.id);
  if (currentIndex === -1 || currentIndex >= thoughts.length - 1) return null;

  return thoughts[currentIndex + 1];
});

const readingTime = computed(() => {
  if (!thought.value) return 0;

  const words = thought.value.content.split(/\s+/).length;
  return Math.ceil(words / 200); // Average reading speed: 200 words per minute
});

const formattedContent = computed(() => {
  if (!thought.value) return "";

  // Simple markdown to HTML conversion
  return thought.value.content
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(
      /`(.*?)`/g,
      '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">$1</code>'
    )
    .replace(/\n/g, "<br>");
});

onMounted(() => {
  if (!thought.value) {
    router.push("/404");
  }
});

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copyStatus.value = "Havola nusxalandi!";
    setTimeout(() => {
      copyStatus.value = "";
    }, 2000);
  } catch (err) {
    copyStatus.value = "Xatolik yuz berdi";
    setTimeout(() => {
      copyStatus.value = "";
    }, 2000);
  }
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>

<style scoped>
.prose-brand {
  --tw-prose-headings: theme("colors.brand.600");
  --tw-prose-links: theme("colors.brand.600");
  --tw-prose-bold: theme("colors.gray.900");
  --tw-prose-body: theme("colors.gray.700");
}

.dark .prose-brand {
  --tw-prose-headings: theme("colors.brand.400");
  --tw-prose-links: theme("colors.brand.400");
  --tw-prose-bold: theme("colors.white");
  --tw-prose-body: theme("colors.gray.300");
}
</style>
