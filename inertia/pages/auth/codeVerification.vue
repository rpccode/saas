<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-700 to-blue-900">
    <div class="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">Verificar código</h2>
      <p class="text-center text-gray-600 mb-6">
        Hemos enviado un código de 6 dígitos a tu correo electrónico. Por favor, ingrésalo a continuación.
      </p>
      <form @submit.prevent="handleVerification" class="space-y-6">
        <div class="flex justify-between">
          <input
            v-for="(digit, index) in codeDigits"
            :key="index"
            v-model="codeDigits[index]"
            type="text"
            maxlength="1"
            class="w-12 h-12 text-center text-2xl border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            @input="focusNextInput(index)"
            @keydown.backspace="focusPrevInput(index)"
          />
        </div>
        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
          >
            Verificar
          </button>
        </div>
      </form>
      <div class="mt-6 text-center">
        <button @click="resendCode" class="text-sm text-blue-600 hover:text-blue-500 transition-colors duration-300">
          ¿No recibiste el código? Reenviar
        </button>
      </div>
      <div class="mt-4 text-center">
        <Link href="/login" class="text-sm text-blue-600 hover:text-blue-500 transition-colors duration-300">
          Volver al inicio de sesión
        </Link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const codeDigits = ref(['', '', '', '', '', ''])

const focusNextInput = (index) => {
  if (index < 5 && codeDigits.value[index].length === 1) {
    const nextInput = document.querySelectorAll('input')[index + 1]
    nextInput.focus()
  }
}

const focusPrevInput = (index) => {
  if (index > 0 && codeDigits.value[index].length === 0) {
    const prevInput = document.querySelectorAll('input')[index - 1]
    prevInput.focus()
  }
}

const handleVerification = () => {
  const code = codeDigits.value.join('')
  // Aquí iría la lógica de verificación del código
  console.log('Verificando código:', code)
}

const resendCode = () => {
  // Aquí iría la lógica para reenviar el código
  console.log('Reenviando código de verificación')
}
</script>
