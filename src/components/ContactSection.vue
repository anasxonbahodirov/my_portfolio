<template>
  <section id="contact" class="section">
    <h2>Contact</h2>
    <form class="contact-form">
      <input type="text" placeholder="Your Name" required />
      <input type="email" placeholder="Your Email" required />
      <textarea placeholder="Your Message" required></textarea>
      <button type="submit">Send</button>
    </form>
    <div class="social-links">
      <a href="#" aria-label="LinkedIn">🔗</a>
      <a href="#" aria-label="GitHub">🐱</a>
      <a href="#" aria-label="Twitter">🐦</a>
    </div>
  </section>
</template>

<script setup>
// Contact section logic if needed
</script>

<style scoped>
.section {
  padding: 4rem 2rem 2rem 2rem;
  max-width: 900px;
  margin: 0 auto;
}
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 1rem 0;
}
.contact-form input,
.contact-form textarea {
  padding: 0.8rem;
  border: 1px solid #b8c1ec;
  border-radius: 8px;
  font-size: 1rem;
  background: #fff;
  color: #232946;
}
.contact-form button {
  background: #232946;
  color: #fff;
  border: none;
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.contact-form button:hover {
  background: #eebbc3;
  color: #232946;
}
.social-links {
  margin-top: 1rem;
  display: flex;
  gap: 1.2rem;
  font-size: 1.5rem;
}
</style>
