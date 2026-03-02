<script setup>
import { ref } from 'vue'
import MerchantInfoSection from './MerchantInfoSection.vue'
import EvidenceSection from './EvidenceSection.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const merchantData = ref({
	merchantName: '',
	email: '',
	programmingLanguage: '',
	serviceType: ''
})

const evidences = ref({
	update: { file: null, status: 'pending' },
	probe: { file: null, status: 'pending' },
	webhook: { file: null, status: 'pending' },
	dataValidation: { description: '', status: 'pending' },
	general: { description: '', status: 'pending' },
	expirationTime: '',
	termsAccepted: false
})

const handleSubmit = () => {
	console.log('Submitting data:', {
		merchant: merchantData.value,
		evidences: evidences.value
	})
	// Future backend integration here
	alert('Evidencias enviadas correctamente')
}
</script>

<template>
	<DefaultLayout>
		<main class="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
			<MerchantInfoSection v-model="merchantData" />
			<EvidenceSection v-model="evidences" class="mt-8" />
	
			<div class="flex justify-end gap-4 mt-8">
			<button type="button"
				class="px-6 py-3 font-medium text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50">
				Cancelar
			</button>
			<button type="button"
				class="px-6 py-3 font-medium text-white transition-colors rounded-lg shadow-md bg-evertec-orange hover:bg-orange-600"
				@click="handleSubmit">
				Enviar Evidencias
			</button>
			</div>
		</main>
	</DefaultLayout>
</template>

<style></style>
