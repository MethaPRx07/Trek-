<template>
  <div class="container">
    <div class="page-header">
      <div>
        <h1>Dashboard</h1>
        <p>สรุปข้อมูลจากการ interview ทั้งหมด</p>
      </div>
      <div style="display:flex; gap:8px;">
        <button class="refresh-btn" @click="fetchData">↻ รีเฟรช</button>
        <button class="clear-btn" @click="clearAll">🗑 ล้างข้อมูล</button>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Responses ทั้งหมด</div>
        <div class="stat-value">{{ data.length }}</div>
        <div class="stat-sub">interview records</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">ไกด์</div>
        <div class="stat-value">{{ guides.length }}</div>
        <div class="stat-sub">supply-side</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">ลูกค้า</div>
        <div class="stat-value">{{ customers.length }}</div>
        <div class="stat-sub">demand-side</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">ยินดีจ่าย commission</div>
        <div class="stat-value">{{ commPct }}</div>
        <div class="stat-sub">จากไกด์ที่ interview</div>
      </div>
    </div>

    <!-- Charts -->
    <div class="two-col">
      <div class="insight-card">
        <div class="section-title">Commission ที่ไกด์ยอมรับ</div>
        <div v-if="!commissionChart.length" style="color:var(--ink3);font-size:13px">ยังไม่มีข้อมูล</div>
        <div v-for="item in commissionChart" :key="item.label" class="chart-bar-group">
          <div class="chart-bar-label"><span>{{ item.label }}</span><span>{{ item.count }}</span></div>
          <div class="chart-bar-track">
            <div class="chart-bar-fill fill-fern" :style="{ width: item.percent + '%' }"></div>
          </div>
        </div>
      </div>
      <div class="insight-card">
        <div class="section-title">Trust signal สำคัญสุด (ลูกค้า)</div>
        <div v-if="!trustChart.length" style="color:var(--ink3);font-size:13px">ยังไม่มีข้อมูล</div>
        <div v-for="item in trustChart" :key="item.label" class="chart-bar-group">
          <div class="chart-bar-label"><span>{{ item.label }}</span><span>{{ item.count }}</span></div>
          <div class="chart-bar-track">
            <div class="chart-bar-fill fill-bark" :style="{ width: item.percent + '%' }"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="two-col">
      <div class="insight-card">
        <div class="section-title">ราคาที่ลูกค้ายอมรับ (2D1N)</div>
        <div v-if="!priceChart.length" style="color:var(--ink3);font-size:13px">ยังไม่มีข้อมูล</div>
        <div v-for="item in priceChart" :key="item.label" class="chart-bar-group">
          <div class="chart-bar-label"><span>{{ item.label }}</span><span>{{ item.count }}</span></div>
          <div class="chart-bar-track">
            <div class="chart-bar-fill fill-fern" :style="{ width: item.percent + '%' }"></div>
          </div>
        </div>
      </div>
      <div class="insight-card">
        <div class="section-title">สิ่งที่ลูกค้าอยากได้เมื่อทริป cancel</div>
        <div v-if="!refundChart.length" style="color:var(--ink3);font-size:13px">ยังไม่มีข้อมูล</div>
        <div v-for="item in refundChart" :key="item.label" class="chart-bar-group">
          <div class="chart-bar-label"><span>{{ item.label }}</span><span>{{ item.count }}</span></div>
          <div class="chart-bar-track">
            <div class="chart-bar-fill fill-bark" :style="{ width: item.percent + '%' }"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="responses-section">
      <div class="resp-section-header">
        <div class="section-title" style="margin-bottom:0">Responses ทั้งหมด</div>
        <div class="filter-row">
          <button class="filter-btn" :class="{ active: filter === 'all' }" @click="filter = 'all'">ทั้งหมด</button>
          <button class="filter-btn" :class="{ active: filter === 'guide' }" @click="filter = 'guide'">ไกด์</button>
          <button class="filter-btn" :class="{ active: filter === 'customer' }" @click="filter = 'customer'">ลูกค้า</button>
        </div>
      </div>
      <div style="height:12px"></div>
      
      <div v-if="!filteredList.length" class="empty-state">
        <div class="big">📋</div>
        <p>ยังไม่มีข้อมูล — เริ่มกรอกฟอร์มได้เลย</p>
        <router-link class="empty-link" to="/guide">🏔 ฟอร์มไกด์</router-link>
        <router-link class="empty-link" to="/customer">🎒 ฟอร์มลูกค้า</router-link>
      </div>

      <div v-for="r in filteredList" :key="r.id" class="response-card">
        <div class="resp-header">
          <div class="resp-left">
            <div class="resp-name">{{ r.name }}</div>
            <span class="resp-type" :class="r.type">{{ r.type === 'guide' ? '🏔 ไกด์' : '🎒 ลูกค้า' }}</span>
          </div>
          <div class="resp-meta">{{ formatDate(r.ts) }}</div>
        </div>
        <div class="resp-preview">{{ getPreview(r) || '—' }}</div>
        <button class="expand-btn" @click="r.showDetail = !r.showDetail">
          {{ r.showDetail ? 'ซ่อนรายละเอียด ▴' : 'ดูรายละเอียด ▾' }}
        </button>
        <div class="resp-detail" :class="{ open: r.showDetail }">
          <template v-if="r.type === 'guide'">
            <div v-if="r.channel && r.channel.length"><div class="detail-q">ช่องทางหาลูกค้า</div><div class="detail-a">{{ r.channel.join(', ') }}</div></div>
            <div v-if="r.reject"><div class="detail-q">เหตุผลที่ปฏิเสธลูกค้า</div><div class="detail-a">{{ r.reject }}</div></div>
            <div v-if="r.pain"><div class="detail-q">Pain point การจัดการจอง</div><div class="detail-a">{{ r.pain }}</div></div>
            <div v-if="r.rain"><div class="detail-q">รายได้หายช่วงหน้าฝน</div><div class="detail-a">{{ r.rain }}</div></div>
            <div v-if="r.concern"><div class="detail-q">ความกังวลเรื่อง platform</div><div class="detail-a">{{ r.concern }}</div></div>
            <div v-if="r.value"><div class="detail-q">Value ระบบเก็บเงินล่วงหน้า (1–5)</div><div class="detail-a">{{ r.value }}/5</div></div>
            <div v-if="r.note"><div class="detail-q">หมายเหตุ</div><div class="detail-a">{{ r.note }}</div></div>
          </template>
          <template v-else>
            <div v-if="r.discover"><div class="detail-q">หาไกด์จากไหน</div><div class="detail-a">{{ r.discover }}</div></div>
            <div v-if="r.missingInfo"><div class="detail-q">ข้อมูลที่หาไม่ได้</div><div class="detail-a">{{ r.missingInfo }}</div></div>
            <div v-if="r.cancelExp"><div class="detail-q">ประสบการณ์ cancel</div><div class="detail-a">{{ r.cancelExp }}</div></div>
            <div v-if="r.trustSignals && r.trustSignals.length"><div class="detail-q">Trust signals สำคัญ</div><div class="detail-a">{{ r.trustSignals.join(', ') }}</div></div>
            <div v-if="r.refundPref"><div class="detail-q">เมื่อทริป cancel อยากได้</div><div class="detail-a">{{ r.refundPref }}</div></div>
            <div v-if="r.klookExp"><div class="detail-q">ประสบการณ์ Klook/Viator</div><div class="detail-a">{{ r.klookExp }}</div></div>
            <div v-if="r.note"><div class="detail-q">ความคิดเห็นเพิ่มเติม</div><div class="detail-a">{{ r.note }}</div></div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const STORAGE_KEY = 'trek-research-v1'
