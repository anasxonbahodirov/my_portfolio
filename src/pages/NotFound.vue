<template>
  <div
    class="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-2xl mx-auto text-center">
      <div class="mb-8" v-reveal>
        <div class="text-9xl font-bold text-brand-600 dark:text-brand-400 mb-4">
          404
        </div>
        <h1
          class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
        >
          Sahifa topilmadi
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Qidirilayotgan sahifa mavjud emas yoki o'chirilgan bo'lishi mumkin.
        </p>
      </div>

      <div class="space-y-4" v-reveal>
        <router-link
          to="/"
          class="inline-flex items-center px-8 py-4 bg-brand-600 text-white rounded-xl hover:bg-brand-700 focus-ring transition-all duration-300 hover:scale-105 shadow-lg"
        >
          <Home class="w-5 h-5 mr-2" />
          Bosh sahifaga qaytish
        </router-link>

        <div class="text-gray-500 dark:text-gray-400">
          Yoki quyidagi sahifalardan birini tanlang:
        </div>

        <div class="flex flex-wrap justify-center gap-4">
          <router-link
            to="/projects"
            class="inline-flex items-center px-6 py-3 border-2 border-brand-600 text-brand-600 dark:text-brand-400 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-900/20 focus-ring transition-colors"
          >
            <FolderOpen class="w-4 h-4 mr-2" />
            Loyihalar
          </router-link>

          <router-link
            to="/fikrlar"
            class="inline-flex items-center px-6 py-3 border-2 border-brand-600 text-brand-600 dark:text-brand-400 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-900/20 focus-ring transition-colors"
          >
            <BookOpen class="w-4 h-4 mr-2" />
            Fikrlarim
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Home, FolderOpen, BookOpen } from "lucide-vue-next";
import { vReveal } from "@/utils/reveal";
</script>
