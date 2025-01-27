<template>
  <DefaultLayout>
    <div class="container mx-auto py-8 px-4">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Generar PDF para certificarte</h2>
      
      <!-- Campos de texto adicionales -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="max-w-sm space-y-3">
          <div class="relative">
            <input type="email" class="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter name">
            <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
              <svg class="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>
        </div>
        <div class="max-w-sm space-y-3">
          <div class="relative">
            <input type="password" class="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter password">
            <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
              <svg class="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path>
                <circle cx="16.5" cy="7.5" r=".5"></circle>
              </svg>
            </div>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Comercio</label>
          <input v-model="commerce" type="text" class="w-full p-2 border rounded-md">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">URL de notificación</label>
          <input v-model="notificationUrl" type="text" class="w-full p-2 border rounded-md">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">URL del sitio</label>
          <input v-model="siteUrl" type="text" class="w-full p-2 border rounded-md">
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="field in fields" :key="field.id" class="bg-white shadow-md rounded-lg overflow-hidden">
          <div class="p-4">
            <div class="flex flex-col h-full">
              <label :for="`file-${field.id}`" class="mb-2 block text-sm font-medium text-gray-700">
                {{ field.label }}
              </label>
              <div class="relative mb-4 flex-grow">
                <template v-if="field.preview">
                  <div class="relative aspect-video">
                    <img :src="field.preview" alt="Vista previa" class="w-full h-full object-cover rounded-md" />
                    <button
                      @click="removeFile(field.id)"
                      class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 focus:outline-none"
                    >
                      X
                    </button>
                  </div>
                </template>
                <template v-else>
                  <div
                    class="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer"
                    @click="triggerFileInput(field.id)"
                  >
                    <p class="text-gray-500">Haga clic para subir o arrastre un archivo aquí</p>
                  </div>
                </template>
                <input
                  :ref="(el) => setFileInputRef(el, field.id)"
                  :id="`file-${field.id}`"
                  type="file"
                  class="hidden"
                  @change="(e) => handleImageUpload(field.id, e)"
                  accept="image/*,application/pdf"
                />
              </div>
              <button
                @click="triggerFileInput(field.id)"
                class="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                {{ field.file ? 'Cambiar archivo' : 'Seleccionar archivo' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 text-center">
        <button 
          @click="generatePDF" 
          :disabled="!hasFiles"
          :class="[
            'font-bold py-3 px-8 rounded transition duration-300 ease-in-out',
            hasFiles ? 'bg-teal-500 hover:bg-teal-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          ]"
        >
          Procesar todos los archivos
        </button>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '../layouts/DefaultLayout.vue';
import { ref, computed } from 'vue';
import { jsPDF } from 'jspdf';

// Variables reactivas
const country = ref('');
const commerce = ref('');
const notificationUrl = ref('');
const siteUrl = ref('');

const fields = ref([
  { id: 1, label: 'Tiempo expiración', file: null, preview: null },
  { id: 2, label: 'Transacción aprobada', file: null, preview: null },
  { id: 3, label: 'Reintento de transacción', file: null, preview: null },
  { id: 4, label: 'Transacción pendiente', file: null, preview: null },
]);

// Computed property para verificar si hay archivos cargados
const hasFiles = computed(() => {
  return fields.value.some(field => field.preview !== null);
});

// Referencias a los inputs de archivo usando un Map
const fileInputRefs = new Map();

// Función para establecer las referencias
const setFileInputRef = (el, id) => {
  if (el) {
    fileInputRefs.set(id, el);
  }
};

// Manejar carga de imágenes
const handleImageUpload = (id, event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const updatedFields = fields.value.map((field) =>
        field.id === id
          ? { ...field, file, preview: e.target.result }
          : field
      );
      fields.value = updatedFields;
    };
    reader.readAsDataURL(file);
  }
};

// Disparar el input de archivo
const triggerFileInput = (id) => {
  const input = fileInputRefs.get(id);
  if (input) {
    input.click();
  }
};

// Generar el PDF
const generatePDF = async () => {
  try {
    const pdf = new jsPDF();
    let yPosition = 20;
    
    // Agregar texto de los campos
    pdf.setFontSize(16);
    if (country.value) {
      pdf.text(`País: ${country.value}`, 20, yPosition);
      yPosition += 10;
    }
    
    if (commerce.value) {
      pdf.text(`Comercio: ${commerce.value}`, 20, yPosition);
      yPosition += 10;
    }
    
    if (notificationUrl.value) {
      pdf.setFontSize(12);
      pdf.text(`URL de notificación: ${notificationUrl.value}`, 20, yPosition);
      yPosition += 10;
    }
    
    if (siteUrl.value) {
      pdf.text(`URL del sitio: ${siteUrl.value}`, 20, yPosition);
      yPosition += 20;
    }

    // Procesar cada imagen
    for (const field of fields.value) {
      if (field.preview) {
        // Agregar título de la imagen
        pdf.setFontSize(14);
        pdf.text(field.label, 20, yPosition);
        yPosition += 10;

        // Agregar la imagen
        const imgWidth = 170; // Ancho fijo para la imagen
        const imgHeight = 100; // Alto fijo para la imagen

        // Verificar si necesitamos una nueva página
        if (yPosition + imgHeight > pdf.internal.pageSize.height - 20) {
          pdf.addPage();
          yPosition = 20;
        }

        try {
          await pdf.addImage(
            field.preview,
            'JPEG',
            20,
            yPosition,
            imgWidth,
            imgHeight,
            undefined,
            'FAST'
          );
          yPosition += imgHeight + 20; // Espacio después de la imagen
        } catch (error) {
          console.error(`Error al agregar imagen ${field.label}:`, error);
        }
      }
    }

    // Guardar el PDF
    pdf.save('certificacion.pdf');
  } catch (error) {
    console.error('Error al generar el PDF:', error);
    alert('Hubo un error al generar el PDF. Por favor, intente nuevamente.');
  }
};

// Eliminar archivo
const removeFile = (id) => {
  fields.value = fields.value.map((field) =>
    field.id === id ? { ...field, file: null, preview: null } : field
  );
};
</script>