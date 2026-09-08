import { defineStore } from 'pinia'
import { ref } from 'vue'
import { storage } from '@infra/storage'

export type LayoutMode = 'side' | 'top' | 'mix' | 'columns'

interface LayoutSettings {
  layout: LayoutMode
  collapsed: boolean
  theme: 'light' | 'dark'
  showTabs: boolean
}

/** 布局与主题配置（多布局一键切换，配置持久化） */
export const useAppStore = defineStore('app', () => {
  const saved = (storage.getLayout() as Partial<LayoutSettings>) ?? {}
  const layout = ref<LayoutMode>(saved.layout ?? 'side')
  const collapsed = ref<boolean>(saved.collapsed ?? false)
  const theme = ref<'light' | 'dark'>(saved.theme ?? 'light')
  const showTabs = ref<boolean>(saved.showTabs ?? true)

  function persist() {
    storage.setLayout({ layout: layout.value, collapsed: collapsed.value, theme: theme.value, showTabs: showTabs.value })
  }

  function setLayout(v: LayoutMode) {
    layout.value = v
    persist()
  }

  function toggleCollapsed() {
    collapsed.value = !collapsed.value
    persist()
  }

  function setTheme(v: 'light' | 'dark') {
    theme.value = v
    persist()
  }

  function toggleTabs() {
    showTabs.value = !showTabs.value
    persist()
  }

  return { layout, collapsed, theme, showTabs, setLayout, toggleCollapsed, setTheme, toggleTabs }
})
