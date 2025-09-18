import type { Directive } from "vue";

export const vReveal: Directive<HTMLElement> = {
  mounted(el) {
    el.style.opacity = "0";
    el.style.transform = "translateY(12px)";
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.style.transition = "opacity .6s ease, transform .6s ease";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
  },
};
