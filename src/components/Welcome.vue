<template>
  <DefaultLayout>
    <div class="container mx-auto py-8">
      <!-- Grid para 6 cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Itera sobre el array de países y pasa las props a cada card -->
        <Card
          v-for="(country, index) in countries"
          :key="index"
          :pais="country.pais"
          :logo="country.logo"
          :titulo="country.titulo"
          :descripcion="country.descripcion"
          :rutaCSV="country.rutaCSV"
        />
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '../layouts/DefaultLayout.vue';
import { useRouter } from 'vue-router';
import Card from './Card.vue';


const countries = [
  {
    pais: 'CR',
    logo: new URL('../assets/logos/bcr.jpg', import.meta.url).href, 
    titulo: 'BCR [Banco de Costa Rica]',
    descripcion: 'Aquí podrás descargar el archivo base que es utilizado para generar el JSON de tu medio de pago. ¡Recuerda convertirlo a .CSV!',
    rutaCSV: new URL('../assets/formatos/bcr.csv', import.meta.url).href
  },
  {
    pais: 'CR',
    logo: new URL('../assets/logos/davivienda.png', import.meta.url).href,
    titulo: 'Davivienda [Costa Rica]',
    descripcion: 'Aquí podrás descargar el archivo base que es utilizado para generar el JSON de tu medio de pago. ¡Recuerda convertirlo a .CSV!',
    rutaCSV: new URL('../assets/formatos/bcr.csv', import.meta.url).href
  },
  {
    pais: 'HN',
    logo: new URL('../assets/logos/honduras.png', import.meta.url).href,
    titulo: 'Banco Atlantida [Honduras]',
    descripcion: 'Aquí podrás descargar el archivo base que es utilizado para generar el JSON de tu medio de pago. ¡Recuerda convertirlo a .CSV!',
    rutaCSV: new URL('../assets/formatos/bcr.csv', import.meta.url).href
  },
  {
    pais: 'EC',
    logo: new URL('../assets/logos/ecuador.png', import.meta.url).href,
    titulo: 'Ecuador',
    descripcion: 'Aquí podrás descargar el archivo base que es utilizado para generar el JSON de tu medio de pago. ¡Recuerda convertirlo a .CSV!',
    rutaCSV: new URL('../assets/formatos/bcr.csv', import.meta.url).href
  },
  {
    pais: 'UY',
    logo: new URL('../assets/logos/getUy.jpg', import.meta.url).href,
    titulo: 'Uruguay',
    descripcion: 'Aquí podrás descargar el archivo base que es utilizado para generar el JSON de tu medio de pago. ¡Recuerda convertirlo a .CSV!',
    rutaCSV: new URL('../assets/formatos/bcr.csv', import.meta.url).href
  },
  {
    pais: 'BZ',
    logo: new URL('../assets/logos/belize.png', import.meta.url).href,
    titulo: 'Belize',
    descripcion: 'Aquí podrás descargar el archivo base que es utilizado para generar el JSON de tu medio de pago. ¡Recuerda convertirlo a .CSV!',
    rutaCSV: new URL('../assets/formatos/bcr.csv', import.meta.url).href
  },
];

const router = useRouter();

const goToBCR = () => {
  router.push({ name: 'BCRPage' });
};
</script>
