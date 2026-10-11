import { reactive } from 'vue'

export type Theme = 'light' | 'dark'

const storageKey = 'theme'

function themeSetBeforePageLoad(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export const themeState = reactive({ theme: themeSetBeforePageLoad() })

export function toggleTheme() {
  themeState.theme = themeState.theme === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = themeState.theme
  try {
    localStorage.setItem(storageKey, themeState.theme)
  } catch {
    return
  }
}
