<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- Header -->
    <header class="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-sm fixed top-0 left-0 right-0 z-10">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center">
          <img src="" alt="Logo" class="h-8 w-8 mr-2">
          <span class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">EduPlatform</span>
        </div>
        <nav class="hidden md:flex space-x-6">
          <a href="#" class="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Dashboard</a>
          <a href="#" class="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Mis cursos</a>
          <a href="#" class="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Catálogo</a>
          <a href="#" class="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Perfil</a>
        </nav>
        <button class="md:hidden focus:outline-none">
          <MenuIcon class="h-6 w-6 text-gray-600" />
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="pt-16 p-6">
      <div class="container mx-auto">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

        <!-- Cursos en progreso -->
        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Mis cursos en progreso</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="course in coursesInProgress" :key="course.id" class="bg-white rounded-xl shadow-md overflow-hidden">
              <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ course.title }}</h3>
                <p class="text-gray-600 mb-4">{{ course.description }}</p>
                <div class="flex justify-between items-center">
                  <div class="text-sm text-gray-500">Progreso: {{ course.progress }}%</div>
                  <a :href="course.url" class="text-indigo-600 hover:text-indigo-800 font-medium">Continuar</a>
                </div>
                <div class="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <div class="bg-indigo-600 h-2.5 rounded-full" :style="{ width: `${course.progress}%` }"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Estadísticas y Actividad reciente -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <!-- Estadísticas -->
          <section class="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Mis estadísticas</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div v-for="stat in userStats" :key="stat.label" class="text-center">
                <div class="text-3xl font-bold text-indigo-600">{{ stat.value }}</div>
                <div class="text-sm text-gray-500">{{ stat.label }}</div>
              </div>
            </div>
          </section>

          <!-- Actividad reciente -->
          <section class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Actividad reciente</h2>
            <ul class="space-y-4">
              <li v-for="activity in recentActivities" :key="activity.id" class="flex items-center">
                <component :is="activity.icon" class="h-6 w-6 text-indigo-600 mr-3" />
                <div>
                  <p class="text-sm font-medium text-gray-800">{{ activity.description }}</p>
                  <p class="text-xs text-gray-500">{{ activity.time }}</p>
                </div>
              </li>
            </ul>
          </section>
        </div>

        <!-- Cursos recomendados y Calendario -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <!-- Cursos recomendados -->
          <section class="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Cursos recomendados</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="course in recommendedCourses" :key="course.id" class="flex items-center space-x-4">
                <img :src="course.image" :alt="course.title" class="w-16 h-16 object-cover rounded-lg">
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">{{ course.title }}</h3>
                  <p class="text-sm text-gray-600">{{ course.instructor }}</p>
                  <a href="#" class="text-sm text-indigo-600 hover:text-indigo-800">Ver detalles</a>
                </div>
              </div>
            </div>
          </section>

          <!-- Calendario -->
          <section class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Próximos eventos</h2>
            <ul class="space-y-4">
              <li v-for="event in upcomingEvents" :key="event.id" class="flex items-center">
                <div class="flex-shrink-0 w-12 text-center">
                  <div class="text-lg font-bold text-indigo-600">{{ event.day }}</div>
                  <div class="text-xs text-gray-500">{{ event.month }}</div>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-800">{{ event.title }}</p>
                  <p class="text-xs text-gray-500">{{ event.time }}</p>
                </div>
              </li>
            </ul>
          </section>
        </div>

        <!-- Logros -->
        <section class="bg-white rounded-xl shadow-md p-6">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Mis logros</h2>
          <div class="flex flex-wrap gap-4">
            <div v-for="achievement in achievements" :key="achievement.id" class="flex flex-col items-center">
              <div class="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                <component :is="achievement.icon" class="h-8 w-8 text-indigo-600" />
              </div>
              <p class="text-sm font-medium text-gray-800 text-center">{{ achievement.title }}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MenuIcon, BookOpenIcon, CheckCircleIcon, ClockIcon, TrophyIcon, AwardIcon, StarIcon } from 'lucide-vue-next'

const coursesInProgress = ref([
  { id: 1, title: 'Introducción a la Programación', description: 'Aprende los fundamentos de la programación', progress: 60, url: '#' },
  { id: 2, title: 'Diseño UX/UI Avanzado', description: 'Mejora tus habilidades de diseño de interfaces', progress: 35, url: '#' },
  { id: 3, title: 'Machine Learning Básico', description: 'Descubre el mundo del aprendizaje automático', progress: 80, url: '#' },
])

const userStats = ref([
  { label: 'Cursos completados', value: 12 },
  { label: 'Horas de aprendizaje', value: 87 },
  { label: 'Certificados obtenidos', value: 5 },
  { label: 'Puntos de experiencia', value: 2750 },
])

const recentActivities = ref([
  { id: 1, icon: BookOpenIcon, description: 'Completaste la lección "Variables en Python"', time: 'Hace 2 horas' },
  { id: 2, icon: CheckCircleIcon, description: 'Terminaste el quiz de "Fundamentos de HTML"', time: 'Ayer' },
  { id: 3, icon: ClockIcon, description: 'Iniciaste el curso "JavaScript Moderno"', time: 'Hace 2 días' },
])

const recommendedCourses = ref([
  { id: 1, title: 'React para principiantes', instructor: 'Ana Martínez', image: '/placeholder.svg?height=80&width=80' },
  { id: 2, title: 'Desarrollo Backend con Node.js', instructor: 'Carlos Gómez', image: '/placeholder.svg?height=80&width=80' },
  { id: 3, title: 'Ciencia de Datos con Python', instructor: 'Laura Sánchez', image: '/placeholder.svg?height=80&width=80' },
  { id: 4, title: 'Diseño Responsivo Avanzado', instructor: 'Miguel Ángel Durán', image: '/placeholder.svg?height=80&width=80' },
])

const upcomingEvents = ref([
  { id: 1, day: '15', month: 'MAY', title: 'Webinar: Tendencias en IA', time: '18:00 - 19:30' },
  { id: 2, day: '22', month: 'MAY', title: 'Entrega de proyecto final', time: '23:59' },
  { id: 3, day: '01', month: 'JUN', title: 'Inicio de curso: Cloud Computing', time: '09:00' },
])

const achievements = ref([
  { id: 1, icon: TrophyIcon, title: 'Primer curso completado' },
  { id: 2, icon: AwardIcon, title: 'Estudiante destacado' },
  { id: 3, icon: StarIcon, title: '5 cursos completados' },
  { id: 4, icon: ClockIcon, title: '50 horas de aprendizaje' },
])
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
