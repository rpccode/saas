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
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Course Content -->
          <div class="lg:w-2/3">
            <!-- Course Header -->
            <section class="bg-white rounded-xl shadow-md p-6 mb-8">
              <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ course.title }}</h1>
              <p class="text-gray-600 mb-4">{{ course.description }}</p>
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <UsersIcon class="h-5 w-5 mr-2" />
                <span>{{ course.enrolledStudents }} estudiantes inscritos</span>
                <StarIcon class="h-5 w-5 ml-4 mr-2 text-yellow-400" />
                <span>{{ course.rating }} ({{ course.reviewsCount }} reseñas)</span>
                <ClockIcon class="h-5 w-5 ml-4 mr-2" />
                <span>{{ course.duration }}</span>
              </div>
              <div class="flex items-center">
                <img :src="course.instructor.avatar" :alt="course.instructor.name" class="w-12 h-12 rounded-full mr-4">
                <div>
                  <p class="font-semibold text-gray-800">{{ course.instructor.name }}</p>
                  <p class="text-sm text-gray-500">{{ course.instructor.title }}</p>
                </div>
              </div>
            </section>

            <!-- Course Modules -->
            <section class="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">Contenido del curso</h2>
              <div v-for="(module, moduleIndex) in course.modules" :key="moduleIndex" class="mb-6">
                <div @click="toggleModule(moduleIndex)" class="flex items-center justify-between cursor-pointer bg-gray-100 p-4 rounded-lg">
                  <h3 class="text-lg font-semibold text-gray-800">{{ module.title }}</h3>
                  <ChevronDownIcon :class="['h-5 w-5 transition-transform', module.isOpen ? 'transform rotate-180' : '']" />
                </div>
                <ul v-if="module.isOpen" class="mt-2 space-y-2">
                  <li v-for="(lesson, lessonIndex) in module.lessons" :key="lessonIndex" class="flex items-center p-3 hover:bg-gray-50 rounded-lg">
                    <component :is="getLessonIcon(lesson.type)" class="h-5 w-5 mr-3 text-gray-400" />
                    <span class="text-gray-700">{{ lesson.title }}</span>
                    <span class="ml-auto text-sm text-gray-500">{{ lesson.duration }}</span>
                  </li>
                </ul>
              </div>
            </section>

            <!-- Instructor Details -->
            <section class="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">Acerca del instructor</h2>
              <div class="flex items-start">
                <img :src="course.instructor.avatar" :alt="course.instructor.name" class="w-24 h-24 rounded-full mr-6">
                <div>
                  <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ course.instructor.name }}</h3>
                  <p class="text-gray-600 mb-4">{{ course.instructor.bio }}</p>
                  <div class="flex items-center text-sm text-gray-500">
                    <StarIcon class="h-5 w-5 mr-2 text-yellow-400" />
                    <span>{{ course.instructor.rating }} Calificación del instructor</span>
                    <UsersIcon class="h-5 w-5 ml-4 mr-2" />
                    <span>{{ course.instructor.studentsCount }} Estudiantes</span>
                    <PlayCircleIcon class="h-5 w-5 ml-4 mr-2" />
                    <span>{{ course.instructor.coursesCount }} Cursos</span>
                  </div>
                </div>
              </div>
            </section>

            <!-- Reviews -->
            <section class="bg-white rounded-xl shadow-md p-6">
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">Reseñas de estudiantes</h2>
              <div v-for="review in course.reviews" :key="review.id" class="mb-6 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0">
                <div class="flex items-center mb-2">
                  <img :src="review.avatar" :alt="review.name" class="w-10 h-10 rounded-full mr-4">
                  <div>
                    <p class="font-semibold text-gray-800">{{ review.name }}</p>
                    <div class="flex items-center">
                      <StarIcon v-for="i in 5" :key="i" :class="['h-4 w-4', i <= review.rating ? 'text-yellow-400' : 'text-gray-300']" />
                    </div>
                  </div>
                </div>
                <p class="text-gray-600">{{ review.comment }}</p>
              </div>
            </section>
          </div>

          <!-- Sidebar -->
          <div class="lg:w-1/3">
            <div class="bg-white rounded-xl shadow-md p-6 sticky top-20">
              <div class="mb-6">
                <span class="text-3xl font-bold text-gray-800">${{ course.price }}</span>
                <span class="text-lg text-gray-500 line-through ml-2">${{ course.originalPrice }}</span>
              </div>
              <button class="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 mb-4">
                Inscribirse ahora
              </button>
              <p class="text-sm text-gray-500 mb-6">30 días de garantía de devolución de dinero</p>
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Este curso incluye:</h3>
              <ul class="space-y-3">
                <li v-for="feature in course.features" :key="feature" class="flex items-center text-gray-600">
                  <CheckCircleIcon class="h-5 w-5 mr-3 text-green-500" />
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MenuIcon, UsersIcon, StarIcon, ClockIcon, ChevronDownIcon, PlayCircleIcon, FileTextIcon, CheckCircleIcon } from 'lucide-vue-next'

