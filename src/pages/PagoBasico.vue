<template>
  <DefaultLayout>
    <div class="container mx-auto py-8 px-4">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Generar PDF para certificarte</h2>
      
      <!-- Campos de texto adicionales -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
       <div>
            <label for="email" class="block text-sm font-medium mb-2">Correo electrónico</label>
            <div class="relative">
              <input
                type="email"
                id="email"
                v-model="email"
                @input="validateEmails"
                :class="{
                  'border-red-500 focus:ring-red-500': emailError || !isValidEmail(email),
                  'border-green-500 focus:ring-green-500': !emailError && isValidEmail(email)
                }"
                class="py-3 px-4 block w-full border rounded-lg text-sm"
                required
              >
            </div>
            <p v-if="!isValidEmail(email)" class="text-sm text-red-600 mt-2">Por favor, ingrese un correo electrónico válido.</p>
          </div>

          <div >
            <label for="confirmEmail" class="block text-sm font-medium mb-2">Escribe nuevamente el correo electrónico</label>
            <div class="relative">
              <input
                type="email"
                id="confirmEmail"
                v-model="confirmEmail"
                @input="validateEmails"
                :class="{
                  'border-red-500 focus:ring-red-500': emailError || !isValidEmail(confirmEmail),
                  'border-green-500 focus:ring-green-500': !emailError && isValidEmail(confirmEmail)
                }"
                class="py-3 px-4 block w-full border rounded-lg text-sm"
                required
              >
            </div>
            <p v-if="emailError" class="text-sm text-red-600 mt-2">{{ emailError }}</p>
            <p v-else-if="!isValidEmail(confirmEmail)" class="text-sm text-red-600 mt-2">Por favor, ingrese un correo electrónico válido.</p>
            <p v-else-if="email && confirmEmail && email === confirmEmail" class="text-sm text-green-600 mt-2">¡Los correos coinciden correctamente!</p>
          </div>
      <div>
        <p class="text-sm text-gray-700 mt-2">Haz clic aqui para descargar la guia de certificación:</p>
        <a href="src/assets/guias/Guia de certificacion WC.docx" download class="text-blue-500 hover:underline">
         <button type="button" class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-transparent bg-orange-600 text-white hover:bg-orange-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
          Descargar PDF
        </button>
          
        </a>
      </div>



       <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Comercio</label>
        <input
          v-model="commerce"
          @input="validateFields"
          type="text"
          class="w-full p-2 border rounded-md"
          required
        >
        <p v-if="!commerce" class="text-sm text-red-600 mt-2">Este campo es obligatorio.</p>
      </div>      
        <div>
          <label for="country" class="block text-sm font-medium text-gray-700 mb-2">País</label>
          <select
            v-model="country"
            @input="validateFields"
            id="country"
            class="w-full p-2 border rounded-md"
            required
          >
            <option value="">Seleccione un país</option>
            <option value="Colombia">Colombia</option>
            <option value="GOU">GOU</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Davivienda">Davivienda</option>
            <option value="Uruguay">Uruguay</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Puerto Rico">Puerto Rico</option>
            <option value="Honduras">Honduras</option>
          </select>
          <p v-if="!country" class="text-sm text-red-600 mt-2">Este campo es obligatorio.</p>
        </div>
       <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">URL de notificación</label>
          <input
            v-model="notificationUrl"
            @input="validateFields"
            type="text"
            class="w-full p-2 border rounded-md"
            required
          >
          <p v-if="!notificationUrl" class="text-sm text-red-600 mt-2">Este campo es obligatorio.</p>
        </div>
       <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">URL del sitio</label>
          <input
            v-model="siteUrl"
            @input="validateFields"
            type="text"
            class="w-full p-2 border rounded-md"
            required
          >
          <p v-if="!siteUrl" class="text-sm text-red-600 mt-2">Este campo es obligatorio.</p>
      </div>
    </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="field in fields" :key="field.id" class="bg-white shadow-md rounded-lg overflow-hidden">
            <div class="p-4">
              <div class="flex flex-col h-full">
                <label :for="`file-${field.id}`" class="mb-2 block text-sm font-medium text-gray-700">
                  {{ field.label }}
                </label>
                <!-- Descripción corta -->
                <p v-if="field.description" class="text-sm text-gray-500 mb-2">
                  {{ field.description }}
                </p>
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
                  class="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                  {{ field.file ? 'Cambiar archivo' : 'Seleccionar archivo' }}
                </button>
              </div>
            </div>
          </div>



      </div>

      <div class="mt-8 text-center">
     <div class="mt-8 text-center">
        <button 
          @click="generatePDF" 
          :disabled="!canProcess"
          :class="[ 
            'font-bold py-3 px-8 rounded transition duration-300 ease-in-out',
            canProcess ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          ]"
        >
          Procesar todos los archivos
        </button>
      </div>

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
const formError = ref(false);
const email = ref('');
const confirmEmail = ref('');
const emailError = ref('');



const fields = ref([
  { id: 1, label: 'Inicio de pago', file: null, preview: null, description: 'Incluye un archivo que detalle el inicio de procesos de pago.' },
  { id: 2, label: 'Transacción aprobada', file: null, preview: null, description: 'Sube un archivo relacionado con transacciones aprobadas.' },
  { id: 3, label: 'Transacción pendiente', file: null, preview: null, description: 'Sube un archivo relacionado con transacciones en estado pendiente.' },
  { id: 4, label: 'Transacción rechazada', file: null, preview: null, description: 'Sube un archivo que documente transacciones rechazadas.' },
  { id: 5, label:  'Reintento de transacción', file: null, preview: null, description: 'Incluye un archivo que refleje reintentos de transacciones.' },
  { id: 6, label:  'Tiempo expiración', file: null, preview: null, description: 'Define el tiempo en horas antes de que un link de pago expire.'},
  { id: 7, label: 'Preguntas frecuentes', file: null, preview: null, description: 'Proporciona un archivo con preguntas frecuentes relacionadas.' },
  { id: 8, label: 'Términos y condiciones', file: null, preview: null, description: 'Sube un archivo con los términos y condiciones aplicables.' },
  { id: 9, label: 'Mensaje control doble pago', file: null, preview: null, description: 'Incluye un archivo que muestre el mensaje de control para evitar pagos duplicados.' },
  { id: 10, label: 'Credenciales de conexión', file: null, preview: null, description: 'Proporciona un archivo que contenga las credenciales de conexión.' },
  { id: 11, label: 'Control botón de redirección', file: null, preview: null, description: 'Sube un archivo relacionado con el control del botón de redirección.' },
]);


// Expresión regular para validar correos electrónicos
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validar los correos electrónicos
const validateEmails = () => {
  if (!isValidEmail(email.value)) {
    emailError.value = 'El correo electrónico no es válido.';
  } else if (email.value && confirmEmail.value && email.value !== confirmEmail.value) {
    emailError.value = 'Los correos electrónicos no coinciden.';
  } else {
    emailError.value = '';
  }
};

// Validar si todos los campos de texto están completos
const areTextFieldsComplete = computed(() => {
  return email.value && confirmEmail.value && email.value === confirmEmail.value &&
    isValidEmail(email.value) && commerce.value && notificationUrl.value && siteUrl.value;
});

// Validar si todos los archivos requeridos están cargados
const areFilesComplete = computed(() => {
  return fields.value.every((field) => field.preview !== null);
});

// Computed para habilitar/deshabilitar el botón
const canProcess = computed(() => {
  return areTextFieldsComplete.value && areFilesComplete.value;
});

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

    if (email.value) {
      pdf.text(`Correo electronico: ${email.value}`, 20, yPosition);
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