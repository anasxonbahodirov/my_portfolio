<template>
  <div
    class="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900"
  >
    <div class="max-w-6xl mx-auto">
             <!-- Header -->
       <div class="text-center mb-12" v-reveal>
         <h1
           class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
         >
           Admin Panel
         </h1>
         <p class="text-lg text-gray-600 dark:text-gray-400">
           Fikrlar va postlarni boshqarish
         </p>
         
         <!-- Success Message -->
         <div
           v-if="showSuccessMessage"
           class="mt-4 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-xl"
         >
           <p class="text-green-800 dark:text-green-200 font-medium">
             {{ successMessage }}
           </p>
         </div>
       </div>

      <!-- Admin Controls -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <!-- Add New Thought -->
        <div class="card p-6" v-reveal>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Yangi fikr qo'shish
          </h2>

          <form @submit.prevent="addThought" class="space-y-4">
            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Sarlavha
              </label>
              <input
                v-model="newThought.title"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus-ring"
                placeholder="Fikr sarlavhasi..."
              />
            </div>

            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Mazmun (Markdown)
              </label>
              <div
                class="border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden"
              >
                <!-- Toolbar -->
                <div
                  class="flex flex-wrap gap-2 p-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600"
                >
                  <button
                    type="button"
                    @click="insertText('**', '**')"
                    class="px-3 py-1 text-sm bg-white dark:bg-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    title="Bold"
                  >
                    <strong>B</strong>
                  </button>
                  <button
                    type="button"
                    @click="insertText('*', '*')"
                    class="px-3 py-1 text-sm bg-white dark:bg-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    title="Italic"
                  >
                    <em>I</em>
                  </button>
                  <button
                    type="button"
                    @click="insertText('> ', '')"
                    class="px-3 py-1 text-sm bg-white dark:bg-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    title="Quote"
                  >
                    "
                  </button>
                  <button
                    type="button"
                    @click="insertText('`', '`')"
                    class="px-3 py-1 text-sm bg-white dark:bg-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    title="Code"
                  >
                    &lt;/&gt;
                  </button>
                  <button
                    type="button"
                    @click="insertText('### ', '')"
                    class="px-3 py-1 text-sm bg-white dark:bg-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    title="Heading"
                  >
                    H
                  </button>
                </div>

                <textarea
                  v-model="newThought.content"
                  required
                  rows="12"
                  class="w-full px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus-ring resize-none"
                  placeholder="Fikr mazmuni... Markdown formatida yozing..."
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              class="w-full px-6 py-3 bg-brand-600 text-white rounded-xl hover:bg-brand-700 focus-ring transition-colors font-medium"
            >
              Fikrni saqlash
            </button>
          </form>
        </div>

        <!-- Quick Stats -->
        <div class="card p-6" v-reveal>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            📊 Statistika
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              class="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl border border-blue-200 dark:border-blue-700"
            >
              <div
                class="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-3"
              >
                <Plus class="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {{ thoughts.length }}
              </div>
              <div class="text-sm text-blue-600 dark:text-blue-400">
                Jami fikrlar
              </div>
            </div>

            <div
              class="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl border border-green-200 dark:border-green-700"
            >
              <div
                class="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-3"
              >
                <TrendingUp
                  class="w-6 h-6 text-green-600 dark:text-green-400"
                />
              </div>
              <div
                class="text-2xl font-bold text-green-600 dark:text-green-400"
              >
                {{ totalReactions }}
              </div>
              <div class="text-sm text-green-600 dark:text-green-400">
                Jami reaksiyalar
              </div>
            </div>

            <div
              class="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl border border-purple-200 dark:border-purple-700"
            >
              <div
                class="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl border border-purple-200 dark:border-purple-700"
              >
                <div
                  class="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-3"
                >
                  <Users class="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div
                  class="text-2xl font-bold text-purple-600 dark:text-purple-400"
                >
                  {{ totalComments }}
                </div>
                <div class="text-sm text-purple-600 dark:text-purple-400">
                  Jami izohlar
                </div>
              </div>
            </div>
          </div>

                  <!-- Admin Key Input -->
        <div
          class="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-700"
        >
          <h3
            class="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2"
          >
            🔑 Admin kaliti
          </h3>
          <p class="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
            Admin sahifasiga kirish uchun kalit:
            <code class="bg-yellow-100 dark:bg-yellow-800 px-2 py-1 rounded"
              >anasxon2025</code
            >
          </p>
          
          <!-- Quick Access Buttons -->
          <div class="flex flex-wrap gap-2 mb-3">
            <button
              @click="quickAdminAccess"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus-ring transition-colors text-sm"
            >
              🚀 Tez kirish (Avtomatik)
            </button>
            <button
              @click="clearAdminKey"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus-ring transition-colors text-sm"
            >
              🗑️ Kalitni o'chirish
            </button>
          </div>
          
          <input
            v-model="adminKeyInput"
            type="password"
            placeholder="Admin kalitini kiriting..."
            class="w-full px-3 py-2 border border-yellow-300 dark:border-yellow-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus-ring"
          />
          <button
            @click="setAdminKey"
            class="mt-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 focus-ring transition-colors text-sm"
          >
            Kalitni saqlash
          </button>
        </div>
        </div>
      </div>

      <!-- Existing Thoughts -->
      <div class="card p-6" v-reveal>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Mavjud fikrlar
        </h2>

        <div class="space-y-4">
          <div
            v-for="thought in thoughts"
            :key="thought.id"
            class="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div class="flex items-start justify-between mb-3">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ thought.title }}
              </h3>
              <div class="flex space-x-2">
                <button
                  @click="editThought(thought)"
                  class="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  title="Tahrirlash"
                >
                  <Edit class="w-4 h-4" />
                </button>
                <button
                  @click="deleteThought(thought.id)"
                  class="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="O'chirish"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>

            <p class="text-gray-600 dark:text-gray-400 text-sm mb-2">
              {{ formatDate(thought.createdAt) }}
            </p>

            <p class="text-gray-700 dark:text-gray-300 line-clamp-2">
              {{ getExcerpt(thought.content) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div
      v-if="editingThought"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="closeEditModal"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Fikrni tahrirlash
        </h3>

        <form @submit.prevent="updateThought" class="space-y-4">
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Sarlavha
            </label>
            <input
              v-model="editingThought.title"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus-ring"
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Mazmun
            </label>
            <textarea
              v-model="editingThought.content"
              required
              rows="12"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus-ring resize-none"
            ></textarea>
          </div>

          <div class="flex space-x-4">
            <button
              type="submit"
              class="px-6 py-3 bg-brand-600 text-white rounded-xl hover:bg-brand-700 focus-ring transition-colors font-medium"
            >
              Yangilash
            </button>
            <button
              type="button"
              @click="closeEditModal"
              class="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 focus-ring transition-colors"
            >
              Bekor qilish
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Edit, Trash2, Plus, TrendingUp, Users, Eye } from "lucide-vue-next";
import {
  thoughts,
  addThought as addThoughtData,
  updateThought as updateThoughtData,
  deleteThought as deleteThoughtData,
} from "@/data/thoughts";
import { vReveal } from "@/utils/reveal";

const router = useRouter();

// Admin access control
const isAdmin = computed(() => {
  // Faqat siz admin bo'lasiz
  const adminKey = localStorage.getItem("adminKey");
  return adminKey === "anasxon2025";
});

// State
const newThought = ref({
  title: "",
  content: "",
});

const editingThought = ref<any>(null);
const showSuccessMessage = ref(false);
const successMessage = ref("");
const adminKeyInput = ref("");

// Computed
const totalReactions = computed(() => {
  // Bu yerda reaksiyalar sonini hisoblab chiqaramiz
  return 0; // Hozircha 0, keyin reaksiya tizimi bilan integratsiya qilamiz
});

const totalComments = computed(() => {
  // Bu yerda izohlar sonini hisoblab chiqaramiz
  return 0; // Hozircha 0, keyin izoh tizimi bilan integratsiya qilamiz
});

// Methods
const addThought = () => {
  if (newThought.value.title && newThought.value.content) {
    addThoughtData(newThought.value.title, newThought.value.content);
    newThought.value = { title: "", content: "" };
  }
};

const editThought = (thought: any) => {
  editingThought.value = { ...thought };
};

const updateThought = () => {
  if (editingThought.value) {
    updateThoughtData(
      editingThought.value.id,
      editingThought.value.title,
      editingThought.value.content
    );
    closeEditModal();
  }
};

const deleteThought = (id: string) => {
  if (confirm("Bu fikrni o'chirishni xohlaysizmi?")) {
    deleteThoughtData(id);
  }
};

const closeEditModal = () => {
  editingThought.value = null;
};

const setAdminKey = () => {
  if (adminKeyInput.value === "anasxon2025") {
    localStorage.setItem("adminKey", adminKeyInput.value);
    showSuccessMessage.value = true;
    successMessage.value =
      "✅ Admin kaliti saqlandi! Endi admin sahifasiga kirishingiz mumkin.";
    adminKeyInput.value = "";

    setTimeout(() => {
      showSuccessMessage.value = false;
    }, 3000);
  } else {
    showSuccessMessage.value = true;
    successMessage.value =
      "❌ Noto'g'ri kalit! Iltimos, to'g'ri kalitni kiriting.";
    adminKeyInput.value = "";

    setTimeout(() => {
      showSuccessMessage.value = false;
    }, 3000);
  }
};

const quickAdminAccess = () => {
  localStorage.setItem("adminKey", "anasxon2025");
  showSuccessMessage.value = true;
  successMessage.value = "🚀 Admin kaliti avtomatik saqlandi! Sahifa yangilanadi...";
  
  setTimeout(() => {
    window.location.reload();
  }, 2000);
};

const clearAdminKey = () => {
  localStorage.removeItem("adminKey");
  showSuccessMessage.value = true;
  successMessage.value = "🗑️ Admin kaliti o'chirildi! Sahifa yangilanadi...";
  
  setTimeout(() => {
    window.location.reload();
  }, 2000);
};

const insertText = (before: string, after: string) => {
  const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
  if (textarea) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const beforeText = text.substring(0, start);
    const selectedText = text.substring(start, end);
    const afterText = text.substring(end);

    newThought.value.content =
      beforeText + before + selectedText + after + afterText;

    // Cursor pozitsiyasini yangilash
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  }
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getExcerpt = (content: string): string => {
  const plainText = content.replace(/[#*`]/g, "").replace(/\n/g, " ");
  return plainText.length > 100
    ? plainText.substring(0, 100) + "..."
    : plainText;
};

// Admin access control
onMounted(() => {
  // Admin access tekshirish - avval localStorage ni yuklash
  const adminKey = localStorage.getItem("adminKey");
  if (adminKey === "anasxon2025") {
    // Admin bo'lsa, thoughts ni yuklash
    const stored = localStorage.getItem("thoughts");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Yangi postlar birinchi o'rinda
        parsed.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        thoughts.length = 0;
        thoughts.push(...parsed);
      } catch (e) {
        console.error("Failed to parse stored thoughts:", e);
      }
    }
  } else {
    // Admin bo'lmasa, admin kalitini avtomatik saqlash
    localStorage.setItem("adminKey", "anasxon2025");
    console.log("✅ Admin kaliti avtomatik saqlandi!");
  }
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
