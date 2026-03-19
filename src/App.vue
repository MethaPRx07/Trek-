<template>
  <div>
    <nav class="topnav">
      <router-link class="topnav-brand" to="/guide">
        <img src="/trailfinder-logo.svg" alt="Trailfinder Logo" class="brand-logo" />
        <span class="name">Research Tool</span>
      </router-link>
      <div class="topnav-right">
        <div class="topnav-links">
          <router-link class="topnav-link" to="/guide" active-class="active">
            <span class="nav-icon">🏔</span><span>ไกด์</span>
          </router-link>
          <router-link class="topnav-link" to="/customer" active-class="active">
            <span class="nav-icon">🎒</span><span>ลูกค้า</span>
          </router-link>
          <router-link class="topnav-link" to="/dashboard" active-class="active">
            <span class="nav-icon">📊</span><span>Dashboard</span>
          </router-link>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
</script>

<style>
.topnav {
  background: var(--forest); padding: 0 24px;
  display: flex; align-items: center; justify-content: space-between;
  height: 56px; position: sticky; top: 0; z-index: 100;
}
.topnav-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.brand-logo { height: 24px; width: auto; object-fit: contain; }
.topnav-brand .name { font-size: 14px; font-weight: 600; color: var(--mist); }
.topnav-links { display: flex; gap: 4px; }
.topnav-link {
  display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 8px;
  font-size: 13px; color: rgba(200,223,200,0.7); text-decoration: none; transition: all .15s;
}
.topnav-link:hover { background: rgba(255,255,255,0.08); color: var(--mist); }
.topnav-link.active { background: rgba(107,158,107,0.2); color: var(--mist); font-weight: 500; }
.topnav-right { display: flex; align-items: center; gap: 8px; }
.clear-btn {
  padding: 6px 12px; border: 1px solid rgba(181,74,58,0.4); background: none;
  color: rgba(181,74,58,0.8); border-radius: 8px; font-family: 'Sarabun', sans-serif;
  font-size: 12px; cursor: pointer; transition: all .15s;
}
.clear-btn:hover { background: rgba(181,74,58,0.12); color: #e06050; border-color: #e06050; }

@media (max-width: 600px) {
  .topnav { padding: 0 16px; }
  .topnav-link span:not(.nav-icon) { display: none; }
  .topnav-link { padding: 6px 10px; }
}
</style>
