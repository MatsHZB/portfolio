<template>
  <div class="page">
    <SectionIndicator />
    <Navigation />
    <main>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </main>
    <SiteFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SectionIndicator from '@/components/SectionIndicator.vue'
import Navigation from '@/components/Navigation.vue'
import Hero from '@/components/Hero.vue'
import About from '@/components/About.vue'
import Projects from '@/components/Projects.vue'
import Skills from '@/components/Skills.vue'
import Contact from '@/components/Contact.vue'
import SiteFooter from '@/components/SiteFooter.vue'

export default defineComponent({
  name: 'App',
  components: {
    SectionIndicator,
    Navigation,
    Hero,
    About,
    Projects,
    Skills,
    Contact,
    SiteFooter,
  },
})
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
}
</style>
