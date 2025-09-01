

<template>
  <div id="app">
    <Navbar />
    <main>
      <HomeSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <BlogSection />
      <ContactSection />
    </main>
    <FooterBar />
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import HomeSection from "./components/HomeSection.vue";
import AboutSection from "./components/AboutSection.vue";
import SkillsSection from "./components/SkillsSection.vue";
import ProjectsSection from "./components/ProjectsSection.vue";
import ExperienceSection from "./components/ExperienceSection.vue";
import EducationSection from "./components/EducationSection.vue";
import BlogSection from "./components/BlogSection.vue";
import ContactSection from "./components/ContactSection.vue";
import FooterBar from "./components/FooterBar.vue";
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap");

#app {
  font-family: "Inter", Avenir, Helvetica, Arial, sans-serif;
  background: #f6f8fa;
  color: #232946;
  min-height: 100vh;
}
</style>
