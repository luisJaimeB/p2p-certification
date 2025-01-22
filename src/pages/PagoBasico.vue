<template>
  <DefaultLayout>
    <div class="container mx-auto py-8">
      <div class="flex justify-center px-3 py-3">
        <div class="w-full max-w-4xl rounded overflow-hidden shadow-lg">
          <!-- Input para cargar archivo -->
          <div class="mx-auto max-w-xs mb-4">
            <label for="example1" class="mb-1 block text-sm font-medium text-gray-700">Transacción aprobada</label> <br>
            <div class="flex items-center mt-2">
              <!-- Input de archivo -->
              <input
                id="example1"
                type="file"
                @change="handleFileChange"
                class="block w-full text-sm rounded-none file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60 file:rounded-l-md"
              />
              <!-- Botón para procesar, alineado a la derecha -->
              <button
                @click="processFile"
                class="ml-auto bg-teal-500 text-white font-semibold py-2 px-4 rounded-r-md hover:bg-teal-700 focus:outline-none"
              >
                Procesar
              </button>
            </div>
          </div>

          <!-- Bloque pre para mostrar el JSON -->
          <div class="relative p-4">
            <button
              @click="copyToClipboard"
              class="absolute right-0 top-0 text-white h-6 w-6 mr-2"
              fill="currentColor"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M192 0c-41.8 0-77.4 26.7-90.5 64L64 64C28.7 64 0 92.7 0 128L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64l-37.5 0C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112 192l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
              </svg>
            </button>
  
            <!-- Pre para mostrar el JSON generado -->
            <pre ref="preElement" class="text-gray-700 text-base mt-8 bg-gray-100 p-4 rounded max-h-96 overflow-y-auto">
              {{ formattedJson }}
            </pre>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '../layouts/DefaultLayout.vue';
import { ref } from 'vue';

const preElement = ref(null);
const selectedFile = ref(null);
const csvData = ref([]);
const jsonResult = ref({ include: [] }); // Almacenamos el resultado del JSON generado
const formattedJson = ref(""); // Para mostrar el JSON formateado en el <pre>

// Función para manejar el cambio de archivo
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    console.log("Archivo seleccionado:", file.name);
  } else {
    console.error("No se seleccionó ningún archivo.");
  }
};

// Función para procesar el archivo cuando se hace clic en el botón
const processFile = () => {
  if (!selectedFile.value) {
    console.error("No hay archivo seleccionado para procesar.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target.result;
    processCSV(text);
  };
  reader.readAsText(selectedFile.value);
};

const processCSV = (text) => {
  const rows = text.split("\n");
  const result = rows.slice(1).map((row) => row.split(";")); // Saltamos la primera fila
  
  const jsonResultTemp = {
    include: [
      {
        ranges: [],
        credits: []
      }
    ]
  };

  const binRangesSet = new Set();
  const processedCredits = new Set();

  result.forEach((row) => {
    if (row.length >= 8) {
      const [terminalNumber, merchantCode, description, bin, start, end, franchise, binName] = row;

      const binKey = `${bin}-${start}-${end}`;
      if (!binRangesSet.has(binKey)) {
        jsonResultTemp.include[0].ranges.push({
          bin,
          start,
          end
        });
        binRangesSet.add(binKey);
      }

      const creditKey = `${merchantCode}-${description}`;
      if (!processedCredits.has(creditKey)) {
        const installment = description.includes("6 cuotas") ? 6 : 3;
        const code = installment === 6 ? "06BCR" : "03BCR";
        jsonResultTemp.include[0].credits.push({
          code,
          description,
          installment,
          merchantCode,
          terminalNumber
        });
        processedCredits.add(creditKey);
      }
    }
  });

  jsonResult.value = jsonResultTemp;
  formattedJson.value = JSON.stringify(jsonResultTemp, null, 2); // Actualiza el valor que se mostrará en el <pre>
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(formattedJson.value).then(() => {
    alert('Texto copiado al portapapeles');
  });
};
</script>

<style scoped>
/* Opcionalmente, puedes ajustar más detalles de estilo si es necesario */
</style>
