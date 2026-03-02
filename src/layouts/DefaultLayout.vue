<template>
	<div class="min-h-screen bg-orange-100/15">
		<Header /> 
		<main>
			<slot></slot>
		</main>
		<Footer />
	</div>
</template>

<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
</script>

<style scoped>
/* Estilos opcionales */
</style>
