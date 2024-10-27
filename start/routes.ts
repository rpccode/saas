/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
router.on('/').renderInertia('home')


router.get('/login', (ctx) => {
  return ctx.inertia.render('auth/login')
})

router.get('/register', (ctx) => {
  ctx.inertia.share({
    autenticate : true
  })
  return ctx.inertia.render('auth/register',{
    email: '',
    password: '',
    password_confirmation: '',
  })
})
router.get('/password-recovery', (ctx) => {
  return ctx.inertia.render('auth/passwordRecovery')
})
router.get('/verify-code', (ctx) => {
  return ctx.inertia.render('auth/codeVerification')
})
router.get('/dashboard', (ctx) => {
  return ctx.inertia.render('home/dashboard')
})
router.get('/course', (ctx) => {
  return ctx.inertia.render('home/course')
})

router.get('/course/details', (ctx) => {
  return ctx.inertia.render('home/courseDetails')
})

