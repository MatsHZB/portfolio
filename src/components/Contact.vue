<template>
  <section id="contact" class="contact section-padding">
    <DotGridBackground />
    <div class="container contact-layout">
      <div class="contact-introduction">
        <h2 v-reveal class="section-title">Contact</h2>
        <p class="contact-question">Heb je een vraag, idee of wil je samenwerken?</p>
        <p class="contact-invitation">
          Of het nu gaat om een project, een vraag over mijn werk of gewoon even sparren over code:
          stuur gerust een bericht.
        </p>
      </div>

      <div class="contact-details">
        <div class="contact-group">
          <p class="contact-group-title">E-mail</p>
          <div class="email">
            <a :href="`mailto:${emailAddress}`" class="email-address">{{ emailAddress }}</a>
            <Magnet :reach="24">
              <button
                type="button"
                class="copy-button"
                aria-live="polite"
                @click="copyEmailAddress"
              >
                <component :is="hasCopied ? 'Check' : 'Copy'" :size="15" aria-hidden="true" />
                {{ hasCopied ? 'Gekopieerd' : 'Kopieer' }}
              </button>
            </Magnet>
          </div>
        </div>

        <div class="contact-group">
          <p class="contact-group-title">Sociale media</p>
          <div class="social-links">
            <Magnet v-for="link in socialLinks" :key="link.id" class="social-link-area">
              <a :href="link.href" v-bind="newTabAttributes(link)" class="social-link">
                <component :is="brandIcons[link.id]" :size="16" aria-hidden="true" />
                <span>{{ link.name }}</span>
                <ArrowUpRight class="social-link-arrow" :size="16" aria-hidden="true" />
              </a>
            </Magnet>
          </div>
        </div>

        <div class="contact-group">
          <p class="contact-group-title">Op dit moment</p>
          <dl class="current-activities">
            <div v-for="activity in currentActivities" :key="activity.role" class="activity">
              <dt>{{ activity.role }}</dt>
              <dd>{{ activity.place }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ArrowUpRight, Check, Copy, Github, Linkedin } from 'lucide-vue-next'
import { defineComponent, markRaw, type Component } from 'vue'
import DotGridBackground from '@/components/DotGridBackground.vue'
import Magnet from '@/components/Magnet.vue'
import { emailAddress, newTabAttributes, socialLinks } from '@/data/contactLinks'
import type { ContactLink } from '@/interfaces/contactLink'

const copiedLabelDuration = 2000

export default defineComponent({
  name: 'Contact',
  components: {
    ArrowUpRight,
    Check,
    Copy,
    DotGridBackground,
    Magnet,
  },
  data() {
    return {
      emailAddress,
      socialLinks,
      brandIcons: { linkedin: markRaw(Linkedin), github: markRaw(Github) } as Partial<
        Record<ContactLink['id'], Component>
      >,
      currentActivities: [
        { role: 'Junior softwareontwikkelaar', place: 'Terraindex' },
        { role: 'Derdejaars HBO ICT', place: 'Softwareontwikkeling' },
        { role: 'Eigen projecten', place: 'Dots Development' },
      ],
      hasCopied: false,
      copiedLabelTimer: 0,
    }
  },
  beforeUnmount() {
    window.clearTimeout(this.copiedLabelTimer)
  },
  methods: {
    newTabAttributes,
    async copyEmailAddress() {
      window.clearTimeout(this.copiedLabelTimer)
      this.hasCopied = await navigator.clipboard.writeText(emailAddress).then(
        () => true,
        () => false
      )
      this.copiedLabelTimer = window.setTimeout(() => {
        this.hasCopied = false
      }, copiedLabelDuration)
    },
  },
})
</script>

<style scoped lang="scss">
.contact {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  min-height: calc(100svh - 5rem);
  background: var(--color-bg);
  border-top: 1px solid var(--color-border);
  @media (max-width: 768px) {
    min-height: calc(100svh - 4.5rem);
  }
  .contact-layout {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(2rem, 6vw, 5rem);
    align-items: center;
    width: 100%;
    @media (max-width: 900px) {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }
  .contact-question {
    margin: 0;
    padding-left: 1.1rem;
    max-width: 16ch;
    font-size: clamp(1.8rem, 4.2vw, 3.25rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.1;
    color: var(--color-text);
  }
  .contact-invitation {
    margin: 1.5rem 0 0;
    padding-left: 1.1rem;
    max-width: 42ch;
    color: var(--color-text-muted);
    font-size: clamp(0.94rem, 1.25vw, 1.06rem);
    line-height: 1.65;
  }
  .contact-details {
    border-top: 1px solid var(--color-border);
    background: color-mix(in srgb, var(--color-bg) 85%, transparent);
  }
  .contact-group {
    padding: clamp(1.25rem, 2.5vw, 1.75rem) 0;
    border-bottom: 1px solid var(--color-border);
  }
  .contact-group-title {
    margin: 0 0 0.85rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-text-muted);
  }
  .email {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.75rem 1.25rem;
  }
  .email-address {
    font-size: clamp(1.05rem, 2.2vw, 1.6rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--color-text);
    text-decoration: none;
    overflow-wrap: anywhere;
    background: linear-gradient(var(--color-accent), var(--color-accent)) no-repeat left bottom / 0
      2px;
    padding-bottom: 0.15rem;
    transition:
      background-size 0.3s ease,
      color 0.2s;
  }
  .email-address:hover,
  .email-address:focus-visible {
    color: var(--color-accent);
    background-size: 100% 2px;
  }
  .copy-button {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 0.9rem;
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    color: var(--color-text);
    font-family: inherit;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition:
      background-color 0.2s,
      border-color 0.2s,
      color 0.2s;
  }
  .copy-button:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }
  .copy-button:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
  .social-links {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
  .social-link-area {
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.55rem;
    padding: 0.7rem 1.4rem;
    border: 1px solid var(--color-border);
    border-radius: 0;
    text-decoration: none;
    color: var(--color-text);
    font-size: 0.875rem;
    letter-spacing: 0.02em;
    transition:
      background-color 0.2s,
      border-color 0.2s,
      color 0.2s;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .social-link:hover {
    background: var(--color-text);
    border-color: var(--color-text);
    color: var(--color-bg);
  }
  .social-link-arrow {
    flex-shrink: 0;
    color: var(--color-accent);
    transition:
      color 0.2s,
      transform 0.2s;
  }
  .social-link:hover .social-link-arrow {
    color: var(--color-bg);
    transform: translate(2px, -2px);
  }
  .current-activities {
    margin: 0;
    dt {
      color: var(--color-text);
      font-weight: 600;
    }
    dd {
      margin: 0;
      color: var(--color-text-muted);
      text-align: right;
    }
  }
  .activity {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.45rem 0;
    font-size: 0.9rem;
  }
  .activity + .activity {
    border-top: 1px dashed var(--color-border);
  }
}
</style>
