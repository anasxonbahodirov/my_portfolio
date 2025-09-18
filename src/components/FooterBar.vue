<template>
  <footer
    class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Brand Section -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <img src="/logo.svg" alt="Anasxon" class="w-8 h-8" />
            <span class="text-xl font-bold text-gray-900 dark:text-white"
              >Anasxon</span
            >
          </div>
          <p class="text-gray-600 dark:text-gray-400 max-w-xs">
            Full-stack developer bo'lib, zamonaviy web texnologiyalari bilan
            ishlayman.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Tezkor havolalar
          </h3>
          <ul class="space-y-2">
            <li>
              <router-link
                to="/"
                class="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                Bosh sahifa
              </router-link>
            </li>
            <li>
              <router-link
                to="/projects"
                class="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                Loyihalar
              </router-link>
            </li>
            <li>
              <router-link
                to="/fikrlar"
                class="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                Fikrlarim
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Aloqa
          </h3>
          <div class="space-y-2">
            <p class="text-gray-600 dark:text-gray-400">
              <span class="font-medium">Email:</span> anasxon@example.com
            </p>
            <p class="text-gray-600 dark:text-gray-400">
              <span class="font-medium">Telegram:</span> @anasxon_dev
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div
          class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            © 2025 Anasxon. Barcha huquqlar himoyalangan.
          </p>
          <div class="flex space-x-6">
            <a
              href="#"
              class="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href="#"
              class="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="#"
              class="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer component logic if needed
</script>

<style scoped>
.footer {
  text-align: center;
  padding: 2rem 0 1rem 0;
  color: #b8c1ec;
  font-size: 1rem;
}
</style>
