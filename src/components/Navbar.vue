<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2 group">
          <img
            src="/logo.svg"
            alt="Anasxon"
            class="w-8 h-8 transition-transform group-hover:scale-110"
          />
          <span class="text-xl font-bold text-gray-900 dark:text-white"
            >Anasxon</span
          >
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors focus-ring px-3 py-2 rounded-lg"
            :class="{
              'text-brand-600 dark:text-brand-400': route.path === item.path,
            }"
          >
            {{ item.name }}
          </router-link>
        </div>

        <!-- Mobile menu button -->
        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 focus-ring"
        >
          <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div v-show="isMobileMenuOpen" class="md:hidden">
        <div
          class="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200 dark:border-gray-700"
        >
          <router-link
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            @click="isMobileMenuOpen = false"
            class="block px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            :class="{
              'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20':
                route.path === item.path,
            }"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { Menu, X } from "lucide-vue-next";

const route = useRoute();
const isMobileMenuOpen = ref(false);

const navigationItems = [
  { name: "Bosh sahifa", path: "/" },
  { name: "Loyihalar", path: "/projects" },
  { name: "Fikrlarim", path: "/fikrlar" },
  { name: "Admin", path: "/admin" },
];
</script>

