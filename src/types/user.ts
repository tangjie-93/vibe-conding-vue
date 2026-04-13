export interface UserProfile {
  id: string
  name: string
  avatar?: string
  email?: string
}

export interface UserSettings {
  theme: 'light' | 'dark'
  language: 'zh' | 'en'
  sidebarCollapsed: boolean
}
