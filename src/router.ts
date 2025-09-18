import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Projects from "./pages/Projects.vue";
import ProjectDetail from "./pages/ProjectDetail.vue";
import Thoughts from "./pages/Thoughts.vue";
import ThoughtDetail from "./pages/ThoughtDetail.vue";
import Admin from "./pages/Admin.vue";
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        title: "Anasxon — Portfolio",
        description: "Anasxon portfoliosi: loyihalar, fikrlar va tajriba.",
      },
    },
    {
      path: "/projects",
      name: "Projects",
      component: Projects,
      meta: {
        title: "Qilgan ishlarim — Anasxon Portfolio",
        description:
          "Anasxon tomonidan bajarilgan loyihalar va ularning tavsifi.",
      },
    },
    {
      path: "/projects/:slug",
      name: "ProjectDetail",
      component: ProjectDetail,
      meta: {
        title: "Loyiha — Anasxon Portfolio",
        description: "Loyiha haqida batafsil ma'lumot.",
      },
    },
    {
      path: "/fikrlar",
      name: "Thoughts",
      component: Thoughts,
      meta: {
        title: "Fikrlarim — Anasxon Portfolio",
        description: "Anasxon fikrlari va tajribalari.",
      },
    },
    {
      path: "/fikrlar/:id",
      name: "ThoughtDetail",
      component: ThoughtDetail,
      meta: {
        title: "Fikr — Anasxon Portfolio",
        description: "Fikr haqida batafsil ma'lumot.",
      },
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin,
      meta: {
        title: "Admin Panel — Anasxon Portfolio",
        description: "Fikrlar va postlarni boshqarish.",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
      meta: {
        title: "Sahifa topilmadi — Anasxon Portfolio",
        description: "Qidirilayotgan sahifa topilmadi.",
      },
    },
  ],
});

// Update page title and meta description
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  if (to.meta.description) {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", to.meta.description as string);
    }
  }
  next();
});

export default router;
