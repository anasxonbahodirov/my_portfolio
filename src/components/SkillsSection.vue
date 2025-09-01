<template>
  <section id="skills" class="section">
    <h2>Skills</h2>
    <ul class="skills-list">
      <li>Vue.js</li>
      <li>JavaScript</li>
      <li>HTML5 & CSS3</li>
      <li>Responsive Design</li>
      <li>UI/UX</li>
    </ul>
  </section>
</template>

<script setup>
// Skills section logic if needed
</script>

<style scoped>
.section {
  padding: 4rem 2rem 2rem 2rem;
  max-width: 900px;
  margin: 0 auto;
}
.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0;
  list-style: none;
}
.skills-list li {
  background: #eebbc3;
  color: #232946;
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  font-weight: 500;
  margin-bottom: 0.5rem;
}
</style>
