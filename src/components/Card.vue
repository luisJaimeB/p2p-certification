<template>
    <div class="max-w-2xl mx-auto mt-24 p-6">
        <div class="flex gap-3 bg-white border border-gray-200 rounded-xl overflow-hidden items-center justify-start shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">

        <div class="relative w-32 h-32 flex-shrink-0">
            <img class="absolute left-0 top-0 w-full m-2 h-full object-cover object-center transition duration-50" loading="lazy" :src="logo" />
        </div>

        <div class="flex flex-col gap-2 ml-2 mr-2 py-2">
            <p class="text-xl font-bold">{{ titulo }}</p>
            <p class="text-gray-500">
            {{ descripcion }}
            </p>
            <button @click="downloadCSV">Download</button>
        </div>

        </div>
    </div>
</template>

<script setup>

// Definir las props
const props = defineProps({
pais: String,
logo: String,
titulo: String,
descripcion: String,
rutaCSV: String
});

// Función para descargar el archivo CSV
const downloadCSV = () => {
const link = document.createElement('a');
link.href = props.rutaCSV;
link.download = `${props.pais}.csv`;
link.click();
};
</script>