const course = ref({
  title: 'Desarrollo Web Fullstack: De principiante a profesional',
  description: 'Aprende a crear aplicaciones web completas desde cero. Este curso cubre HTML, CSS, JavaScript, React, Node.js, y más.',
  enrolledStudents: 12543,
  rating: 4.8,
  reviewsCount: 2150,
  duration: '52 horas de video',
  price: 99.99,
  originalPrice: 199.99,
  instructor: {
    name: 'María González',
    title: 'Desarrolladora Senior & Instructora',
    avatar: '/placeholder.svg?height=100&width=100',
    bio: 'María es una desarrolladora fullstack con más de 10 años de experiencia en la industria. Ha trabajado en startups y grandes empresas, y ahora se dedica a enseñar las últimas tecnologías web.',
    rating: 4.9,
    studentsCount: 45000,
    coursesCount: 12
  },
  modules: [
    {
      title: 'Introducción al Desarrollo Web',
      isOpen: true,
      lessons: [
        { title: 'Bienvenida al curso', type: 'video', duration: '5:23' },
        { title: 'Configuración del entorno de desarrollo', type: 'text', duration: '10 min' },
        { title: 'Fundamentos de HTML', type: 'video', duration: '15:41' },
        { title: 'Quiz: HTML Básico', type: 'quiz', duration: '10 preguntas' }
      ]
    },
    {
      title: 'CSS y Diseño Responsivo',
      isOpen: false,
      lessons: [
        { title: 'Introducción a CSS', type: 'video', duration: '20:15' },
        { title: 'Flexbox y Grid', type: 'video', duration: '25:32' },
        { title: 'Media Queries y Diseño Responsivo', type: 'video', duration: '18:47' },
        { title: 'Proyecto: Página de inicio responsiva', type: 'project', duration: '1 hora' }
      ]
    },
    {
      title: 'JavaScript Moderno',
      isOpen: false,
      lessons: [
        { title: 'Fundamentos de JavaScript', type: 'video', duration: '30:22' },
        { title: 'ES6+ Características', type: 'video', duration: '22:15' },
        { title: 'Asincronía y Promesas', type: 'video', duration: '28:40' },
        { title: 'Quiz: JavaScript Avanzado', type: 'quiz', duration: '15 preguntas' }
      ]
    }
  ],
  reviews: [
    { id: 1, name: 'Carlos Rodríguez', avatar: '/placeholder.svg?height=80&width=80', rating: 5, comment: 'Excelente curso. Muy completo y bien explicado. Lo recomiendo totalmente.' },
    { id: 2, name: 'Laura Sánchez', avatar: '/placeholder.svg?height=80&width=80', rating: 4, comment: 'Buen contenido, aunque algunas secciones podrían ser más detalladas. En general, estoy satisfecha con lo aprendido.' },
    { id: 3, name: 'Alejandro Gómez', avatar: '/placeholder.svg?height=80&width=80', rating: 5, comment: 'Este curso superó mis expectativas. Los proyectos prácticos son muy útiles para reforzar los conceptos.' }
  ],
  features: [
    '52 horas de video bajo demanda',
    'Acceso de por vida',
    '15 artículos descargables',
    '5 proyectos prácticos',
    'Certificado de finalización',
    'Acceso en dispositivos móviles y TV'
  ]
})

const toggleModule = (moduleIndex) => {
  course.value.modules[moduleIndex].isOpen = !course.value.modules[moduleIndex].isOpen
}

const getLessonIcon = (type) => {
  switch (type) {
    case 'video':
      return PlayCircleIcon
    case 'text':
      return FileTextIcon
    case 'quiz':
      return CheckCircleIcon
    case 'project':
      return FolderIcon
    default:
      return FileTextIcon
  }
}
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
