// src/boot/iconify.js
import { boot } from 'quasar/wrappers'
import { Icon } from '@iconify/vue'
import { disableCache, enableCache } from '@iconify/vue'

export default boot(({ app }) => {
  // Disable local storage cache
  disableCache('all')
  // Enable session storage cache
  enableCache('session')

  app.component('IconifyIcon', Icon)
})
