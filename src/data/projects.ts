import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "p1",
    slug: "smart-sklad",
    title: "Smart Sklad — Ombor boshqaruvi",
    description:
      "Vue + Node asosida omborni real-vaqt monitoring, QR skan va analitika bilan.",
    teamSize: 4,
    rating: 4.5,
    period: "2024 — 2025",
    role: "Frontend lead",
    stack: ["Vue 3", "TypeScript", "Pinia", "Tailwind", "Node", "PostgreSQL"],
    tags: ["SaaS", "B2B", "Dashboard"],
    links: { demo: "#", repo: "#" },
    highlights: [
      "Skalab qilinadigan modul arxitekturasi",
      "QR orqali qabul/chiqarish jarayonlari",
      "KPI grafikalari va eksport",
    ],
    images: ["/cover1.jpg"],
  },
  {
    id: "p2",
    slug: "container-market",
    title: "Container Market — katalog va buyurtma",
    description:
      "Konteynerlar katalogi, filterlar, reyting va aloqa shakli bilan.",
    teamSize: 2,
    rating: 4.8,
    period: "2025",
    role: "Full‑stack",
    stack: ["Vue 3", "TypeScript", "Tailwind", "Supabase"],
    tags: ["E‑commerce", "Landing"],
    links: { demo: "#", repo: "#" },
    highlights: [
      "Mobilga mos, tez yuklanish",
      "Supabase bilan buyurtmalar",
      "SEO optimizatsiya",
    ],
    images: ["/cover2.jpg"],
  },
  {
    id: "p3",
    slug: "task-manager",
    title: "Task Manager — Vazifa boshqaruvi",
    description:
      "Jamoa uchun vazifa boshqaruvi, progress tracking va reporting.",
    teamSize: 3,
    rating: 4.2,
    period: "2024",
    role: "Backend developer",
    stack: ["Node.js", "Express", "MongoDB", "Socket.io"],
    tags: ["Productivity", "Team"],
    links: { demo: "#", repo: "#" },
    highlights: [
      "Real-vaqt yangilanishlar",
      "Kanban board",
      "API va webhook integratsiyasi",
    ],
    images: ["/cover3.jpg"],
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((project) => project.slug === slug);
};
