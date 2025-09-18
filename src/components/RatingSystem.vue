<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
      Postni baholang
    </h3>

    <!-- Rating Display -->
    <div class="flex items-center space-x-4">
      <div class="flex items-center space-x-1">
        <div
          v-for="star in 5"
          :key="star"
          class="transition-colors cursor-pointer"
          :class="[
            star <= Math.floor(averageRating)
              ? 'text-yellow-400'
              : star === Math.ceil(averageRating) && averageRating % 1 !== 0
              ? 'text-yellow-400'
              : 'text-gray-300 dark:text-gray-600',
          ]"
          @click="setRating(star)"
        >
          <Star
            v-if="star <= Math.floor(averageRating)"
            class="w-6 h-6 fill-current"
          />
          <Star
            v-else-if="
              star === Math.ceil(averageRating) && averageRating % 1 !== 0
            "
            class="w-6 h-6 fill-current"
          />
          <Star v-else class="w-6 h-6" />
        </div>
      </div>

      <div class="text-center">
        <div class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ averageRating.toFixed(1) }}
        </div>
        <div class="text-sm text-gray-500 dark:text-gray-400">
          {{ totalRatings }} ta baho
        </div>
      </div>
    </div>

    <!-- User Rating -->
    <div v-if="userRating > 0" class="text-sm text-gray-600 dark:text-gray-400">
      Sizning bahoyingiz:
      <span class="font-medium text-brand-600 dark:text-brand-400">
        {{ userRating }} yulduz
      </span>
    </div>

    <!-- Rating Distribution -->
    <div class="space-y-2">
      <div
        v-for="rating in 5"
        :key="rating"
        class="flex items-center space-x-3"
      >
        <span class="text-sm text-gray-600 dark:text-gray-400 w-8">
          {{ rating }}
        </span>

        <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            class="bg-yellow-400 h-2 rounded-full transition-all duration-300"
            :style="{ width: `${getRatingPercentage(rating)}%` }"
          ></div>
        </div>

        <span class="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
          {{ getRatingCount(rating) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Star } from "lucide-vue-next";

interface Props {
  targetType: "post" | "project";
  targetId: string;
}

const props = defineProps<Props>();

// State
const ratings = ref<{ rating: number; count: number }[]>([]);
const userRating = ref(0);

// Computed
const totalRatings = computed(() => {
  return ratings.value.reduce((sum, r) => sum + r.count, 0);
});

const averageRating = computed(() => {
  if (totalRatings.value === 0) return 0;

  const total = ratings.value.reduce((sum, r) => sum + r.rating * r.count, 0);
  return total / totalRatings.value;
});

// Methods
const setRating = (rating: number) => {
  if (userRating.value === rating) {
    // O'chirish
    removeRating();
  } else {
    // Yangi baho
    addRating(rating);
  }
};

const addRating = (rating: number) => {
  // Eski bahoni o'chirish
  if (userRating.value > 0) {
    removeRating();
  }

  // Yangi bahoni qo'shish
  const existingRating = ratings.value.find((r) => r.rating === rating);
  if (existingRating) {
    existingRating.count++;
  } else {
    ratings.value.push({ rating, count: 1 });
  }

  // O'rtacha hisoblash
  ratings.value.sort((a, b) => b.rating - a.rating);

  userRating.value = rating;
  saveRatings();
};

const removeRating = () => {
  if (userRating.value > 0) {
    const existingRating = ratings.value.find(
      (r) => r.rating === userRating.value
    );
    if (existingRating) {
      existingRating.count--;
      if (existingRating.count === 0) {
        const index = ratings.value.findIndex(
          (r) => r.rating === userRating.value
        );
        if (index !== -1) {
          ratings.value.splice(index, 1);
        }
      }
    }

    userRating.value = 0;
    saveRatings();
  }
};

const getRatingPercentage = (rating: number): number => {
  if (totalRatings.value === 0) return 0;

  const ratingCount = getRatingCount(rating);
  return (ratingCount / totalRatings.value) * 100;
};

const getRatingCount = (rating: number): number => {
  const ratingData = ratings.value.find((r) => r.rating === rating);
  return ratingData ? ratingData.count : 0;
};

const saveRatings = () => {
  localStorage.setItem(
    `ratings:${props.targetType}:${props.targetId}`,
    JSON.stringify({
      ratings: ratings.value,
      userRating: userRating.value,
    })
  );
};

const loadRatings = () => {
  const stored = localStorage.getItem(
    `ratings:${props.targetType}:${props.targetId}`
  );
  if (stored) {
    try {
      const data = JSON.parse(stored);
      ratings.value = data.ratings || [];
      userRating.value = data.userRating || 0;
    } catch (e) {
      console.error("Failed to parse stored ratings:", e);
    }
  }
};

onMounted(() => {
  loadRatings();
});
</script>
