<script setup lang="ts" >
import { ref } from 'vue'
import { MailIcon } from 'lucide-vue-next'
import { Link } from '@inertiajs/vue3';

const email = ref('')

const handlePasswordRecovery = () => {
  // Aquí iría la lógica de recuperación de contraseña
  console.log('Solicitando recuperación de contraseña para:', email.value)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-700 to-teal-900">
    <div class="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">Recuperar contraseña</h2>
      <form @submit.prevent="handlePasswordRecovery" class="space-y-6">
        <div>
          <label for="email" class="text-sm font-medium text-gray-700 block mb-2">Correo electrónico</label>
          <div class="relative">
            <MailIcon class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              placeholder="tu@ejemplo.com"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-300"
          >
            Enviar instrucciones de recuperación
          </button>
        </div>
      </form>
      <div class="mt-6 text-center">
        <Link href="/login" class="text-sm text-teal-600 hover:text-teal-500 transition-colors duration-300">
          Volver al inicio de sesión
        </Link>
      </div>
    </div>
  </div>
</template>


