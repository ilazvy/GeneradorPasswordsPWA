if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('serviceworker.js')
    .then(() => console.log('Service Worker registrado'))
    .catch(e => console.warn(e));
}

function getRandomValues(len) {
  const arr = new Uint32Array(len);
  crypto.getRandomValues(arr);
  return arr;
}

function generatePassword(length, opts) {
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_-+=[]{};:,.<>?';
  let pool = '';
  if (opts.lower) pool += lower;
  if (opts.upper) pool += upper;
  if (opts.numbers) pool += numbers;
  if (opts.symbols) pool += symbols;
  if (!pool) return '';
  const vals = getRandomValues(length);
  let out = '';
  for (let i = 0; i < length; i++) out += pool[vals[i] % pool.length];
  return out;
}

document.getElementById('generate').addEventListener('click', () => {
  const length = Math.max(4, Math.min(64, parseInt(document.getElementById('length').value) || 12));
  const opts = {
    upper: document.getElementById('upper').checked,
    lower: document.getElementById('lower').checked,
    numbers: document.getElementById('numbers').checked,
    symbols: document.getElementById('symbols').checked
  };
  const pwd = generatePassword(length, opts);
  document.getElementById('password').value = pwd;
});

document.getElementById('copy').addEventListener('click', async () => {
  const val = document.getElementById('password').value;
  if (!val) {
    alert('First generate a password to copy');
    return;
  }
  try {
    await navigator.clipboard.writeText(val);
    alert('Password copied to clipboard');
  } catch (e) {
    alert('Could not copy: ' + e);
  }
});
