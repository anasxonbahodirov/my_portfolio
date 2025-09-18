<template>
  <div v-if="project" class="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Back Button -->
      <div class="mb-8" v-reveal>
        <router-link
          to="/projects"
          class="inline-flex items-center text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors focus-ring"
        >
          <ArrowLeft class="w-5 h-5 mr-2" />
          Loyihalar ro'yxatiga qaytish
        </router-link>
      </div>

      <!-- Project Header -->
      <div class="mb-12" v-reveal>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <!-- Project Info -->
          <div>
            <h1
              class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            >
              {{ project.title }}
            </h1>

            <p
              class="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
            >
              {{ project.description }}
            </p>

            <!-- Project Meta -->
            <div class="space-y-4 mb-8">
              <div v-if="project.period" class="flex items-center">
                <Calendar
                  class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3"
                />
                <span class="text-gray-700 dark:text-gray-300">{{
                  project.period
                }}</span>
              </div>

              <div v-if="project.role" class="flex items-center">
                <User class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                <span class="text-gray-700 dark:text-gray-300">{{
                  project.role
                }}</span>
              </div>

              <div class="flex items-center">
                <Users class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                <span class="text-gray-700 dark:text-gray-300"
                  >{{ project.teamSize }} kishi</span
                >
              </div>
            </div>

            <!-- Rating -->
            <div class="mb-8">
              <div class="flex items-center mb-2">
                <span
                  class="text-lg font-semibold text-gray-900 dark:text-white mr-4"
                  >Reyting:</span
                >
                <RatingStars :rating="project.rating" />
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap gap-4">
              <a
                v-if="project.links.demo"
                :href="project.links.demo"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 focus-ring transition-colors shadow-lg"
              >
                <ExternalLink class="w-5 h-5 mr-2" />
                Demo ko'rish
              </a>

                             <a 
                 v-if="project.links.repo"
                 :href="project.links.repo"
                 target="_blank"
                 rel="noopener noreferrer"
                 class="inline-flex items-center px-6 py-3 border-2 border-brand-600 text-brand-600 dark:text-brand-400 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-900/20 focus-ring transition-colors"
               >
                 <Github class="w-5 h-5 mr-2" />
                 GitHub
               </a>
            </div>
          </div>

          <!-- Project Image -->
          <div class="relative">
            <div
              class="aspect-video bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/30 dark:to-brand-800/30 rounded-2xl flex items-center justify-center overflow-hidden"
            >
              <span class="text-8xl">🚀</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tech Stack -->
      <div class="mb-12" v-reveal>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Ishlatilgan texnologiyalar
        </h2>
        <div class="flex flex-wrap gap-3">
          <Tag
            v-for="tech in project.stack"
            :key="tech"
            variant="info"
            class="text-base px-4 py-2"
          >
            {{ tech }}
          </Tag>
        </div>
      </div>

      <!-- Project Highlights -->
      <div class="mb-12" v-reveal>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Asosiy xususiyatlar
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="highlight in project.highlights"
            :key="highlight"
            class="flex items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
          >
            <CheckCircle
              class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
            />
            <span class="text-gray-700 dark:text-gray-300">{{
              highlight
            }}</span>
          </div>
        </div>
      </div>

      <!-- Tags -->
      <div class="mb-12" v-reveal>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Kategoriyalar
        </h2>
        <div class="flex flex-wrap gap-3">
          <Tag
            v-for="tag in project.tags"
            :key="tag"
            variant="success"
            class="text-base px-4 py-2"
          >
            {{ tag }}
          </Tag>
        </div>
      </div>

      <!-- Reactions -->
      <div class="mb-12" v-reveal>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Loyiha haqida fikr
        </h2>
        <ReactionBar target-type="project" :target-id="project.id" />
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
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  ArrowLeft,
  Calendar,
  User,
  Users,
  ExternalLink,
  Github,
  CheckCircle,
} from "lucide-vue-next";
import { getProjectBySlug } from "@/data/projects";
import Tag from "@/components/Tag.vue";
import RatingStars from "@/components/RatingStars.vue";
import ReactionBar from "@/components/ReactionBar.vue";
import { vReveal } from "@/utils/reveal";

const route = useRoute();
const router = useRouter();

const project = computed(() => {
  const slug = route.params.slug as string;
  return getProjectBySlug(slug);
});

onMounted(() => {
  if (!project.value) {
    router.push("/404");
  }
});
</script>
