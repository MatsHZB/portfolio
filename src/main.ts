import { createApp } from 'vue'
import '@fontsource-variable/inter'
import './style.scss'
import App from './App.vue'
import { parallax, reveal } from '@/directives/scrollAnimations'
import { startActiveSectionTracking } from '@/utilities/activeSection'
import { startSmoothScrolling } from '@/utilities/motion'

createApp(App).directive('parallax', parallax).directive('reveal', reveal).mount('#app')
startSmoothScrolling()
startActiveSectionTracking()
