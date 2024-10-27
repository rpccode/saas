<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- Header -->
    <header class="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-sm fixed top-0 left-0 right-0 z-10">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center">
          <button @click="toggleSidebar" class="mr-4 focus:outline-none lg:hidden text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
            <MenuIcon class="h-6 w-6" />
          </button>
          <img src="" alt="Logo" class="h-8 w-8 mr-2">
          <span class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">EduPlatform</span>
        </div>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <input
              v-model="searchQuery"
              @input="searchContent"
              type="text"
              placeholder="Buscar en el curso"
              class="w-64 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
            <SearchIcon class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <nav class="hidden md:flex space-x-6">
            <a href="#" class="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Mis cursos</a>
            <a href="#" class="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Catálogo</a>
            <a href="#" class="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Perfil</a>
          </nav>
        </div>
      </div>
    </header>

    <div class="pt-16 flex">
      <!-- Sidebar -->
      <aside
        :class="[
          'bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg w-72 min-h-screen shadow-lg transition-all duration-300 ease-in-out overflow-y-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        ]"
        :style="{ position: isDesktop ? 'sticky' : 'fixed', top: '4rem', height: 'calc(100vh - 4rem)', zIndex: 9 }"
      >
        <div class="p-6">
          <h2 class="text-xl font-bold mb-6 text-gray-800">Contenido del curso</h2>
          <div class="mb-6">
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-medium text-gray-600">Progreso del curso</span>
              <span class="text-sm font-medium text-indigo-600">{{ courseProgress }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div class="bg-indigo-600 h-2.5 rounded-full" :style="{ width: `${courseProgress}%` }"></div>
            </div>
          </div>
          <ul class="space-y-4">
            <li v-for="(section, index) in courseSections" :key="index">
              <button
                @click="toggleSection(index)"
                class="flex items-center justify-between w-full text-left p-3 rounded-lg hover:bg-indigo-50 transition-all duration-300"
              >
                <span class="font-medium text-gray-700">{{ section.title }}</span>
                <ChevronDownIcon
                  :class="['h-5 w-5 text-indigo-500 transition-transform duration-300', section.isOpen ? 'transform rotate-180' : '']"
                />
              </button>
              <ul v-if="section.isOpen" class="mt-2 ml-4 space-y-2">
                <li v-for="(item, itemIndex) in section.items" :key="itemIndex">
                  <a
                    href="#"
                    @click.prevent="selectContent(item)"
                    :class="['flex items-center p-2 rounded-md text-sm transition-all duration-300',
                             currentContent.id === item.id ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600']"
                  >
                    <component :is="getItemIcon(item.type)" class="h-4 w-4 mr-2" />
                    <span>{{ item.title }}</span>
                    <CheckCircleIcon v-if="item.completed" class="h-4 w-4 ml-auto text-green-500" />
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-6">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-3xl font-bold mb-6 text-gray-800">{{ currentContent.title }}</h1>

          <!-- Video Player -->
          <div v-if="currentContent.type === 'video'" class="bg-black rounded-xl overflow-hidden shadow-2xl mb-8">
            <div class="aspect-w-16 aspect-h-9">
              <iframe
                :src="currentContent.videoUrl"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="w-full h-full"
              ></iframe>
            </div>
          </div>

          <!-- Text Content -->
          <div v-else-if="currentContent.type === 'text'" class="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div v-html="currentContent.content" class="prose max-w-none"></div>
          </div>

          <!-- Quiz -->
          <div v-else-if="currentContent.type === 'quiz'" class="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 class="text-2xl font-semibold mb-6 text-gray-800">{{ currentContent.title }}</h2>
            <div class="mb-4 text-right">
              <span class="text-lg font-medium">Tiempo restante: {{ formatTime(quizTimeRemaining) }}</span>
            </div>
            <form @submit.prevent="submitQuiz">
              <div v-for="(question, index) in currentContent.questions" :key="index" class="mb-8">
                <p class="font-medium mb-4 text-gray-700">{{ question.text }}</p>
                <div class="space-y-3">
                  <label v-for="(option, optionIndex) in question.options" :key="optionIndex" class="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-indigo-50 transition-colors duration-300">
                    <input
                      type="radio"
                      :name="`question-${index}`"
                      :value="option"
                      v-model="quizAnswers[index]"
                      class="form-radio text-indigo-600 focus:ring-indigo-500"
                    >
                    <span class="ml-3 text-gray-700">{{ option }}</span>
                  </label>
                </div>
              </div>
              <button type="submit" class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300">
                Enviar respuestas
              </button>
            </form>
          </div>

          <!-- Exercise -->
          <div v-else-if="currentContent.type === 'exercise'" class="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 class="text-2xl font-semibold mb-6 text-gray-800">{{ currentContent.title }}</h2>
            <div v-html="currentContent.description" class="prose max-w-none mb-6"></div>
            <div class="mt-6">
              <textarea
                v-model="exerciseAnswer"
                rows="6"
                class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                placeholder="Escribe tu respuesta aquí..."
              ></textarea>
            </div>
            <button @click="submitExercise" class="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300">
              Enviar ejercicio
            </button>
          </div>

          <!-- Resources -->
          <div v-if="currentContent.resources && currentContent.resources.length > 0" class="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 class="text-xl font-semibold mb-4 text-gray-800">Recursos descargables</h3>
            <ul class="space-y-2">
              <li v-for="resource in currentContent.resources" :key="resource.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span class="text-gray-700">{{ resource.name }}</span>
                <a :href="resource.url" download class="text-indigo-600 hover:text-indigo-800 flex items-center">
                  <DownloadIcon class="h-5 w-5 mr-1" />
                  Descargar
                </a>
              </li>
            </ul>
          </div>

          <!-- Notes -->
          <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 class="text-xl font-semibold mb-4 text-gray-800">Mis notas</h3>
            <textarea
              v-model="currentNotes"
              rows="4"
              class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
              placeholder="Escribe tus notas aquí..."
            ></textarea>
            <button @click="saveNotes" class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300">
              Guardar notas
            </button>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-between mt-8">
            <button
              @click="navigateContent('prev')"
              :disabled="!hasPrevContent"
              class="px-6 py-3 rounded-lg bg-white text-indigo-600 font-semibold shadow-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon class="h-5 w-5 inline-block mr-2" />
              Anterior
            </button>
            <button
              @click="navigateContent('next')"
              :disabled="!hasNextContent"
              class="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
              <ChevronRightIcon class="h-5 w-5 inline-block ml-2" />
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { MenuIcon, ChevronDownIcon, PlayIcon, FileTextIcon, HelpCircleIcon, EditIcon, ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon, DownloadIcon, SearchIcon } from 'lucide-vue-next'

const sidebarOpen = ref(false)
const isDesktop = ref(false);

onMounted(() => {
  isDesktop.value = window.innerWidth >= 1024;

  window.addEventListener('resize', () => {
    isDesktop.value = window.innerWidth >= 1024;
  });
});
const searchQuery = ref('')
const courseProgress = ref(0)
const quizTimeRemaining = ref(0)
const quizTimer = ref(null)
const currentNotes = ref('')

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const handleResize = () => {
  isDesktop.value = window.innerWidth >= 1024
  if (isDesktop.value) {
    sidebarOpen.value = true
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (quizTimer.value) {
    clearInterval(quizTimer.value)
  }
})

const courseSections = ref([
  {
    title: 'Introducción',
    isOpen: true,
    items: [
      { id: 1, type:  'video', title: 'Bienvenida al curso', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: false, resources: [
        { id: 1, name: 'Guía de inicio rápido', url: '#' },
        { id: 2, name: 'Presentación del curso', url: '#' }
      ] },
      { id: 2, type: 'text', title: 'Objetivos del curso', content: '<p class="mb-4">En este curso aprenderás:</p><ul class="list-disc pl-6 mb-4"><li>Fundamentos de programación</li><li>Estructuras de datos avanzadas</li><li>Algoritmos de optimización</li><li>Mejores prácticas de desarrollo</li></ul>', completed: false },
    ]
  },
  {
    title: 'Fundamentos',
    isOpen: false,
    items: [
      { id: 3, type: 'video', title: 'Conceptos básicos', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: false },
      { id: 4, type: 'quiz', title: 'Quiz de fundamentos', questions: [
        { text: '¿Cuál es el concepto principal de la programación orientada a objetos?', options: ['Encapsulación', 'Iteración', 'Compilación', 'Depuración'] },
        { text: '¿Qué significa el acrónimo API?', options: ['Application Programming Interface', 'Advanced Program Integration', 'Automated Protocol Interaction', 'Application Process Insight'] }
      ], completed: false },
    ]
  },
  {
    title: 'Práctica',
    isOpen: false,
    items: [
      { id: 5, type: 'exercise', title: 'Ejercicio práctico 1', description: '<p class="mb-4">Implementa una función que determine si una cadena de texto es un palíndromo. Un palíndromo es una palabra o frase que se lee igual de izquierda a derecha que de derecha a izquierda, ignorando espacios, signos de puntuación y mayúsculas/minúsculas.</p><p class="mb-4">Ejemplo:</p><pre class="bg-gray-100 p-2 rounded-md mb-4">esPalindromo("Anita lava la tina") // debe retornar true</pre><p>Escribe tu solución en el área de texto a continuación.</p>', completed: false },
      { id: 6, type: 'video', title: 'Solución del ejercicio', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: false },
    ]
  }
])

const currentContent = ref(courseSections.value[0].items[0])
const quizAnswers = ref({})
const exerciseAnswer = ref('')

watch(currentContent, (newContent) => {
  if (newContent.type === 'quiz') {
    startQuizTimer()
  } else {
    stopQuizTimer()
  }
  loadNotes()
})

const toggleSection = (index) => {
  courseSections.value[index].isOpen = !courseSections.value[index].isOpen
}

const selectContent = (item) => {
  currentContent.value = item
}

const getItemIcon = (type) => {
  switch (type) {
    case 'video': return PlayIcon
    case 'text': return FileTextIcon
    case 'quiz': return HelpCircleIcon
    case 'exercise': return EditIcon
    default: return FileTextIcon
  }
}

const submitQuiz = () => {
  console.log('Respuestas del quiz:', quizAnswers.value)
  stopQuizTimer()
  // Aquí iría la lógica para evaluar las respuestas y mostrar los resultados
  alert('Quiz enviado. Revisa la consola para ver las respuestas.')
  markContentAsCompleted(currentContent.value)
}

const submitExercise = () => {
  console.log('Respuesta del ejercicio:', exerciseAnswer.value)
  // Aquí iría la lógica para enviar la respuesta del ejercicio y proporcionar retroalimentación
  alert('Ejercicio enviado. Revisa la consola para ver la respuesta.')
  markContentAsCompleted(currentContent.value)
}

const findCurrentContentIndex = () => {
  for (let i = 0; i < courseSections.value.length; i++) {
    const itemIndex = courseSections.value[i].items.findIndex(item => item.id === currentContent.value.id)
    if (itemIndex !== -1) {
      return { sectionIndex: i, itemIndex }
    }
  }
  return null
}

const navigateContent = (direction) => {
  const currentIndex = findCurrentContentIndex()
  if (!currentIndex) return

  let { sectionIndex, itemIndex } = currentIndex

  if (direction === 'next') {
    itemIndex++
    if (itemIndex >= courseSections.value[sectionIndex].items.length) {
      sectionIndex++
      itemIndex = 0
    }
  } else {
    itemIndex--
    if (itemIndex < 0) {
      sectionIndex--
      if (sectionIndex >= 0) {
        itemIndex = courseSections.value[sectionIndex].items.length - 1
      }
    }
  }

  if (sectionIndex >= 0 && sectionIndex < courseSections.value.length) {
    currentContent.value = courseSections.value[sectionIndex].items[itemIndex]
  }
}

const hasPrevContent = computed(() => {
  const currentIndex = findCurrentContentIndex()
  return currentIndex && (currentIndex.itemIndex > 0 || currentIndex.sectionIndex > 0)
})

const hasNextContent = computed(() => {
  const currentIndex = findCurrentContentIndex()
  if (!currentIndex) return false

  const { sectionIndex, itemIndex } = currentIndex
  return sectionIndex < courseSections.value.length - 1 ||
         itemIndex < courseSections.value[sectionIndex].items.length - 1
})

const startQuizTimer = () => {
  quizTimeRemaining.value = 300 // 5 minutos en segundos
  quizTimer.value = setInterval(() => {
    if (quizTimeRemaining.value > 0) {
      quizTimeRemaining.value--
    } else {
      submitQuiz()
    }
  }, 1000)
}

const stopQuizTimer = () => {
  if (quizTimer.value) {
    clearInterval(quizTimer.value)
    quizTimer.value = null
  }
}

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

const markContentAsCompleted = (content) => {
  content.completed = true
  updateCourseProgress()
}

const updateCourseProgress = () => {
  const totalItems = courseSections.value.reduce((total, section) => total + section.items.length, 0)
  const completedItems = courseSections.value.reduce((total, section) => {
    return total + section.items.filter(item => item.completed).length
  }, 0)
  courseProgress.value = Math.round((completedItems / totalItems) * 100)
}

const saveNotes = () => {
  localStorage.setItem(`notes_${currentContent.value.id}`, currentNotes.value)
  alert('Notas guardadas correctamente')
}

const loadNotes = () => {
  currentNotes.value = localStorage.getItem(`notes_${currentContent.value.id}`) || ''
}

const searchContent = () => {
  const query = searchQuery.value.toLowerCase()
  courseSections.value.forEach(section => {
    section.isOpen = section.items.some(item =>
      item.title.toLowerCase().includes(query) ||
      (item.content && item.content.toLowerCase().includes(query))
    )
  })
}

</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Estilos adicionales para mejorar la apariencia */
.prose {
  @apply text-gray-700;
}

.prose h1, .prose h2, .prose h3, .prose h4 {
  @apply text-gray-800;
}

.prose a {
  @apply text-indigo-600 hover:text-indigo-800 transition-colors duration-300;
}

.prose ul, .prose ol {
  @apply my-4 pl-6;
}

.prose li {
  @apply mb-2;
}

/* Estilo para el scrollbar personalizado */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
