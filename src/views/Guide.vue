<template>
  <div class="container">
    <div class="page-header">
      <h1>แบบสอบถามไกด์เดินป่า</h1>
      <p>สำหรับ interview ไกด์และบริษัททัวร์เดินป่า — ใช้เวลาประมาณ 10–15 นาที</p>
    </div>

    <div class="form-section">
      <div class="form-section-title">ข้อมูลเบื้องต้น</div>
      <div class="form-group">
        <label>ชื่อ / ชื่อบริษัท <span class="required">*</span></label>
        <input type="text" v-model="form.name" placeholder="เช่น สมชาย เดินป่าเหนือ">
      </div>
      <div class="form-group">
        <label>พื้นที่ที่รับทริปหลัก</label>
        <div class="radio-group">
          <label class="radio-item"><input type="radio" v-model="form.area" value="เหนือ"> ภาคเหนือ (เชียงใหม่ / แม่ฮ่องสอน)</label>
          <label class="radio-item"><input type="radio" v-model="form.area" value="กาญจนบุรี"> กาญจนบุรี</label>
          <label class="radio-item"><input type="radio" v-model="form.area" value="ใต้"> ภาคใต้</label>
          <label class="radio-item"><input type="radio" v-model="form.area" value="อื่นๆ"> อื่นๆ</label>
        </div>
      </div>
    </div>

    <div class="form-section">
      <div class="form-section-title">Volume & Operations</div>
      <div class="form-group">
        <label><span class="q-num">Q1</span> รับทริปกี่ครั้งต่อเดือน (ช่วง peak)?</label>
        <input type="number" v-model="form.trips" placeholder="เช่น 8" min="0">
      </div>
      <div class="form-group">
        <label><span class="q-num">Q2</span> ลูกค้าส่วนใหญ่รู้จักคุณได้ยังไง?</label>
        <div class="checkbox-group">
          <label class="checkbox-item"><input type="checkbox" v-model="form.channel" value="บอกต่อ"> บอกต่อ / Word of mouth</label>
          <label class="checkbox-item"><input type="checkbox" v-model="form.channel" value="Facebook"> Facebook / Line กลุ่ม</label>
          <label class="checkbox-item"><input type="checkbox" v-model="form.channel" value="Instagram"> Instagram</label>
          <label class="checkbox-item"><input type="checkbox" v-model="form.channel" value="Klook"> Klook / Viator</label>
          <label class="checkbox-item"><input type="checkbox" v-model="form.channel" value="เว็บตัวเอง"> เว็บไซต์ตัวเอง</label>
        </div>
      </div>
      <div class="form-group">
        <label><span class="q-num">Q3</span> ช่วง peak season เคยต้องปฏิเสธลูกค้าเพราะอะไร?</label>
        <textarea v-model="form.reject" placeholder="เช่น เต็ม / ไกด์ไม่พอ / ลูกค้าขอ customize แปลกๆ..."></textarea>
      </div>
    </div>

    <div class="form-section">
      <div class="form-section-title">Pain Points</div>
      <div class="form-group">
        <label><span class="q-num">Q4</span> มีลูกค้า cancel หรือ no-show บ่อยแค่ไหน?</label>
        <div class="radio-group">
          <label class="radio-item"><input type="radio" v-model="form.cancel" value="แทบไม่มี"> แทบไม่มี (&lt; 5%)</label>
          <label class="radio-item"><input type="radio" v-model="form.cancel" value="นานๆ ครั้ง"> นานๆ ครั้ง (5–15%)</label>
          <label class="radio-item"><input type="radio" v-model="form.cancel" value="บ่อยพอสมควร"> บ่อยพอสมควร (15–30%)</label>
          <label class="radio-item"><input type="radio" v-model="form.cancel" value="บ่อยมาก"> บ่อยมาก (&gt; 30%)</label>
        </div>
      </div>
      <div class="form-group">
        <label><span class="q-num">Q5</span> ปัญหาที่เสียเวลามากที่สุดในการจัดการจองคืออะไร?</label>
        <textarea v-model="form.pain" placeholder="เช่น ต้องตอบ Line ทั้งวัน / ลืมวันที่ / เก็บเงินยาก..."></textarea>
      </div>
      <div class="form-group">
        <label><span class="q-num">Q6</span> รายได้หายไปกี่ % ช่วงหน้าฝน?</label>
        <div class="radio-group">
          <label class="radio-item"><input type="radio" v-model="form.rain" value="< 30%"> น้อยกว่า 30%</label>
          <label class="radio-item"><input type="radio" v-model="form.rain" value="30–50%"> 30–50%</label>
          <label class="radio-item"><input type="radio" v-model="form.rain" value="50–70%"> 50–70%</label>
          <label class="radio-item"><input type="radio" v-model="form.rain" value="> 70%"> มากกว่า 70%</label>
        </div>
      </div>
    </div>

    <div class="form-section">
      <div class="form-section-title">Platform Readiness</div>
      <div class="form-group">
        <label><span class="q-num">Q7</span> Commission ที่ยอมรับได้ต่อ booking?</label>
        <div class="radio-group">
          <label class="radio-item"><input type="radio" v-model="form.commission" value="ไม่จ่าย"> ไม่ยอมจ่าย</label>
          <label class="radio-item"><input type="radio" v-model="form.commission" value="< 10%"> น้อยกว่า 10%</label>
          <label class="radio-item"><input type="radio" v-model="form.commission" value="10–15%"> 10–15%</label>
          <label class="radio-item"><input type="radio" v-model="form.commission" value="15–20%"> 15–20%</label>
          <label class="radio-item"><input type="radio" v-model="form.commission" value="> 20%"> มากกว่า 20% (ถ้าได้ลูกค้าต่างชาติ)</label>
        </div>
      </div>
      <div class="form-group">
        <label><span class="q-num">Q8</span> ความกังวลหลักถ้าจะใช้ platform คืออะไร?</label>
        <textarea v-model="form.concern" placeholder="เช่น กลัวถูกควบคุม / ลูกค้า bypass ไปจองตรง / คุณภาพลูกค้า..."></textarea>
      </div>
      <div class="form-group">
        <label><span class="q-num">Q9</span> ระบบเก็บเงินล่วงหน้า + ป้องกัน cancel มี value สำหรับคุณไหม?</label>
        <div class="scale-row">
          <button class="scale-btn" :class="{ selected: form.value === '1' }" @click="form.value = '1'">1</button>
          <button class="scale-btn" :class="{ selected: form.value === '2' }" @click="form.value = '2'">2</button>
          <button class="scale-btn" :class="{ selected: form.value === '3' }" @click="form.value = '3'">3</button>
          <button class="scale-btn" :class="{ selected: form.value === '4' }" @click="form.value = '4'">4</button>
          <button class="scale-btn" :class="{ selected: form.value === '5' }" @click="form.value = '5'">5</button>
        </div>
        <div class="scale-labels"><span>ไม่มีประโยชน์</span><span>มีประโยชน์มาก</span></div>
      </div>
      <div class="form-group">
        <label><span class="q-num">Q10</span> หมายเหตุเพิ่มเติม</label>
        <textarea v-model="form.note" placeholder="ความคิดเห็นอื่นๆ..."></textarea>
      </div>
      <button class="submit-btn" @click="submitGuide">บันทึกข้อมูล →</button>
      <div class="success-toast" :class="{ show: showToast }">✓ บันทึกแล้ว — ดูผลได้ที่ Dashboard</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const STORAGE_KEY = 'trek-research-v1'
