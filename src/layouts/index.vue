<template>
  <div class="layout-container">
    <aside class="sidebar" :class="{ collapsed: appStore.sidebarCollapsed }">
      <div class="sidebar-header">
        <h2 class="logo">Vue3 App</h2>
      </div>
      <nav class="sidebar-menu">
        <router-link to="/" active-class="router-link-exact-active" class="menu-item">
          <span class="menu-icon">🏠</span>
          <span class="menu-text">首页</span>
        </router-link>
        <router-link to="/about" class="menu-item">
          <span class="menu-icon">ℹ️</span>
          <span class="menu-text">关于</span>
        </router-link>
        <router-link to="/data-view" class="menu-item">
          <span class="menu-icon">📊</span>
          <span class="menu-text">数据展示</span>
        </router-link>
        <router-link to="/component-designer" class="menu-item">
          <span class="menu-icon">🎨</span>
          <span class="menu-text">组件设计器</span>
        </router-link>
      </nav>
    </aside>

    <div class="main-container">
      <header class="header">
        <div class="header-left">
          <button class="toggle-btn" @click="toggleSidebar">
            <span class="toggle-icon">{{ appStore.sidebarCollapsed ? '→' : '←' }}</span>
          </button>
          <h1 class="header-title">{{ title }}</h1>
        </div>
        <div class="header-right">
          <div class="user-info">
            <span class="user-avatar">👤</span>
            <span class="user-name">User</span>
          </div>
        </div>
      </header>

      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts" name="defaultLayout">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/app'

const route = useRoute()
const appStore = useAppStore()

const title = computed(() => {
  return (route.meta.title as string) || 'Vue3 App'
})

const toggleSidebar = () => {
  appStore.toggleSidebar()
}
</script>

<style scoped lang="less">
.layout-container {
  display: flex;
  height: 100vh;
  width: 100%;
}

.sidebar {
  width: 240px;
  background-color: #001529;
  color: #fff;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;

  &.collapsed {
    width: 64px;

    .logo {
      font-size: 14px;
    }

    .menu-text {
      display: none;
    }
  }

  .sidebar-header {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    .logo {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
    }
  }

  .sidebar-menu {
    flex: 1;
    padding: 16px 0;

    .menu-item {
      display: flex;
      align-items: center;
      padding: 12px 24px;
      color: rgba(255, 255, 255, 0.65);
      text-decoration: none;
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover {
        background-color: rgba(255, 255, 255, 0.08);
        color: #fff;
      }

      &.router-link-active,
      &.router-link-exact-active {
        background-color: #1890ff;
        color: #fff;
      }

      .menu-icon {
        font-size: 18px;
        margin-right: 12px;
      }

      .menu-text {
        white-space: nowrap;
      }
    }
  }
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  height: 64px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;

  .header-left {
    display: flex;
    align-items: center;
    gap: 16px;

    .toggle-btn {
      width: 32px;
      height: 32px;
      border: none;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #f5f5f5;
      }

      .toggle-icon {
        font-size: 16px;
        color: #666;
      }
    }

    .header-title {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }
  }

  .header-right {
    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      padding: 8px 12px;
      border-radius: 4px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #f5f5f5;
      }

      .user-avatar {
        font-size: 20px;
      }

      .user-name {
        font-size: 14px;
        color: #333;
      }
    }
  }
}

.content {
  flex: 1;
  overflow: auto;
  background-color: #f0f2f5;
  padding: 24px;
}
</style>
