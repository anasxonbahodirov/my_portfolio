<template>
  <header class="navbar">
    <div class="logo">MyPortfolio</div>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#education">Education</a></li>
        <li><a href="#blog">Blog</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
// Navbar logic if needed
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: #232946;
  color: #fff;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.05);
}
.logo {
  font-size: 1.7rem;
  font-weight: 700;
  letter-spacing: 1px;
}
nav ul {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
nav a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
nav a:hover {
  color: #eebbc3;
}
@media (max-width: 700px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  nav ul {
    flex-direction: column;
    gap: 0.7rem;
  }
}
</style>
