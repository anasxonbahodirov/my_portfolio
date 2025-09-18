<template>
  <span
    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors"
    :class="[
      variant === 'primary'
        ? 'bg-brand-100 text-brand-800 dark:bg-brand-900/30 dark:text-brand-300'
        : variant === 'secondary'
        ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
        : variant === 'success'
        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    ]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
interface Props {
  variant?: "primary" | "secondary" | "success" | "info";
}

withDefaults(defineProps<Props>(), {
  variant: "primary",
});
</script>