const data = ref([])
const filter = ref('all')

const fetchData = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    data.value = raw.map(item => ({ ...item, showDetail: false }))
  } catch(e) {
    data.value = []
  }
}

onMounted(() => fetchData())

const guides = computed(() => data.value.filter(d => d.type === 'guide'))
const customers = computed(() => data.value.filter(d => d.type === 'customer'))

const commPct = computed(() => {
  if (!guides.value.length) return '—'
  const willing = guides.value.filter(g => g.commission && g.commission !== 'ไม่จ่าย').length
  return Math.round(willing / guides.value.length * 100) + '%'
})

const countField = (arr, field) => {
  const c = {}
  arr.forEach(item => { if (item[field]) c[item[field]] = (c[item[field]] || 0) + 1 })
  return c
}
const countArrayField = (arr, field) => {
  const c = {}
  arr.forEach(item => { (item[field] || []).forEach(v => { c[v] = (c[v] || 0) + 1 }) })
  return c
}
const toChartData = (counts) => {
  const entries = Object.entries(counts).sort((a,b) => b[1]-a[1])
  if (!entries.length) return []
  const max = entries[0][1]
  return entries.map(([label, count]) => ({
    label,
    count,
    percent: Math.round(count / max * 100)
  }))
}

const commissionChart = computed(() => toChartData(countField(guides.value, 'commission')))
const trustChart = computed(() => toChartData(countArrayField(customers.value, 'trustSignals')))
const priceChart = computed(() => toChartData(countField(customers.value, 'price')))
const refundChart = computed(() => toChartData(countField(customers.value, 'refundPref')))

