<template>
  <div class="flex items-center space-x-1">
    <div
      v-for="star in 5"
      :key="star"
      class="transition-colors"
      :class="[
        star <= Math.floor(rating)
          ? 'text-yellow-400'
          : star === Math.ceil(rating) && rating % 1 !== 0
          ? 'text-yellow-400'
          : 'text-gray-300 dark:text-gray-600',
      ]"
    >
      <Star v-if="star <= Math.floor(rating)" class="w-4 h-4 fill-current" />
      <Star
        v-else-if="star === Math.ceil(rating) && rating % 1 !== 0"
        class="w-4 h-4 fill-current"
      />
      <Star v-else class="w-4 h-4" />
    </div>
    <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">
      {{ rating.toFixed(1) }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { Star } from "lucide-vue-next";

interface Props {
  rating: number;
}

defineProps<Props>();
</script>
