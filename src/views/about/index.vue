<template>
  <div class="about-view">
    <div class="about-card">
      <h1 class="about-title">关于这个项目</h1>
      
      <div class="about-content">
        <div class="info-section">
          <h2>技术栈</h2>
          <ul class="tech-list">
            <li><strong>Vue 3</strong> - 渐进式 JavaScript 框架</li>
            <li><strong>TypeScript</strong> - JavaScript 的超集</li>
            <li><strong>Pinia</strong> - Vue 3 状态管理库</li>
            <li><strong>Vite</strong> - 下一代前端构建工具</li>
            <li><strong>Vue Router</strong> - Vue.js 官方路由管理器</li>
            <li><strong>Less</strong> - CSS 预处理器</li>
          </ul>
        </div>

        <div class="info-section">
          <h2>项目特点</h2>
          <ul class="feature-list">
            <li>✅ 左右布局设计</li>
            <li>✅ 响应式侧边栏（可折叠）</li>
            <li>✅ 顶部 Header 区域</li>
            <li>✅ 内容区域支持路由切换</li>
            <li>✅ 基于 Pinia 的全局状态管理</li>
            <li>✅ TypeScript 类型支持</li>
          </ul>
        </div>

        <div class="info-section">
          <h2>目录结构</h2>
          <pre class="code-block">src/
├── assets/          # 静态资源
├── components/      # 公共组件
├── hooks/           # 组合式函数
├── layouts/         # 布局组件
├── router/          # 路由配置
├── store/           # 状态管理
├── types/           # 类型定义
├── utils/           # 工具函数
└── views/           # 页面视图</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="aboutView">
</script>

<style scoped lang="less">
.about-view {
  max-width: 1200px;
  margin: 0 auto;
}

.about-card {
  background: #fff;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.about-title {
  margin: 0 0 32px 0;
  font-size: 28px;
  color: #333;
  text-align: center;
}

.about-content {
  .info-section {
    margin-bottom: 32px;

    &:last-child {
      margin-bottom: 0;
    }

    h2 {
      margin: 0 0 16px 0;
      font-size: 20px;
      color: #1890ff;
      border-left: 4px solid #1890ff;
      padding-left: 12px;
    }
  }

  .tech-list,
  .feature-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 8px 0;
      font-size: 15px;
      color: #555;
      line-height: 1.6;

      strong {
        color: #333;
        font-weight: 600;
      }
    }
  }

  .feature-list {
    li {
      font-size: 16px;
    }
  }

  .code-block {
    background: #f5f7fa;
    border: 1px solid #e4e7ed;
    border-radius: 8px;
    padding: 20px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
    line-height: 1.8;
    color: #495057;
    overflow-x: auto;
    margin: 0;
  }
}
</style>
