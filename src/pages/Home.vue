<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="text-center" v-reveal>
          <div class="mb-8">
            <img
              src="/logo.svg"
              alt="Anasxon"
              class="w-24 h-24 mx-auto mb-6 drop-shadow-lg"
            />
          </div>

          <h1
            class="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Salom, men
            <span class="text-brand-600 dark:text-brand-400">Anasxon</span>man
          </h1>

          <p
            class="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto"
          >
            Full-stack developer bo'lib, zamonaviy web texnologiyalari bilan
            ishlayman. Loyihalar yaratish va fikrlar almashishni yaxshi
            ko'raman.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link
              to="/projects"
              class="inline-flex items-center px-8 py-4 bg-brand-600 text-white rounded-xl hover:bg-brand-700 focus-ring transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Loyihalarimni ko'rish
              <ArrowRight class="w-5 h-5 ml-2" />
            </router-link>

            <router-link
              to="/fikrlar"
              class="inline-flex items-center px-8 py-4 border-2 border-brand-600 text-brand-600 dark:text-brand-400 rounded-xl hover:bg-brand-50 dark:hover:bg-brand-900/20 focus-ring transition-all duration-300 hover:scale-105"
            >
              Fikrlarim
              <BookOpen class="w-5 h-5 ml-2" />
            </router-link>
          </div>
        </div>
      </div>

      <!-- Background decoration -->
      <div class="absolute inset-0 -z-10">
        <div
          class="absolute top-20 left-10 w-72 h-72 bg-brand-200 dark:bg-brand-800/20 rounded-full blur-3xl opacity-30"
        ></div>
        <div
          class="absolute bottom-20 right-10 w-96 h-96 bg-brand-300 dark:bg-brand-700/20 rounded-full blur-3xl opacity-30"
        ></div>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16" v-reveal>
          <h2
            class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Qisqacha men haqimda
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Vue.js, TypeScript va Node.js bo'yicha tajribaga ega bo'lib,
            zamonaviy web ilovalar yaratganman.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="text-center p-6" v-reveal>
            <div
              class="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Code class="w-8 h-8 text-brand-600 dark:text-brand-400" />
            </div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
            >
              Full-stack Development
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Frontend va backend texnologiyalari bilan ishlayman
            </p>
          </div>

          <div class="text-center p-6" v-reveal>
            <div
              class="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Users class="w-8 h-8 text-brand-600 dark:text-brand-400" />
            </div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
            >
              Jamoa ishi
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Katta loyihalarda jamoa bilan ishlash tajribasi
            </p>
          </div>

          <div class="text-center p-6" v-reveal>
            <div
              class="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Lightbulb class="w-8 h-8 text-brand-600 dark:text-brand-400" />
            </div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
            >
              Yangi texnologiyalar
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Doim yangi texnologiyalarni o'rganish va qo'llash
            </p>
          </div>
        </div>

        <!-- Skills -->
        <div class="mt-16 text-center" v-reveal>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Texnologiyalar va ko'nikmalar
          </h3>
          <div class="flex flex-wrap justify-center gap-3">
            <Tag
              v-for="skill in skills"
              :key="skill"
              variant="primary"
              class="text-sm px-4 py-2"
            >
              {{ skill }}
            </Tag>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16" v-reveal>
          <h2
            class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Qilgan ishlarimdan tanlov
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Eng yaxshi va muhim loyihalarim. Har birida o'z tajribam va
            ko'nikmalarimni qo'lladim.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard
            v-for="project in featuredProjects"
            :key="project.id"
            :project="project"
            v-reveal
          />
        </div>

        <div class="text-center mt-12" v-reveal>
          <router-link
            to="/projects"
            class="inline-flex items-center px-8 py-4 bg-brand-600 text-white rounded-xl hover:bg-brand-700 focus-ring transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Barcha loyihalarni ko'rish
            <ArrowRight class="w-5 h-5 ml-2" />
          </router-link>
        </div>
      </div>
    </section>

    <!-- Recent Thoughts -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16" v-reveal>
          <h2
            class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            So'nggi fikrlarim
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Texnologiya, dizayn va development haqida o'ylaganlarim va
            tajribalarim.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="thought in recentThoughts"
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

            <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
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

        <div class="text-center mt-12" v-reveal>
          <router-link
            to="/fikrlar"
            class="inline-flex items-center px-8 py-4 border-2 border-brand-600 text-brand-600 dark:text-brand-400 rounded-xl hover:bg-brand-50 dark:hover:bg-brand-900/20 focus-ring transition-all duration-300 hover:scale-105"
          >
            Barcha fikrlarni ko'rish
            <BookOpen class="w-5 h-5 ml-2" />
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ArrowRight, BookOpen, Code, Users, Lightbulb } from "lucide-vue-next";
import { projects } from "@/data/projects";
import { getRecentThoughts } from "@/data/thoughts";
import ProjectCard from "@/components/ProjectCard.vue";
import Tag from "@/components/Tag.vue";
import ReactionBar from "@/components/ReactionBar.vue";
import { vReveal } from "@/utils/reveal";

// Skills list
const skills = [
  "Vue.js",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "MongoDB",
  "Git",
  "Docker",
];

// Featured projects (first 3)
const featuredProjects = computed(() => projects.slice(0, 3));

// Recent thoughts
const recentThoughts = computed(() => getRecentThoughts(3));

// Utility functions
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