const filteredList = computed(() => {
  const list = filter.value === 'all' 
    ? data.value 
    : data.value.filter(d => d.type === filter.value)
  return [...list].reverse()
})

const formatDate = (ts) => {
  return new Date(ts).toLocaleDateString('th-TH', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' })
}

const getPreview = (r) => {
  if (r.type === 'guide') {
    return [
      r.area && `พื้นที่: ${r.area}`, 
      r.commission && `Commission: ${r.commission}`, 
      r.cancel && `Cancel rate: ${r.cancel}`
    ].filter(Boolean).join(' · ')
  } else {
    return [
      r.nationality, 
      r.frequency, 
      r.price && `ราคา: ${r.price}`
    ].filter(Boolean).join(' · ')
  }
}

const clearAll = () => {
  if (confirm('ลบข้อมูล interview ทั้งหมดใช่ไหม? ไม่สามารถกู้คืนได้')) {
    localStorage.removeItem(STORAGE_KEY)
    fetchData()
  }
}
</script>

<style scoped>
.clear-btn {
  padding: 6px 12px; border: 1px solid rgba(181,74,58,0.4); background: none;
  color: rgba(181,74,58,0.8); border-radius: 8px; font-family: 'Sarabun', sans-serif;
  font-size: 12px; cursor: pointer; transition: all .15s;
}
.clear-btn:hover { background: rgba(181,74,58,0.12); color: #e06050; border-color: #e06050; }

.container { max-width: 860px; margin: 0 auto; padding: 40px 24px 60px; }
.page-header { margin-bottom: 28px; display: flex; justify-content: space-between; align-items: flex-end; }
.page-header h1 { font-size: 24px; font-weight: 600; color: var(--forest); }
.page-header p { font-size: 14px; color: var(--ink3); margin-top: 4px; }
.refresh-btn {
  padding: 8px 14px; border: 1px solid var(--border2); background: #fff; color: var(--ink2);
  border-radius: 8px; font-family: 'Sarabun', sans-serif; font-size: 13px; cursor: pointer; transition: all .15s;
}
.refresh-btn:hover { background: var(--fog); }

.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 28px; }
.stat-card { background: #fff; border: 1px solid var(--border); border-radius: 10px; padding: 18px 20px; box-shadow: var(--shadow); }
.stat-label { font-size: 11px; font-family: 'DM Mono', monospace; text-transform: uppercase; letter-spacing: .08em; color: var(--stone); margin-bottom: 6px; }
.stat-value { font-size: 28px; font-weight: 600; color: var(--forest); line-height: 1; }
.stat-sub { font-size: 12px; color: var(--ink3); margin-top: 4px; }

.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
.insight-card { background: #fff; border: 1px solid var(--border); border-radius: 10px; padding: 20px; box-shadow: var(--shadow); }
.section-title { font-size: 13px; font-weight: 600; color: var(--forest); margin-bottom: 14px; }

.chart-bar-group { margin-bottom: 10px; }
.chart-bar-label { font-size: 13px; color: var(--ink2); margin-bottom: 4px; display: flex; justify-content: space-between; gap: 8px; }
.chart-bar-label span:first-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }
.chart-bar-label span:last-child { flex-shrink: 0; font-family: 'DM Mono', monospace; font-size: 12px; color: var(--stone); }
.chart-bar-track { background: var(--fog); border-radius: 99px; height: 7px; overflow: hidden; }
.chart-bar-fill { height: 100%; border-radius: 99px; transition: width .6s ease; }
.fill-fern { background: var(--fern); }
.fill-bark { background: var(--bark); }

.responses-section { margin-bottom: 28px; }
.resp-section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.filter-row { display: flex; gap: 8px; flex-wrap: wrap; }
.filter-btn {
  padding: 6px 14px; border: 1px solid var(--border2); border-radius: 99px;
  background: var(--fog); font-family: 'Sarabun', sans-serif; font-size: 13px;
  cursor: pointer; transition: all .15s; color: var(--ink2);
}
.filter-btn.active { background: var(--forest); color: var(--mist); border-color: var(--forest); }

.response-card {
  background: #fff; border: 1px solid var(--border); border-radius: 10px;
  padding: 18px 20px; margin-bottom: 10px; box-shadow: var(--shadow); transition: all .15s;
}
.response-card:hover { border-color: var(--border2); box-shadow: var(--shadow-lg); }
.resp-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; gap: 12px; }
.resp-left { min-width: 0; }
.resp-name { font-size: 15px; font-weight: 600; color: var(--ink); margin-bottom: 4px; }
.resp-type {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 11px; font-family: 'DM Mono', monospace;
  padding: 2px 9px; border-radius: 99px; font-weight: 500;
}
.resp-type.guide { background: rgba(107,158,107,0.15); color: var(--fern); }
.resp-type.customer { background: rgba(139,111,71,0.12); color: var(--bark); }
.resp-meta { font-size: 11px; color: var(--stone); font-family: 'DM Mono', monospace; white-space: nowrap; }
.resp-preview { font-size: 13px; color: var(--ink3); line-height: 1.5; }
.resp-detail { display: none; margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--border); }
.resp-detail.open { display: block; }
.detail-q { font-size: 12px; font-weight: 500; color: var(--ink2); margin-bottom: 3px; }
.detail-a { font-size: 13px; color: var(--ink); margin-bottom: 12px; line-height: 1.5; }
.detail-a:last-child { margin-bottom: 0; }
.expand-btn {
  background: none; border: none; font-size: 12px; color: var(--fern);
  cursor: pointer; padding: 0; margin-top: 8px; font-family: 'Sarabun', sans-serif; font-weight: 500;
}

.empty-state { text-align: center; padding: 60px 20px; color: var(--ink3); }
.empty-state .big { font-size: 40px; margin-bottom: 12px; }
.empty-state p { font-size: 14px; margin-bottom: 16px; }
.empty-link {
  display: inline-flex; align-items: center; gap: 6px; padding: 10px 20px;
  background: var(--forest); color: var(--mist); border-radius: 8px;
  text-decoration: none; font-size: 14px; font-weight: 500; margin: 0 4px; transition: all .15s;
}
.empty-link:hover { background: var(--moss); }

@media (max-width: 700px) {
  .container { padding: 24px 16px 60px; }
  .page-header { flex-direction: column; align-items: flex-start; gap: 12px; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 20px; }
  .stat-card { padding: 14px; }
  .stat-value { font-size: 22px; }
  .two-col { grid-template-columns: 1fr; gap: 12px; }
  .resp-header { flex-direction: column; gap: 4px; }
  .filter-row { overflow-x: auto; flex-wrap: nowrap; padding-bottom: 4px; -webkit-overflow-scrolling: touch; }
  .filter-btn { white-space: nowrap; flex-shrink: 0; }
}
</style>
