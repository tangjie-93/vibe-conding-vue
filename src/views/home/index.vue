<template>
  <div class="home-view">
    <div class="welcome-card">
      <h1 class="welcome-title">欢迎使用 Vue3 应用</h1>
      <p class="welcome-description">
        这是一个基于 Vue3 + TypeScript + Pinia + Vite + Vue Router 构建的现代化前端应用
      </p>
    </div>

    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">⚡</div>
        <h3>快速开发</h3>
        <p>基于 Vite 构建，享受极速的开发体验</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">📘</div>
        <h3>TypeScript</h3>
        <p>完整的类型支持，让代码更可靠</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">🗃️</div>
        <h3>Pinia 状态管理</h3>
        <p>轻量级状态管理，简单易用</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">🛣️</div>
        <h3>Vue Router</h3>
        <p>强大的路由管理，支持懒加载</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="homeView">
</script>

<style scoped lang="less">
.home-view {
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 48px;
  color: #fff;
  margin-bottom: 24px;
  text-align: center;

  .welcome-title {
    margin: 0 0 16px 0;
    font-size: 32px;
    font-weight: 600;
  }

  .welcome-description {
    margin: 0;
    font-size: 16px;
    opacity: 0.9;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.feature-card {
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .feature-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  h3 {
    margin: 0 0 12px 0;
    font-size: 20px;
    color: #333;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #666;
  }
}
</style>
