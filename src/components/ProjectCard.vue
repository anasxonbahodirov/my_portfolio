<template>
  <div
    class="group card hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
  >
    <!-- Project Image -->
    <div class="relative overflow-hidden rounded-t-2xl">
      <div
        class="aspect-video bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/30 dark:to-brand-800/30 flex items-center justify-center"
      >
        <span class="text-4xl">🚀</span>
      </div>
      <div class="absolute top-4 right-4 flex items-center space-x-2">
        <Tag variant="secondary">{{ project.teamSize }} kishi</Tag>
        <RatingStars :rating="project.rating" />
      </div>
    </div>

    <!-- Project Content -->
    <div class="p-6">
      <h3
        class="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors"
      >
        {{ project.title }}
      </h3>

      <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {{ project.description }}
      </p>

      <!-- Project Meta -->
      <div class="space-y-3 mb-4">
        <div
          v-if="project.period"
          class="flex items-center text-sm text-gray-500 dark:text-gray-400"
        >
          <span class="mr-2">📅</span>
          {{ project.period }}
        </div>
        <div
          v-if="project.role"
          class="flex items-center text-sm text-gray-500 dark:text-gray-400"
        >
          <span class="mr-2">👤</span>
          {{ project.role }}
        </div>
      </div>

      <!-- Tech Stack -->
      <div class="mb-4">
        <div class="flex flex-wrap gap-2">
          <Tag
            v-for="tech in project.stack.slice(0, 3)"
            :key="tech"
            variant="info"
          >
            {{ tech }}
          </Tag>
          <span
            v-if="project.stack.length > 3"
            class="text-sm text-gray-500 dark:text-gray-400"
          >
            +{{ project.stack.length - 3 }} boshqa
          </span>
        </div>
      </div>

      <!-- Tags -->
      <div class="mb-6">
        <div class="flex flex-wrap gap-2">
          <Tag
            v-for="tag in project.tags.slice(0, 2)"
            :key="tag"
            variant="success"
          >
            {{ tag }}
          </Tag>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center justify-between">
        <router-link
          :to="`/projects/${project.slug}`"
          class="inline-flex items-center px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 focus-ring transition-colors"
        >
          Batafsil
          <ArrowRight class="w-4 h-4 ml-2" />
        </router-link>

        <div class="flex space-x-2">
          <a
            v-if="project.links.demo"
            :href="project.links.demo"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors focus-ring"
          >
            <ExternalLink class="w-4 h-4" />
          </a>
                      <a 
              v-if="project.links.repo"
              :href="project.links.repo"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2 text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors focus-ring"
            >
              <Github class="w-4 h-4" />
            </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, ExternalLink, Github } from "lucide-vue-next";
import type { Project } from "@/types";
import Tag from "./Tag.vue";
import RatingStars from "./RatingStars.vue";

interface Props {
  project: Project;
}

defineProps<Props>();
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
