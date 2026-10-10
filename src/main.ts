import { createApp } from 'vue'
import '@fontsource-variable/inter'
import './style.scss'
import App from './App.vue'
import { parallax, reveal } from '@/directives/scrollAnimations'
import { startActiveSectionTracking } from '@/lib/activeSection'
import { startSmoothScrolling } from '@/lib/motion'

createApp(App).directive('parallax', parallax).directive('reveal', reveal).mount('#app')
startSmoothScrolling()
startActiveSectionTracking()
