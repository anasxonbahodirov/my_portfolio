<template>
  <div class="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16" v-reveal>
        <h1
          class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
        >
          Qilgan ishlarim
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Barcha loyihalarim va ularning batafsil ma'lumotlari. Har bir loyihada
          o'z tajribam va ko'nikmalarimni qo'lladim.
        </p>
      </div>

      <!-- Filters -->
      <div class="mb-12" v-reveal>
        <div
          class="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between"
        >
          <!-- Search -->
          <div class="relative flex-1 max-w-md">
            <Search
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Loyiha nomi yoki tavsifini qidirish..."
              class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus-ring"
            />
          </div>

          <!-- Tag Filter -->
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tag in allTags"
              :key="tag"
              @click="toggleTagFilter(tag)"
              class="px-4 py-2 rounded-lg transition-all duration-200 focus-ring"
              :class="[
                selectedTags.includes(tag)
                  ? 'bg-brand-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
              ]"
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </div>

      <!-- Projects Grid -->
      <div
        v-if="filteredProjects.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
          v-reveal
        />
      </div>

      <!-- No Results -->
      <div v-else class="text-center py-20" v-reveal>
        <div
          class="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Search class="w-12 h-12 text-gray-400" />
        </div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Hech qanday loyiha topilmadi
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Qidiruv so'rovi yoki tanlangan teglar bo'yicha hech qanday loyiha
          topilmadi.
        </p>
        <button
          @click="clearFilters"
          class="inline-flex items-center px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 focus-ring transition-colors"
        >
          Filtrlarni tozalash
          <RefreshCw class="w-4 h-4 ml-2" />
        </button>
      </div>

      <!-- Stats -->
      <div class="mt-20 text-center" v-reveal>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div
              class="text-3xl font-bold text-brand-600 dark:text-brand-400 mb-2"
            >
              {{ projects.length }}
            </div>
            <div class="text-gray-600 dark:text-gray-400">Jami loyihalar</div>
          </div>
          <div class="text-center">
            <div
              class="text-3xl font-bold text-brand-600 dark:text-brand-400 mb-2"
            >
              {{ averageRating.toFixed(1) }}
            </div>
            <div class="text-gray-600 dark:text-gray-400">O'rtacha reyting</div>
          </div>
          <div class="text-center">
            <div
              class="text-3xl font-bold text-brand-600 dark:text-brand-400 mb-2"
            >
              {{ totalTeamSize }}
            </div>
            <div class="text-gray-600 dark:text-gray-400">
              Jami jamoa a'zolari
            </div>
          </div>
          <div class="text-center">
            <div
              class="text-3xl font-bold text-brand-600 dark:text-brand-400 mb-2"
            >
              {{ uniqueTechnologies.length }}
            </div>
            <div class="text-gray-600 dark:text-gray-400">
              Ishlatilgan texnologiyalar
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Search, RefreshCw } from "lucide-vue-next";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard.vue";
import { vReveal } from "@/utils/reveal";

// State
const searchQuery = ref("");
const selectedTags = ref<string[]>([]);

// Computed
const allTags = computed(() => {
  const tags = new Set<string>();
  projects.forEach((project) => {
    project.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
});

const filteredProjects = computed(() => {
  return projects.filter((project) => {
    // Search filter
    const matchesSearch =
      searchQuery.value === "" ||
      project.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      project.description
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());

    // Tag filter
    const matchesTags =
      selectedTags.value.length === 0 ||
      selectedTags.value.some((tag) => project.tags.includes(tag));

    return matchesSearch && matchesTags;
  });
});

const averageRating = computed(() => {
  if (projects.length === 0) return 0;
  const total = projects.reduce((sum, project) => sum + project.rating, 0);
  return total / projects.length;
});

const totalTeamSize = computed(() => {
  return projects.reduce((sum, project) => sum + project.teamSize, 0);
});

const uniqueTechnologies = computed(() => {
  const techs = new Set<string>();
  projects.forEach((project) => {
    project.stack.forEach((tech) => techs.add(tech));
  });
  return Array.from(techs);
});

// Methods
const toggleTagFilter = (tag: string) => {
  const index = selectedTags.value.indexOf(tag);
  if (index > -1) {
    selectedTags.value.splice(index, 1);
  } else {
    selectedTags.value.push(tag);
  }
};

const clearFilters = () => {
  searchQuery.value = "";
  selectedTags.value = [];
};
</script>
