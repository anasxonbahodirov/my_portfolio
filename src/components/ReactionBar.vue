<template>
  <div
    class="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl"
  >
    <button
      v-for="emoji in emojis"
      :key="emoji"
      @click="handleReaction(emoji)"
      :disabled="isReactionDisabled(emoji)"
      class="flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 focus-ring"
      :class="[
        isReactionDisabled(emoji)
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:bg-white dark:hover:bg-gray-700 hover:scale-105 active:scale-95',
        getReactionCount(emoji) > 0
          ? 'bg-white dark:bg-gray-700 shadow-sm'
          : '',
      ]"
    >
      <span class="text-lg">{{ emoji }}</span>
      <span
        v-if="getReactionCount(emoji) > 0"
        class="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {{ getReactionCount(emoji) }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { ReactionEmoji, TargetType } from "@/types";
import { isSupabaseAvailable } from "@/lib/supabase";

interface Props {
  targetType: TargetType;
  targetId: string;
}

const props = defineProps<Props>();

const emojis: ReactionEmoji[] = ["👍", "🔥", "💡", "😂", "❤️"];
const reactions = ref<Record<ReactionEmoji, number>>({
  "👍": 0,
  "🔥": 0,
  "💡": 0,
  "😂": 0,
  "❤️": 0,
});

const userReactions = ref<Set<ReactionEmoji>>(new Set());
const showSuccessMessage = ref(false);
const successMessage = ref("");

onMounted(() => {
  loadReactions();
  loadUserReactions();
});

const loadReactions = async () => {
  if (isSupabaseAvailable()) {
    // Load from Supabase
    // This would be implemented with actual Supabase calls
  } else {
    // Load from localStorage
    const stored = localStorage.getItem(
      `reactions:${props.targetType}:${props.targetId}`
    );
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        Object.keys(parsed).forEach((emoji) => {
          if (emoji in reactions.value) {
            reactions.value[emoji as ReactionEmoji] = parsed[emoji];
          }
        });
      } catch (e) {
        console.error("Failed to parse stored reactions:", e);
      }
    }
  }
};

const loadUserReactions = () => {
  const stored = localStorage.getItem(
    `userReactions:${props.targetType}:${props.targetId}`
  );
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      userReactions.value = new Set(parsed);
    } catch (e) {
      console.error("Failed to parse user reactions:", e);
    }
  }
};

const handleReaction = async (emoji: ReactionEmoji) => {
  if (isReactionDisabled(emoji)) return;

  // Increment reaction count
  reactions.value[emoji]++;

  // Mark as used by user
  userReactions.value.add(emoji);

  // Save to storage
  if (isSupabaseAvailable()) {
    // Save to Supabase
    // This would be implemented with actual Supabase calls
  } else {
    // Save to localStorage
    localStorage.setItem(
      `reactions:${props.targetType}:${props.targetId}`,
      JSON.stringify(reactions.value)
    );
    localStorage.setItem(
      `userReactions:${props.targetType}:${props.targetId}`,
      JSON.stringify(Array.from(userReactions.value))
    );
  }

  // Show success message
  showSuccessMessage.value = true;
  successMessage.value = `✅ ${emoji} reaksiyasi qo'shildi!`;

  setTimeout(() => {
    showSuccessMessage.value = false;
  }, 2000);
};

const isReactionDisabled = (emoji: ReactionEmoji): boolean => {
  return userReactions.value.has(emoji);
};

const getReactionCount = (emoji: ReactionEmoji): number => {
  return reactions.value[emoji] || 0;
};
</script>