const showToast = ref(false)

const getInitialForm = () => ({
  name: '',
  area: '',
  trips: '',
  channel: [],
  reject: '',
  cancel: '',
  pain: '',
  rain: '',
  commission: '',
  concern: '',
  value: '',
  note: ''
})

const form = reactive(getInitialForm())

const submitGuide = () => {
  if (!form.name.trim()) {
    alert('กรุณาใส่ชื่อก่อนบันทึก')
    return
  }

  const record = {
    id: Date.now(),
    type: 'guide',
    ts: new Date().toISOString(),
    ...form
  }

  let data = []
  try {
    data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch (e) {
    data = []
  }
  
  data.push(record)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))

  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 4000)

  Object.assign(form, getInitialForm())
}
</script>

<style scoped>
.container { max-width: 680px; margin: 0 auto; padding: 40px 24px 60px; }
.page-header { margin-bottom: 32px; }
.page-header h1 { font-size: 24px; font-weight: 600; color: var(--forest); }
.page-header p { font-size: 14px; color: var(--ink3); margin-top: 6px; }

.form-section {
  background: #fff; border: 1px solid var(--border); border-radius: 12px;
  padding: 28px; margin-bottom: 20px; box-shadow: var(--shadow);
}
.form-section-title {
  font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: .12em;
  text-transform: uppercase; color: var(--sage); margin-bottom: 20px;
  display: flex; align-items: center; gap: 8px;
}
.form-section-title::after { content: ''; flex: 1; height: 1px; background: var(--border); }

