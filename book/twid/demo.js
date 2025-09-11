// import WASM wrapper (路徑依實際位置)
import init, { twid_validate } from "./twid_wasm.js";
await init(); // 會自動讀同資料夾的 twid_wasm_bg.wasm

// DOM refs  // << ensure IDs match the .md
const inputEl  = document.querySelector('#twid-input');  // << twid-input
const buttonEl = document.querySelector('#twid-btn');    // << twid-btn
const outputEl = document.querySelector('#twid-out');    // << twid-out

function show(ok, reason) {
  if (ok) {
    outputEl.textContent = `${inputEl.value} is VALID`;
    outputEl.style.color = "green";
  } else {
    const map = {
      "length must be 10": "長度必須 10 碼",
      "first char must be uppercase A-Z": "第一字元需為大寫英文字母",
      "invalid region letter": "無效的地區字母",
      "digits required after the letter": "字母後需為數字",
      "gender digit must be 1 or 2": "性別碼必須為 1 或 2",
      "checksum failed": "檢查碼失敗",
    };
    outputEl.textContent = `${inputEl.value} is INVALID: ${map[reason] ?? reason}`;
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
