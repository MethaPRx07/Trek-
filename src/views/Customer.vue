<template>
  <div class="container">
    <div class="page-header">
      <h1>แบบสอบถามนักเดินป่า</h1>
      <p>สำหรับ interview นักท่องเที่ยวและคนที่ชอบเดินป่า — ใช้เวลาประมาณ 8–12 นาที</p>
    </div>

    <div class="form-section">
      <div class="form-section-title">ข้อมูลเบื้องต้น</div>
      <div class="form-group">
        <label>ชื่อ (หรือชื่อเล่น) <span class="required">*</span></label>
        <input type="text" v-model="form.name" placeholder="เช่น Alex">
      </div>
      <div class="form-group">
        <label>สัญชาติ</label>
        <div class="radio-group">
          <label class="radio-item"><input type="radio" v-model="form.nationality" value="ไทย"> ไทย</label>
          <label class="radio-item"><input type="radio" v-model="form.nationality" value="ต่างชาติ"> ต่างชาติ</label>
        </div>
      </div>
      <div class="form-group">
        <label>เดินป่าบ่อยแค่ไหน?</label>
        <div class="radio-group">
          <label class="radio-item"><input type="radio" v-model="form.frequency" value="ครั้งแรก"> ยังไม่เคย / ครั้งแรก</label>
          <label class="radio-item"><input type="radio" v-model="form.frequency" value="1–2 ครั้ง/ปี"> 1–2 ครั้งต่อปี</label>
          <label class="radio-item"><input type="radio" v-model="form.frequency" value="3–5 ครั้ง/ปี"> 3–5 ครั้งต่อปี</label>
          <label class="radio-item"><input type="radio" v-model="form.frequency" value="6+ ครั้ง/ปี"> 6 ครั้งขึ้นไปต่อปี</label>
        </div>
      </div>
    </div>

    <div class="form-section">
      <div class="form-section-title">Discovery & Booking</div>
      <div class="form-group">
        <label><span class="q-num">Q1</span> ทริปเดินป่าครั้งล่าสุด หาไกด์/ทัวร์ได้จากไหน?</label>
        <textarea v-model="form.discover" placeholder="เช่น กลุ่ม Facebook / เพื่อนแนะนำ / Klook / Google..."></textarea>
      </div>
      <div class="form-group">
        <label><span class="q-num">Q2</span> ข้อมูลที่อยากรู้ก่อนจองแต่หาไม่ค่อยได้?</label>
        <textarea v-model="form.missingInfo" placeholder="เช่น ระดับความยาก / สภาพเส้นทาง / ข้อมูลไกด์..."></textarea>
      </div>
      <div class="form-group">
        <label><span class="q-num">Q3</span> เคยมีปัญหาเรื่องการจองหรือ cancel บ้างไหม?</label>
        <textarea v-model="form.cancelExp" placeholder="เช่น ถูก cancel กระทันหัน / จ่ายเงินแล้วไม่มีคนรับ..."></textarea>
      </div>
    </div>

    <div class="form-section">
      <div class="form-section-title">พฤติกรรมการจอง</div>
      <div class="form-group">
        <label><span class="q-num">Q4</span> ชอบจ่ายเงินตอนไหน?</label>
        <div class="radio-group">
          <label class="radio-item"><input type="radio" v-model="form.payTiming" value="จ่ายทั้งหมดตอนจอง"> จ่ายทั้งหมดตอนจอง</label>
          <label class="radio-item"><input type="radio" v-model="form.payTiming" value="มัดจำก่อน จ่ายส่วนที่เหลือก่อนไป"> มัดจำก่อน จ่ายส่วนที่เหลือก่อนไป</label>
          <label class="radio-item"><input type="radio" v-model="form.payTiming" value="จ่ายทั้งหมดวันเดินทาง"> จ่ายทั้งหมดวันเดินทาง</label>
          <label class="radio-item"><input type="radio" v-model="form.payTiming" value="จ่ายหลังทริปเสร็จ"> จ่ายหลังทริปเสร็จ</label>
        </div>
      </div>
      <div class="form-group">
        <label><span class="q-num">Q5</span> เคยใช้ Klook หรือ Viator จองกิจกรรม outdoor ไหม? ได้รับประสบการณ์แบบไหน?</label>
        <textarea v-model="form.klookExp" placeholder="เช่น ใช้บ้าง แต่ไม่ค่อยมีทริปเดินป่าจริงๆ / ไม่ค่อยเชื่อถือ..."></textarea>
      </div>
      <div class="form-group">
        <label><span class="q-num">Q6</span> ถ้าต้องเลือก — ราคาถูกกว่า 20% แต่ไม่มีรีวิว vs ราคาสูงกว่าแต่มีรีวิวละเอียด?</label>
        <div class="radio-group">
          <label class="radio-item"><input type="radio" v-model="form.trustVsPrice" value="ราคาถูกกว่า"> เลือกราคาถูกกว่า (price-sensitive)</label>
          <label class="radio-item"><input type="radio" v-model="form.trustVsPrice" value="รีวิวละเอียด"> เลือกรีวิวละเอียด (trust-first)</label>
          <label class="radio-item"><input type="radio" v-model="form.trustVsPrice" value="ขึ้นอยู่กับสถานการณ์"> ขึ้นอยู่กับสถานการณ์</label>
        </div>
      </div>
    </div>

    <div class="form-section">
      <div class="form-section-title">Safety & Willingness to Pay</div>
      <div class="form-group">
        <label><span class="q-num">Q7</span> Trust signal ที่สำคัญที่สุดสำหรับคุณคืออะไร?</label>
        <div class="checkbox-group">
          <label class="checkbox-item"><input type="checkbox" v-model="form.trustSignals" value="รีวิวจากคนอื่น"> รีวิวจากผู้ใช้จริง</label>
          <label class="checkbox-item"><input type="checkbox" v-model="form.trustSignals" value="ใบอนุญาตไกด์"> ใบอนุญาต / ใบรับรองไกด์</label>
          <label class="checkbox-item"><input type="checkbox" v-model="form.trustSignals" value="ประกันภัย"> มีประกันภัยคุ้มครอง</label>
          <label class="checkbox-item"><input type="checkbox" v-model="form.trustSignals" value="ข้อมูลฉุกเฉิน"> ข้อมูลเส้นทาง + แผน emergency</label>
          <label class="checkbox-item"><input type="checkbox" v-model="form.trustSignals" value="payment protection"> Payment protection / คืนเงินได้</label>
        </div>
      </div>
      <div class="form-group">
        <label><span class="q-num">Q8</span> ถ้าทริปถูก cancel เพราะสภาพอากาศ อยากได้อะไร?</label>
        <div class="radio-group">
          <label class="radio-item"><input type="radio" v-model="form.refundPref" value="คืนเงินทั้งหมด"> คืนเงินทั้งหมด</label>
          <label class="radio-item"><input type="radio" v-model="form.refundPref" value="เลื่อนวัน"> เลื่อนวันได้โดยไม่มีค่าใช้จ่าย</label>
          <label class="radio-item"><input type="radio" v-model="form.refundPref" value="เครดิต"> เครดิตสำหรับทริปต่อไป</label>
        </div>
      </div>
      <div class="form-group">
        <label><span class="q-num">Q9</span> ราคาที่รู้สึกว่า "สมเหตุสมผล" สำหรับทริป 2 วัน 1 คืน?</label>
        <div class="radio-group">
          <label class="radio-item"><input type="radio" v-model="form.price" value="< 2,000"> ต่ำกว่า 2,000 บาท</label>
          <label class="radio-item"><input type="radio" v-model="form.price" value="2,000–4,000"> 2,000–4,000 บาท</label>
          <label class="radio-item"><input type="radio" v-model="form.price" value="4,000–7,000"> 4,000–7,000 บาท</label>
          <label class="radio-item"><input type="radio" v-model="form.price" value="> 7,000"> มากกว่า 7,000 บาท</label>
        </div>
      </div>
      <div class="form-group">
        <label><span class="q-num">Q10</span> ความคิดเห็นเพิ่มเติม</label>
        <textarea v-model="form.note" placeholder="อะไรที่อยากเห็นใน platform เดินป่าในฝัน?"></textarea>
      </div>
      <button class="submit-btn" @click="submitCustomer">บันทึกข้อมูล →</button>
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
  nationality: '',
  frequency: '',
  discover: '',
  missingInfo: '',
  cancelExp: '',
  payTiming: '',
  klookExp: '',
  trustVsPrice: '',
  trustSignals: [],
  refundPref: '',
  price: '',
  note: ''
})

const form = reactive(getInitialForm())

const submitCustomer = () => {
  if (!form.name.trim()) {
    alert('กรุณาใส่ชื่อก่อนบันทึก')
    return
  }

  const record = {
    id: Date.now(),
    type: 'customer',
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

input[type="text"], textarea {
  width: 100%; padding: 10px 14px; border: 1px solid var(--border2); border-radius: 8px;
  font-family: 'Sarabun', sans-serif; font-size: 14px; color: var(--ink);
  background: var(--fog); transition: all .15s; outline: none; -webkit-appearance: none;
}
input[type="text"]:focus, textarea:focus {
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
}
</style>