.form-group { margin-bottom: 18px; }
.form-group:last-child { margin-bottom: 0; }
label { display: block; font-size: 13px; font-weight: 500; color: var(--ink2); margin-bottom: 6px; }
label .q-num { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--stone); margin-right: 4px; }
label .required { color: var(--danger); margin-left: 2px; }

input[type="text"], input[type="number"], textarea {
  width: 100%; padding: 10px 14px; border: 1px solid var(--border2); border-radius: 8px;
  font-family: 'Sarabun', sans-serif; font-size: 14px; color: var(--ink);
  background: var(--fog); transition: all .15s; outline: none; -webkit-appearance: none;
}
input[type="text"]:focus, input[type="number"]:focus, textarea:focus {
  border-color: var(--fern); background: #fff; box-shadow: 0 0 0 3px rgba(61,107,61,0.1);
}
textarea { resize: vertical; min-height: 80px; }

.radio-group, .checkbox-group { display: flex; flex-direction: column; gap: 8px; margin-top: 4px; }
.radio-item, .checkbox-item {
  display: flex; align-items: center; gap: 10px; padding: 8px 12px;
  border: 1px solid var(--border); border-radius: 8px; cursor: pointer;
  transition: all .15s; font-size: 14px;
}
.radio-item:hover, .checkbox-item:hover { background: var(--fog); border-color: var(--border2); }
.radio-item input, .checkbox-item input { accent-color: var(--fern); width: 16px; height: 16px; flex-shrink: 0; }

.scale-row { display: flex; gap: 8px; margin-top: 8px; }
.scale-btn {
  flex: 1; padding: 10px 4px; border: 1px solid var(--border2); border-radius: 8px;
  background: var(--fog); font-family: 'DM Mono', monospace; font-size: 14px;
  cursor: pointer; transition: all .15s; text-align: center; color: var(--ink2);
}
.scale-btn:hover { border-color: var(--fern); background: rgba(61,107,61,0.07); }
.scale-btn.selected { background: var(--fern); border-color: var(--fern); color: #fff; }
.scale-labels { display: flex; justify-content: space-between; font-size: 11px; color: var(--ink3); margin-top: 4px; }

.submit-btn {
  width: 100%; padding: 14px 24px; background: var(--forest); color: var(--mist);
  border: none; border-radius: 10px; font-family: 'Sarabun', sans-serif;
  font-size: 15px; font-weight: 600; cursor: pointer; transition: all .15s;
  margin-top: 8px; letter-spacing: .02em;
}
.submit-btn:hover { background: var(--moss); transform: translateY(-1px); box-shadow: var(--shadow-lg); }
.submit-btn:active { transform: translateY(0); }

.success-toast {
  display: none; align-items: center; gap: 10px; background: var(--success);
  color: #fff; padding: 14px 18px; border-radius: 10px; font-size: 14px;
  margin-top: 16px; animation: slideIn .3s ease;
}
.success-toast.show { display: flex; }
@keyframes slideIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }

@media (max-width: 600px) {
  .container { padding: 24px 16px 80px; }
  .page-header h1 { font-size: 20px; }
  .form-section { padding: 20px 16px; }
  .scale-btn { font-size: 13px; }
}
</style>
