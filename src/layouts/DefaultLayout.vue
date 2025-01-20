<template>
  <Navbar />
  <div class="flex flex-col min-h-screen">
    <div class="flex-grow">
      <main>
        <slot></slot>
      </main>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
</script>

<style scoped>
/* Estilos opcionales */
</style>
