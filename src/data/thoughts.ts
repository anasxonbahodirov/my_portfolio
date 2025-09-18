import type { Thought } from "@/types";

export const thoughts: Thought[] = [
  {
    id: "t1",
    title: "Oddiylik — eng yaxshi dizayn",
    content: `# Oddiylik — eng yaxshi dizayn

UI/UX'da ortiqcha bezakdan ko'ra, **aniq ierarxiya** va **toza bo'sh joy** muhim.

## Nima uchun oddiylik?

- **Foydalanuvchi tajribasi**: Ortiqcha elementlar chalg'ituvchi
- **Tez yuklanish**: Kamroq CSS/JS = tezroq sahifa
- **Mobil moslik**: Oddiy dizayn har qanday qurilmada yaxshi ko'rinadi

## Qanday amalga oshirish?

1. **Ranglar**: 2-3 ta asosiy rang + 1-2 ta accent
2. **Fontlar**: Maksimal 2 ta font oilasi
3. **Bo'sh joy**: Elementlar orasida nafis masofalar
4. **Ierarxiya**: Sarlavhalar va matn o'lchamlari aniq

> "Dizayn oddiy bo'lganda, foydalanuvchi fokus qiladi" — Steve Jobs

Oddiylik — bu professional dizaynning eng yuqori darajasi.`,
    createdAt: "2025-01-15T12:00:00.000Z",
  },
  {
    id: "t2",
    title: "Vue 3 Composition API — kelajak",
    content: `# Vue 3 Composition API — kelajak

Vue 3 ning Composition API — bu frontend developmentning yangi davri.

## Afzalliklari

- **Reusability**: Logic ni qayta ishlatish oson
- **TypeScript**: Yaxshiroq type inference
- **Tree-shaking**: Faqat kerakli kod yuklanadi
- **Testing**: Logic ni alohida test qilish

## Misol

\`\`\`vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

const increment = () => count.value++
</script>
\`\`\`

Composition API bilan kod tuzilishi aniq va o'qish oson bo'ladi.`,
    createdAt: "2025-01-10T10:30:00.000Z",
  },
  {
    id: "t3",
    title: "Tailwind CSS — utility-first yondashuv",
    content: `# Tailwind CSS — utility-first yondashuv

Tailwind CSS — bu CSS framework emas, utility-first CSS framework.

## Nima uchun Tailwind?

- **Tezlik**: Utility class lar bilan tez ishlash
- **Konsistensiya**: Design system avtomatik
- **Responsive**: Mobil-first yondashuv
- **Customization**: Tailwind config orqali o'zgartirish

## Misol

\`\`\`html
<div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
  <h2 class="text-xl font-semibold text-gray-900 mb-4">
    Sarlavha
  </h2>
  <p class="text-gray-600">
    Matn matni...
  </p>
</div>
\`\`\`

Tailwind bilan CSS yozish shart emas, utility class lar yetarli.`,
    createdAt: "2025-01-05T15:45:00.000Z",
  },
];

export const getThoughtById = (id: string): Thought | undefined => {
  return thoughts.find((thought) => thought.id === id);
};

export const getRecentThoughts = (limit: number = 3): Thought[] => {
  return thoughts
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, limit);
};

// Admin funksiyalari
export const addThought = (title: string, content: string): void => {
  const newThought: Thought = {
    id: `t${Date.now()}`,
    title,
    content,
    createdAt: new Date().toISOString(),
  };
  thoughts.push(newThought);
  // localStorage ga saqlash
  localStorage.setItem("thoughts", JSON.stringify(thoughts));
};

export const updateThought = (
  id: string,
  title: string,
  content: string
): void => {
  const thoughtIndex = thoughts.findIndex((t) => t.id === id);
  if (thoughtIndex !== -1) {
    thoughts[thoughtIndex] = {
      ...thoughts[thoughtIndex],
      title,
      content,
      updatedAt: new Date().toISOString(),
    };
    // localStorage ga saqlash
    localStorage.setItem("thoughts", JSON.stringify(thoughts));
  }
};

export const deleteThought = (id: string): void => {
  const thoughtIndex = thoughts.findIndex((t) => t.id === id);
  if (thoughtIndex !== -1) {
    thoughts.splice(thoughtIndex, 1);
    // localStorage ga saqlash
    localStorage.setItem("thoughts", JSON.stringify(thoughts));
  }
};

// localStorage dan yuklash
export const loadThoughtsFromStorage = (): void => {
  const stored = localStorage.getItem("thoughts");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      thoughts.length = 0; // Array ni tozalash
      thoughts.push(...parsed);
    } catch (e) {
      console.error("Failed to parse stored thoughts:", e);
    }
  }
};
