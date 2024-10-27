<script setup lang="ts">
import { ref } from 'vue'
import { MailIcon, LockIcon } from 'lucide-vue-next'
import { Link } from '@inertiajs/vue3';

const email = ref('')
const password = ref('')

const handleLogin = () => {
  // Aquí iría la lógica de inicio de sesión
  console.log('Iniciando sesión con:', email.value, password.value)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-900">
    <div class="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">Iniciar sesión</h2>
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="text-sm font-medium text-gray-700 block mb-2">Correo electrónico</label>
          <div class="relative">
            <MailIcon class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="tu@ejemplo.com"
            />
          </div>
        </div>
        <div>
          <label for="password" class="text-sm font-medium text-gray-700 block mb-2">Contraseña</label>
          <div class="relative">
            <LockIcon class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
          >
            Iniciar sesión
          </button>
        </div>
        <div class="mt-4 text-center">
          <Link href="/password-recovery" class="text-sm text-indigo-600 hover:text-indigo-500 transition-colors duration-300">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </form>
      <div class="mt-6 text-center">
        <Link href="/register" class="text-sm text-indigo-600 hover:text-indigo-500 transition-colors duration-300">
          ¿No tienes una cuenta? Regístrate
        </Link>
      </div>
    </div>
  </div>
</template>
