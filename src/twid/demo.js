// import WASM wrapper (路徑依實際位置)
import init, { twid_validate } from "./twid_wasm.js";
await init(); // 會自動讀同資料夾的 twid_wasm_bg.wasm

// DOM refs  // << ensure IDs match the .md
const inputEl  = document.querySelector('#twid-input');  // << twid-input
const buttonEl = document.querySelector('#twid-btn');    // << twid-btn
const outputEl = document.querySelector('#twid-out');    // << twid-out

function show(ok, reason) {
  if (ok) {
    outputEl.textContent = `${inputEl.value} 合法身份證號碼`;
    outputEl.style.color = "green";
  } else {

    outputEl.textContent = `${inputEl.value} 不合法: ${reason}`;
    outputEl.style.color = "#b00";
  }
}

function validateNow() {
  const v = (inputEl.value || "").trim();      // 嚴格：不自動轉大寫
  const reason = twid_validate(v);             // "" = valid
  show(reason === "", reason);
}

buttonEl.addEventListener('click', validateNow);
inputEl.addEventListener('keydown', e => { if (e.key === 'Enter') validateNow(); });
