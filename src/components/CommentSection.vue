<template>
  <div class="space-y-6">
    <!-- Comment Form -->
    <div class="card p-6" v-reveal>
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Izoh qoldiring
      </h3>

      <form @submit.prevent="addComment" class="space-y-4">
        <div class="flex items-start space-x-3">
          <div
            class="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center flex-shrink-0"
          >
            <span class="text-brand-600 dark:text-brand-400 font-semibold">
              {{ getUserInitials() }}
            </span>
          </div>

          <div class="flex-1">
            <textarea
              v-model="newComment"
              rows="3"
              placeholder="Fikringizni yozing..."
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus-ring resize-none"
              required
            ></textarea>

            <div class="flex items-center justify-between mt-3">
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {{ newComment.length }}/500
                </span>
              </div>

              <button
                type="submit"
                :disabled="!newComment.trim() || newComment.length > 500"
                class="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 focus-ring transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Izoh qoldirish
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>

    <!-- Comments List -->
    <div class="space-y-4">
      <div
        v-for="comment in sortedComments"
        :key="comment.id"
        class="card p-4 hover:shadow-lg transition-all duration-300"
        v-reveal
      >
        <div class="flex items-start space-x-3">
          <div
            class="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center flex-shrink-0"
          >
            <span class="text-brand-600 dark:text-brand-400 font-semibold">
              {{ getUserInitials(comment.userName) }}
            </span>
          </div>

          <div class="flex-1">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center space-x-2">
                <span class="font-medium text-gray-900 dark:text-white">
                  {{ comment.userName }}
                </span>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(comment.createdAt) }}
                </span>
              </div>

              <div class="flex items-center space-x-2">
                <button
                  @click="likeComment(comment.id)"
                  :disabled="comment.userLiked"
                  class="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  :class="{
                    'text-red-500 dark:text-red-400': comment.userLiked,
                  }"
                >
                  <Heart
                    :class="comment.userLiked ? 'fill-current' : ''"
                    class="w-4 h-4"
                  />
                  <span>{{ comment.likes }}</span>
                </button>

                <button
                  @click="comment.showReply = !comment.showReply"
                  class="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Javob berish
                </button>
              </div>
            </div>

            <p class="text-gray-700 dark:text-gray-300 mb-3">
              {{ comment.content }}
            </p>

            <!-- Reply Form -->
            <div v-if="comment.showReply" class="mt-3">
              <form @submit.prevent="addReply(comment.id)" class="space-y-3">
                <textarea
                  v-model="comment.replyText"
                  rows="2"
                  placeholder="Javob yozing..."
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus-ring resize-none text-sm"
                  required
                ></textarea>

                <div class="flex items-center justify-end space-x-2">
                  <button
                    type="button"
                    @click="comment.showReply = false"
                    class="px-3 py-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    class="px-3 py-1 text-sm bg-brand-600 text-white rounded-lg hover:bg-brand-700 focus-ring transition-colors"
                  >
                    Javob berish
                  </button>
                </div>
              </form>
            </div>

            <!-- Replies -->
            <div
              v-if="comment.replies && comment.replies.length > 0"
              class="mt-3 ml-6 space-y-3"
            >
              <div
                v-for="reply in comment.replies"
                :key="reply.id"
                class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center space-x-2">
                    <span
                      class="font-medium text-gray-900 dark:text-white text-sm"
                    >
                      {{ reply.userName }}
                    </span>
                    <span class="text-xs text-gray-500 dark:text-gray-400">
                      {{ formatDate(reply.createdAt) }}
                    </span>
                  </div>

                  <button
                    @click="likeReply(comment.id, reply.id)"
                    :disabled="reply.userLiked"
                    class="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    :class="{
                      'text-red-500 dark:text-red-400': reply.userLiked,
                    }"
                  >
                    <Heart
                      :class="reply.userLiked ? 'fill-current' : ''"
                      class="w-3 h-3"
                    />
                    <span>{{ reply.likes }}</span>
                  </button>
                </div>

                <p class="text-gray-700 dark:text-gray-300 text-sm">
                  {{ reply.content }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No Comments -->
    <div v-if="comments.length === 0" class="text-center py-8" v-reveal>
      <div
        class="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <MessageCircle class="w-8 h-8 text-gray-400" />
      </div>
      <p class="text-gray-500 dark:text-gray-400">
        Hali hech kim izoh qoldirmagan. Birinchi bo'ling!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Heart, MessageCircle } from "lucide-vue-next";
import { vReveal } from "@/utils/reveal";

interface Comment {
  id: string;
  content: string;
  userName: string;
  createdAt: string;
  likes: number;
  userLiked: boolean;
  replies: Reply[];
  showReply?: boolean;
  replyText?: string;
}

interface Reply {
  id: string;
  content: string;
  userName: string;
  createdAt: string;
  likes: number;
  userLiked: boolean;
}

interface Props {
  targetType: "post" | "project";
  targetId: string;
}

const props = defineProps<Props>();

// State
const newComment = ref("");
const comments = ref<Comment[]>([]);

// Computed
const sortedComments = computed(() => {
  return [...comments.value].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
});

// Methods
const addComment = () => {
  if (newComment.value.trim()) {
    const comment: Comment = {
      id: `c${Date.now()}`,
      content: newComment.value.trim(),
      userName: getUserName(),
      createdAt: new Date().toISOString(),
      likes: 0,
      userLiked: false,
      replies: [],
    };

    comments.value.unshift(comment);
    newComment.value = "";
    saveComments();
  }
};

const addReply = (commentId: string) => {
  const comment = comments.value.find((c) => c.id === commentId);
  if (comment && comment.replyText?.trim()) {
    const reply: Reply = {
      id: `r${Date.now()}`,
      content: comment.replyText.trim(),
      userName: getUserName(),
      createdAt: new Date().toISOString(),
      likes: 0,
      userLiked: false,
    };

    comment.replies.push(reply);
    comment.replyText = "";
    comment.showReply = false;
    saveComments();
  }
};

const likeComment = (commentId: string) => {
  const comment = comments.value.find((c) => c.id === commentId);
  if (comment && !comment.userLiked) {
    comment.likes++;
    comment.userLiked = true;
    saveComments();
  }
};

const likeReply = (commentId: string, replyId: string) => {
  const comment = comments.value.find((c) => c.id === commentId);
  const reply = comment?.replies.find((r) => r.id === replyId);
  if (reply && !reply.userLiked) {
    reply.likes++;
    reply.userLiked = true;
    saveComments();
  }
};

const getUserName = (): string => {
  // localStorage dan foydalanuvchi nomini olish yoki random nom yaratish
  const stored = localStorage.getItem("userName");
  if (stored) return stored;

  const randomNames = [
    "Anonim",
    "Mehmon",
    "Foydalanuvchi",
    "Developer",
    "Designer",
  ];
  const randomName =
    randomNames[Math.floor(Math.random() * randomNames.length)];
  localStorage.setItem("userName", randomName);
  return randomName;
};

const getUserInitials = (userName?: string): string => {
  const name = userName || getUserName();
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 1) return "hozir";
  if (diffInMinutes < 60) return `${diffInMinutes} daqiqa oldin`;
  if (diffInMinutes < 1440)
    return `${Math.floor(diffInMinutes / 60)} soat oldin`;
  if (diffInMinutes < 10080)
    return `${Math.floor(diffInMinutes / 1440)} kun oldin`;

  return date.toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const saveComments = () => {
  localStorage.setItem(
    `comments:${props.targetType}:${props.targetId}`,
    JSON.stringify(comments.value)
  );
};

const loadComments = () => {
  const stored = localStorage.getItem(
    `comments:${props.targetType}:${props.targetId}`
  );
  if (stored) {
    try {
      comments.value = JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse stored comments:", e);
    }
  }
};

onMounted(() => {
  loadComments();
});
</script>
