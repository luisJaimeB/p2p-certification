<template>
    <div class="px-4 mx-auto max-w-7xl sm:px-6">
    <div class="relative pt-6 pb-16 sm:pb-24">
        <nav class="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
            <div class="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                <div class="flex items-center justify-between w-full md:w-auto">
                    <a href="#"><span class="sr-only">Tipos de crédito</span>
                        <img class="w-auto h-8 sm:h-10" src="/src/assets/logos/placetopay.png" loading="lazy" width="202" height="40">
                    </a>
                    <div class="flex items-center -mr-2 md:hidden">
                        <button class="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-50 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-50"  type="button" aria-expanded="false">
                            <span class="sr-only">Open main menu</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="hidden md:flex md:space-x-10 list-none">
                <li>
                    <RouterLink to="/bcr" class="text-base font-normal text-gray-500 list-none hover:text-gray-900"
                        target="">BCR
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/davivienda" class="text-base font-normal text-gray-500 list-none hover:text-gray-900"
                        target="">Davivienda
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/ecuador" class="text-base font-normal text-gray-500 list-none hover:text-gray-900"
                        target="">Ecuador
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/uruguay" class="text-base font-normal text-gray-500 list-none hover:text-gray-900"
                        target="">Uruguay
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/honduras" class="text-base font-normal text-gray-500 list-none hover:text-gray-900"
                        target="">Honduras
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/belize" class="text-base font-normal text-gray-500 list-none hover:text-gray-900"
                        target="">Belize
                    </RouterLink>
                </li>
            </div>
        </nav>
    </div>
</div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToBCR = () => {
  router.push({ name: 'BCRPage' });
};
</script>

<style scoped>
/* Estilos del navbar */
</style>
  