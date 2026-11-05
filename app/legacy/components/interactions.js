/* App 与小程序高级交互库 · 零依赖实现。<script src="interactions.js"> 后自动扫描 [data-ix]，也可 IX.init(root)。
 * 每个交互 = 一个 data-ix 名称（可空格组合，如 data-ix="press ripple"）。完整清单见 IX.list。
 * 编程接口：IX.toast(text, {undo, duration}) · IX.sheet(el).open() · IX.countUp(el, to) · IX.slot(el, n) · IX.burst(x, y)
 */
(function () {
  const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const raf = f => requestAnimationFrame(f), raf2 = f => raf(() => raf(f));
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
  const SVG = { check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>', arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>', trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13"/></svg>', down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg>' };
  const H = {}; // handlers: name -> init(el)

  /* ---------- 编程工具 ---------- */
  function countUp(el, to, ms = 900, fmt = v => Math.round(v).toLocaleString('zh-CN')) {
    const from = parseFloat(String(el.textContent).replace(/[^\d.-]/g, '')) || 0, t0 = performance.now();
    if (reduce()) return (el.textContent = fmt(to));
    const step = n => { const p = Math.min(1, (n - t0) / ms); el.textContent = fmt(from + (to - from) * easeOutCubic(p)); if (p < 1) raf(step); }; raf(step);
  }
  function slot(el, n) {
    el.classList.add('ix-slot'); const s = String(n);
    while (el.children.length < s.length) { const d = document.createElement('span'); d.className = 'd'; d.innerHTML = '<span>' + [...Array(10).keys()].map(i => '<i>' + i + '</i>').join('') + '</span>'; el.appendChild(d); }
    while (el.children.length > s.length) el.lastChild.remove();
    [...s].forEach((c, i) => el.children[i].firstChild.style.transform = `translateY(${-c * 1.15}em)`);
    el.dataset.value = n;
  }
  function burst(x, y, n = 6, colors = ['#0F766E', '#F59E0B', '#EF4444', '#3B82F6']) {
    if (reduce()) return;
    for (let i = 0; i < n; i++) { const p = document.createElement('i'); p.className = 'ix-particle'; p.style.left = x + 'px'; p.style.top = y + 'px'; p.style.background = colors[i % colors.length]; document.body.appendChild(p);
      const a = i / n * Math.PI * 2 + Math.random() * .4, d = 28 + Math.random() * 18;
      p.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px) scale(.2)`, opacity: 0 }], { duration: 560, easing: 'cubic-bezier(.22,1,.36,1)' }).onfinish = () => p.remove(); }
  }
  function drag(el, { start, move, end, filter, axis }) { // 统一 pointer 拖拽：回调拿到 dx, dy, vx, vy(px/ms)。axis='x'|'y' 时先判方向，方向不符就放手给外层（可嵌套：列表左滑 + 下拉刷新）
    let sx, sy, lx, ly, lt, vx = 0, vy = 0, on = false, locked = false, pid;
    el.addEventListener('pointerdown', e => { if (e.button > 0 || (filter && !filter(e))) return; on = true; locked = !axis; pid = e.pointerId; sx = lx = e.clientX; sy = ly = e.clientY; lt = performance.now(); vx = vy = 0; if (locked) { try { el.setPointerCapture(pid); } catch (_) {} } start && start(e); });
    window.addEventListener('pointermove', e => { if (!on || e.pointerId !== pid) return;
      if (!locked) { const ax = Math.abs(e.clientX - sx), ay = Math.abs(e.clientY - sy); if (Math.max(ax, ay) < 6) return; if ((ax > ay ? 'x' : 'y') !== axis) { on = false; end && end(0, 0, 0, 0, e); return; } locked = true; try { el.setPointerCapture(pid); } catch (_) {} }
      const t = performance.now(), dt = Math.max(1, t - lt); vx = (e.clientX - lx) / dt; vy = (e.clientY - ly) / dt; lx = e.clientX; ly = e.clientY; lt = t; move && move(e.clientX - sx, e.clientY - sy, vx, vy, e); });
    const up = e => { if (!on || e.pointerId !== pid) return; on = false; end && end(lx - sx, ly - sy, vx, vy, e); };
    window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
  }

  /* ---------- 1 按钮与反馈 ---------- */
  H.press = H.physical = el => { if (el._press) return; el._press = 1; const d = () => el.classList.add('ix-down'), u = () => el.classList.remove('ix-down');
    el.addEventListener('pointerdown', d); ['pointerup', 'pointerleave', 'pointercancel'].forEach(t => el.addEventListener(t, u)); };
  H.ripple = el => el.addEventListener('pointerdown', e => { const r = el.getBoundingClientRect(), d = document.createElement('span'); d.className = 'ix-ripple-dot'; d.style.left = e.clientX - r.left + 'px'; d.style.top = e.clientY - r.top + 'px'; el.appendChild(d); d.addEventListener('animationend', () => d.remove()); });
  H.burst = el => el.addEventListener('click', e => { const r = el.getBoundingClientRect(); burst(e.clientX || r.left + r.width / 2, e.clientY || r.top + r.height / 2); });
  H.success = el => { el.innerHTML = '<svg class="ix-success" viewBox="0 0 64 64"><circle cx="32" cy="32" r="28"/><path d="M20 33l8 8 16-17"/></svg>'; const s = el.firstChild; const play = () => { s.classList.remove('go'); raf2(() => s.classList.add('go')); }; el.addEventListener('click', play); setTimeout(play, 300); };
  H.tristate = el => { const initialLabel = el.textContent.trim() || '提交订单'; el.innerHTML = '<span class="t"></span><span class="spin"></span>'; $('.t', el).textContent = initialLabel; const label = initialLabel;
    el.addEventListener('click', () => { if (el.classList.contains('loading')) return; if (el.classList.contains('ok')) { el.classList.remove('ok'); $('.t', el).textContent = label; return; }
      el.classList.add('loading'); setTimeout(() => { el.classList.remove('loading'); el.classList.add('ok'); $('.t', el).innerHTML = SVG.check.replace('<svg', '<svg style="width:20px;vertical-align:-5px;margin-right:6px"') + '已提交'; }, 1200); }); };
  H.stepper = el => { el.classList.add('ix-stepper'); el.innerHTML = '<button class="add">加入</button><button class="minus" aria-label="减">−</button><span class="n"></span><button class="plus" aria-label="加">+</button>'; let n = 0; const num = $('.n', el);
    const set = v => { n = Math.max(0, v); el.classList.toggle('open', n > 0); slot(num, n); el.dispatchEvent(new CustomEvent('change', { detail: n, bubbles: true })); };
    $('.add', el).onclick = () => set(1); $('.plus', el).onclick = () => set(n + 1); $('.minus', el).onclick = () => set(n - 1); };
  H.hold = el => { const ms = +(el.dataset.hold || 1200); el.insertAdjacentHTML('beforeend', '<svg class="ring"><rect rx="30" ry="30" x="1.5" y="1.5"/></svg>'); const rect = $('rect', el); let a, t0, p = 0;
    const size = () => { const w = el.offsetWidth + 12, h = el.offsetHeight + 12; rect.setAttribute('width', w - 3); rect.setAttribute('height', h - 3); rect.setAttribute('rx', (h - 3) / 2); const L = 2 * (w + h - 6) - (4 - Math.PI) * (h - 3); rect.style.strokeDasharray = L; return L; };
    let L = 0; const draw = () => rect.style.strokeDashoffset = L * (1 - p);
    el.addEventListener('pointerdown', () => { L = size(); cancelAnimationFrame(a); const base = p; t0 = performance.now() - base * ms; const step = n => { p = Math.min(1, (n - t0) / ms); draw(); if (p >= 1) { el.dispatchEvent(new CustomEvent('confirm', { bubbles: true })); const r = el.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, 8); el.querySelector('.t') && (el.querySelector('.t').textContent = '已删除'); p = 0; setTimeout(draw, 400); return; } a = raf(step); }; a = raf(step); });
    const cancel = () => { cancelAnimationFrame(a); const back = () => { p = Math.max(0, p - .05); draw(); if (p > 0) a = raf(back); }; a = raf(back); };
    el.addEventListener('pointerup', cancel); el.addEventListener('pointerleave', cancel); L = size(); draw(); };
  H.slide = el => { el.classList.add('ix-slide'); el.innerHTML = '<div class="fill"></div><div class="label"></div><div class="knob">' + SVG.arrow + '</div>'; $('.label', el).textContent = el.dataset.label || '向右滑动确认支付'; const knob = $('.knob', el), fill = $('.fill', el);
    const max = () => el.offsetWidth - 52; let x = 0; const set = (v, anim) => { x = v; knob.style.transition = fill.style.transition = anim ? 'transform 420ms cubic-bezier(.34,1.56,.64,1), width 420ms cubic-bezier(.34,1.56,.64,1)' : 'none'; knob.style.transform = `translateX(${x}px)`; fill.style.width = x + 56 + 'px'; };
    drag(knob, { axis: 'x', move: dx => !el.classList.contains('done') && set(Math.max(0, Math.min(max(), dx))), end: () => { if (x > max() * .8) { set(max(), true); el.classList.add('done'); knob.innerHTML = SVG.check; $('.label', el).textContent = '已确认'; el.dispatchEvent(new CustomEvent('confirm', { bubbles: true })); setTimeout(() => { el.classList.remove('done'); knob.innerHTML = SVG.arrow; $('.label', el).textContent = el.dataset.label || '向右滑动确认支付'; set(0, true); }, 1800); } else set(0, true); } }); };
  H.morph = el => { el.classList.add('ix-morph'); el.innerHTML = '<span></span><span></span><span></span>'; el.setAttribute('aria-label', '菜单');
    if (!['BUTTON', 'A'].includes(el.tagName)) { el.setAttribute('role', 'button'); el.tabIndex = 0; }
    el.setAttribute('aria-expanded', 'false'); const toggle = () => { el.classList.toggle('on'); el.setAttribute('aria-expanded', String(el.classList.contains('on'))); };
    el.addEventListener('click', toggle);
    el.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && !['BUTTON','A'].includes(el.tagName)) { e.preventDefault(); toggle(); } }); };
  H.switch = el => { el.classList.add('ix-switch'); el.innerHTML = '<i></i>'; el.setAttribute('role', 'switch'); el.tabIndex = el.tabIndex < 0 ? 0 : el.tabIndex;
    el.setAttribute('aria-checked', String(el.classList.contains('on')));
    const toggle = () => { el.classList.add('stretch'); el.classList.toggle('on'); el.setAttribute('aria-checked', String(el.classList.contains('on'))); setTimeout(() => el.classList.remove('stretch'), 160); };
    el.addEventListener('click', toggle);
    el.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && el.tagName !== 'BUTTON') { e.preventDefault(); toggle(); } }); };
  H.split = el => { el.classList.add('ix-split'); el.innerHTML = '<button class="ix-btn a">开始计时</button><button class="ix-btn ix-btn--light b">结束</button>'; const a = $('.a', el), b = $('.b', el);
    a.onclick = () => { if (!el.classList.contains('on')) { el.classList.add('on'); a.textContent = '暂停'; } else a.textContent = a.textContent === '暂停' ? '继续' : '暂停'; };
    b.onclick = () => { el.classList.remove('on'); a.textContent = '开始计时'; }; };

  /* ---------- 2 数字与文字 ---------- */
  H.countup = el => { const to = +el.dataset.to || 0; el.textContent = '0'; const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { countUp(el, to, +el.dataset.ms || 1200); io.disconnect(); } })); io.observe(el); };
  H.slot = el => { slot(el, el.dataset.value || el.textContent.trim() || 0); };
  H.badge = el => { el.classList.add('ix-badge'); const s = document.createElement('span'); el.textContent = ''; el.appendChild(s); slot(s, el.dataset.value || 3); };
  H.titleswap = el => { el.classList.add('ix-title'); const texts = (el.dataset.titles || '今天|本周|本月').split('|').map(t => t.split('/')); let i = 0;
    const render = (lines, enter) => lines.map(l => `<span class="ln"><span style="transform:translateY(${enter ? 110 : 0}%)">${l}</span></span>`).join('');
    el.innerHTML = render(texts[0]); el.addEventListener('click', () => { const old = $$('.ln > span', el); old.forEach((s, k) => { s.style.transitionDelay = k * 60 + 'ms'; s.style.transform = 'translateY(110%)'; s.style.opacity = 0; });
      setTimeout(() => { i = (i + 1) % texts.length; el.innerHTML = render(texts[i], true); raf2(() => $$('.ln > span', el).forEach((s, k) => { s.style.transitionDelay = k * 60 + 'ms'; s.style.transform = 'none'; })); }, 260 + old.length * 60); }); };

  /* ---------- 3 卡片与列表 ---------- */
  H.swipe = el => { // 左滑删除：超过 40% 或速度 > .5 直接删；否则吸附到露出按钮(-88)或回弹
    el.classList.add('ix-swipe'); const html = el.innerHTML; el.innerHTML = '<button class="act" aria-label="删除">' + SVG.trash + '</button><div class="row">' + html + '</div>'; const row = $('.row', el); let base = 0;
    const remove = () => { el.style.height = el.offsetHeight + 'px'; row.style.transform = 'translateX(-100%)'; raf2(() => { el.style.height = '0px'; el.style.marginBottom = '0px'; }); setTimeout(() => el.remove(), 380); el.dispatchEvent(new CustomEvent('delete', { bubbles: true })); IX.toast && IX.toast('已删除 1 条', { undo: () => {} }); };
    $('.act', el).onclick = remove;
    drag(row, { axis: 'x', start: () => row.classList.add('drag'), move: dx => { let x = base + dx; if (x > 0) x *= .3; row.style.transform = `translateX(${x}px)`; },
      end: (dx, dy, vx) => { row.classList.remove('drag'); const x = base + dx, w = el.offsetWidth; if (x < -w * .4 || vx < -.5 && x < -40) return remove(); base = x < -44 ? -88 : 0; row.style.transform = `translateX(${base}px)`; } }); };
  H.flip = el => { el.classList.add('ix-flip'); const [f, b] = (el.dataset.faces || '会员卡|券码 8826 1043').split('|'); el.innerHTML = '<div class="in"><div class="f"><b></b><br><small>点击翻面</small></div><div class="b"><b></b></div></div>'; $('.f b', el).textContent = f; $('.b b', el).textContent = b; el.onclick = () => el.classList.toggle('on'); };
  H.fan = el => { el.classList.add('ix-fan'); const cols = ['#9A3412', '#0F766E', '#334155', '#111']; el.innerHTML = cols.map(c => `<div style="background:${c}"></div>`).join(''); let open = false;
    el.onclick = () => { open = !open; $$('div', el).forEach((c, i) => c.style.transform = open ? `rotate(${(i - 1.5) * 14}deg)` : `rotate(${(i - 1.5) * 1.5}deg)`); }; el.onclick(); el.onclick(); };
  H.expand = el => { el.classList.add('ix-expand'); const [t, ...b] = el.innerHTML.split('<hr>'); el.innerHTML = `<button>${t.trim()}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9.5l6 6 6-6"/></svg></button><div class="body"><div><p>${b.join('')}</p></div></div>`; $('button', el).onclick = () => el.classList.toggle('on'); };
  function flip(items, change) { // FLIP：记录 First → 改布局 → Last → Invert → Play
    const first = new Map(items.map(i => [i, i.getBoundingClientRect()])); change();
    items.forEach(i => { if (!i.isConnected) return; const a = first.get(i), b = i.getBoundingClientRect(); if (!a) return; const dx = a.left - b.left, dy = a.top - b.top, sx = a.width / b.width, sy = a.height / b.height;
      i.animate([{ transform: `translate(${dx}px,${dy}px) scale(${sx},${sy})`, transformOrigin: '0 0' }, { transform: 'none', transformOrigin: '0 0' }], { duration: reduce() ? 1 : 460, easing: 'cubic-bezier(.22,1,.36,1)' }); });
  }
  H.layout = el => { el.classList.add('ix-layout'); const btn = $(el.dataset.toggle || 'x'); const go = () => flip([...el.children], () => el.classList.toggle('grid')); btn ? btn.addEventListener('click', go) : el.addEventListener('click', go); };
  H.filter = el => { el.classList.add('ix-filter'); const bar = $(el.dataset.bar); if (!bar) return;
    $$('button', bar).forEach(b => b.onclick = () => { const k = b.dataset.k; $$('button', bar).forEach(x => x.classList.toggle('on', x === b));
      const kids = [...el.children], leaving = kids.filter(c => k !== 'all' && c.dataset.k !== k && !c.hidden), entering = kids.filter(c => (k === 'all' || c.dataset.k === k) && c.hidden);
      leaving.forEach(c => c.animate([{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(.6)', opacity: 0 }], { duration: 180, easing: 'cubic-bezier(.5,0,.75,0)' })); // 离开：原地缩小淡出（ease-in）
      setTimeout(() => { flip(kids.filter(c => !c.hidden && !leaving.includes(c)), () => { leaving.forEach(c => c.hidden = true); entering.forEach(c => c.hidden = false); }); // 留下：弹簧移位
        entering.forEach((c, i) => c.animate([{ transform: 'scale(.6)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }], { duration: 360, delay: 120 + i * 40, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'backwards' })); }, 180); }); };
  H.stagger = el => { el.classList.add('ix-stagger'); [...el.children].forEach((c, i) => c.style.setProperty('--i', i)); const play = () => { el.classList.remove('in'); raf2(() => el.classList.add('in')); };
    new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { play(); o.disconnect(); } })).observe(el); el.addEventListener('dblclick', play); el._play = play; };
  H.skeleton = el => { const real = el.innerHTML; const ms = +el.dataset.ms || 1400; const load = () => { el.innerHTML = el.dataset.skel || '<div class="ix-skel" style="height:120px;margin-bottom:10px"></div><div class="ix-skel" style="height:14px;width:70%;margin-bottom:8px"></div><div class="ix-skel" style="height:14px;width:40%"></div>'; setTimeout(() => { el.innerHTML = real; el.animate([{ opacity: 0 }, { opacity: 1 }], 300); }, ms); }; load(); el.addEventListener('dblclick', load); };
  H.coupon = el => { el.classList.add('ix-coupon'); if (!$('.glare', el)) el.insertAdjacentHTML('afterbegin', '<div class="pat"></div><div class="glare"></div>'); const pat = $('.pat', el);
    el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; el.style.transition = 'none'; el.style.transform = `perspective(700px) rotateY(${x * 18}deg) rotateX(${-y * 18}deg)`; el.style.setProperty('--gx', (x + .5) * 100 + '%'); el.style.setProperty('--gy', (y + .5) * 100 + '%'); pat.style.transform = `translate(${x * 24}px,${y * 24}px)`; });
    el.addEventListener('pointerleave', () => { el.style.transition = ''; el.style.transform = ''; pat.style.transform = ''; }); };

  /* ---------- 4 手势与控件 ---------- */
  H.ptr = el => { el.classList.add('ix-ptr'); const inner = el.innerHTML; el.innerHTML = '<div class="ind">' + SVG.down + '</div><div class="content">' + inner + '</div>'; const c = $('.content', el), ind = $('.ind svg', el); const TH = 64; let y = 0;
    drag(c, { axis: 'y', start: () => { if (el.classList.contains('loading')) return; c.classList.add('drag'); }, move: (dx, dy) => { if (el.classList.contains('loading') || dy < 0) return; y = dy < TH ? dy * .6 : TH * .6 + (dy - TH) * .25; c.style.transform = `translateY(${y}px)`; el.classList.toggle('ready', y >= TH * .6); },
      end: () => { c.classList.remove('drag'); if (el.classList.contains('ready')) { el.classList.remove('ready'); el.classList.add('loading'); c.style.transform = `translateY(${TH * .75}px)`; ind.outerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:24px"><path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3"/></svg>';
        setTimeout(() => { el.classList.remove('loading'); c.style.transform = ''; const first = $('.item', c); if (first) { const n = first.cloneNode(true); n.textContent = '刚刚 · 新内容已刷新'; first.before(n); n.animate([{ opacity: 0, transform: 'translateY(-8px)' }, { opacity: 1, transform: 'none' }], 360); } el.dispatchEvent(new CustomEvent('refresh', { bubbles: true })); $('.ind', el).innerHTML = SVG.down; }, 1200); } else c.style.transform = ''; } }); };
  H.compare = el => { el.classList.add('ix-compare'); if (!$('.bar', el)) el.insertAdjacentHTML('beforeend', '<div class="bar"></div>'); const set = x => { const r = el.getBoundingClientRect(); el.style.setProperty('--p', Math.max(0, Math.min(100, (x - r.left) / r.width * 100)) + '%'); };
    drag(el, { start: e => set(e.clientX), move: (dx, dy, vx, vy, e) => set(e.clientX) }); };
  H.ruler = el => { el.classList.add('ix-ruler'); const min = +(el.dataset.min || 0), max = +(el.dataset.max || 100); let v = +(el.dataset.value || 50); el.innerHTML = '<div class="val"></div><div class="ticks">' + Array.from({ length: max - min + 1 }, (_, i) => `<i class="${(min + i) % 5 ? '' : 'm'}"></i>`).join('') + '</div><div class="needle"></div>'; const ticks = $('.ticks', el), val = $('.val', el), unit = el.dataset.unit || '';
    let pos = (v - min) * 10, a; const render = () => { ticks.style.transform = `translateX(${-pos}px)`; const nv = min + Math.round(pos / 10); if (nv !== v || !val.textContent) { v = nv; val.textContent = v + unit; el.style.setProperty('--v', (v - min) / (max - min)); el.dispatchEvent(new CustomEvent('input', { detail: v, bubbles: true })); } };
    let p0; drag(el, { start: () => { cancelAnimationFrame(a); p0 = pos; }, move: dx => { pos = Math.max(-30, Math.min((max - min) * 10 + 30, p0 - dx)); render(); }, end: (dx, dy, vx) => { let vel = -vx * 16; const step = () => { vel *= .92; pos += vel; pos = Math.max(0, Math.min((max - min) * 10, pos)); if (Math.abs(vel) < .5) { const t = Math.round(pos / 10) * 10; pos += (t - pos) * .3; if (Math.abs(t - pos) < .3) { pos = t; render(); return; } } render(); a = raf(step); }; a = raf(step); } }); render(); };
  H.arc = el => { el.classList.add('ix-arc'); const icons = ['<path d="M5 12.5l4.5 4.5L19 7.5"/>', '<path d="M12 15V4M8 7.5L12 4l4 3.5"/><path d="M6 11v8.5h12V11"/>', '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"/>'];
    el.innerHTML = icons.map(p => `<button class="sub"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${p}</svg></button>`).join('') + '<button class="ix-btn" aria-label="更多"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button>';
    const subs = $$('.sub', el), R = 84; const set = open => { el.classList.toggle('open', open); subs.forEach((s, i) => { const ang = (-90 - i * 45) * Math.PI / 180; s.style.transitionDelay = (open ? i * 40 : (2 - i) * 30) + 'ms'; s.style.transform = open ? `translate(${Math.cos(ang) * R}px,${Math.sin(ang) * R}px)` : 'none'; }); };
    let timer; const main = $('.ix-btn', el);
    main.addEventListener('pointerdown', () => { timer = setTimeout(() => set(true), 260); }); main.addEventListener('click', () => { clearTimeout(timer); set(!el.classList.contains('open')); });
    el.addEventListener('pointermove', e => { if (!el.classList.contains('open')) return; subs.forEach(s => { const r = s.getBoundingClientRect(); const hit = Math.hypot(e.clientX - r.left - 22, e.clientY - r.top - 22) < 30; s.classList.toggle('hot', hit); s.style.scale = hit ? '1.15' : ''; }); });
    subs.forEach(s => s.onclick = () => { IX.toast('已执行操作'); set(false); }); };

  /* ---------- 5 弹窗与面板 ---------- */
  function sheet(el) { // 下拖位移 > 1/3 高度 或 速度 > 0.55px/ms 关闭
    if (el._sheet) return el._sheet; el.classList.add('ix-sheet'); if (!$('.grab', el)) el.insertAdjacentHTML('afterbegin', '<div class="grab"></div>');
    const scrim = document.createElement('div'); scrim.className = 'ix-scrim'; const api = {
      open() { document.body.append(scrim, el); el.hidden = false; scrim.style.display = ''; raf2(() => { scrim.classList.add('on'); el.classList.add('on'); }); },
      close() { scrim.classList.remove('on'); el.classList.remove('on'); el.style.transform = ''; setTimeout(() => { scrim.style.display = 'none'; }, 420); } };
    scrim.onclick = api.close; drag(el, { axis: 'y', filter: e => !e.target.closest('.ix-slide, input, textarea, [data-nodrag]'), start: () => el.classList.add('drag'), move: (dx, dy) => { el.style.transform = `translateY(${dy > 0 ? dy : dy * .2}px)`; },
      end: (dx, dy, vx, vy) => { el.classList.remove('drag'); if (dy > el.offsetHeight / 3 || vy > .55) api.close(); else el.style.transform = ''; } });
    $$('[data-close]', el).forEach(b => b.onclick = api.close); return (el._sheet = api); }
  H.sheet = el => { const s = sheet($(el.dataset.target)); el.addEventListener('click', () => s.open()); };
  H.pop = el => { const pop = $(el.dataset.target); pop.classList.add('ix-pop'); pop.hidden = true; document.body.appendChild(pop); let scrim;
    const close = () => { pop.classList.remove('on'); scrim && scrim.remove(); setTimeout(() => pop.hidden = true, 300); };
    el.addEventListener('click', () => { const r = el.getBoundingClientRect(); pop.hidden = false; const top = r.bottom + 8, left = Math.min(innerWidth - 228, Math.max(8, r.left + r.width / 2 - 110)); pop.style.top = top + 'px'; pop.style.left = left + 'px';
      pop.style.transformOrigin = `${r.left + r.width / 2 - left}px -8px`; scrim = document.createElement('div'); scrim.style.cssText = 'position:fixed;inset:0;z-index:900'; scrim.onclick = close; document.body.appendChild(scrim); raf2(() => pop.classList.add('on')); });
    $$('button', pop).forEach(b => b.addEventListener('click', close)); };
  H.search = el => { el.classList.add('ix-search'); el.innerHTML = '<button aria-label="搜索"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/></svg></button><input placeholder="搜索商品、店铺" tabindex="-1">'; const inp = $('input', el);
    $('button', el).onclick = () => { el.classList.toggle('on'); if (el.classList.contains('on')) setTimeout(() => inp.focus(), 300); else inp.blur(); }; };
  H.glass = el => { el.classList.add('ix-glass-stage'); el.innerHTML = '<div class="ix-glass">' + Array.from({ length: 8 }, (_, i) => `<div style="--i:${i}"></div>`).join('') + '</div>'; const g = $('.ix-glass', el); el.onclick = () => g.classList.toggle('on'); setTimeout(() => g.classList.add('on'), 400); };

  /* ---------- 6 提示与通知 ---------- */
  function toast(text, { undo, duration = 3000 } = {}) { // 新提示到来，旧提示被推上去；撤销条带可见倒计时
    let box = $('.ix-toasts'); if (!box) { box = document.createElement('div'); box.className = 'ix-toasts'; box.setAttribute('role', 'status'); document.body.appendChild(box); }
    const t = document.createElement('div'); t.className = 'ix-toast'; t.innerHTML = '<span></span>' + (undo ? '<button>撤销</button><i class="bar"></i>' : ''); $('span', t).textContent = String(text); box.prepend(t);
    while (box.children.length > 3) box.lastChild.remove();
    const kill = () => { t.classList.add('out'); setTimeout(() => t.remove(), 300); };
    if (undo) { $('.bar', t).animate([{ transform: 'scaleX(1)' }, { transform: 'scaleX(0)' }], { duration, easing: 'linear', fill: 'forwards' }); $('button', t).onclick = () => { undo(); kill(); toast('已撤销'); }; }
    setTimeout(kill, duration); return t; }
  H.toast = el => el.addEventListener('click', () => toast(el.dataset.text || '已保存到收藏', { undo: el.hasAttribute('data-undo') ? () => {} : null }));
  H.banner = el => { el.classList.add('ix-banner-wrap'); el.onclick = () => { el.classList.add('on'); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('on'), 2400); }; };
  H.dot = el => { el.style.position = 'relative'; const d = document.createElement('i'); d.className = 'ix-dot'; el.appendChild(d); el.addEventListener('click', () => { d.classList.toggle('gone'); }); };
  H.chain = el => { // 红点连锁：点条目 → 条目/分组/Tab 角标同步减少
    const items = $$('[data-unread]', el), group = $('[data-group-badge]', el), tab = $('[data-tab-badge]', el);
    const sum = () => items.reduce((s, i) => s + (+i.dataset.unread), 0); const upd = () => { const n = sum(); [group, tab].forEach(b => { if (!b) return; if (n) { b.classList.remove('gone'); slot($('span', b) || b, n); } else b.classList.add('gone'); }); };
    items.forEach(i => { const b = $('.ix-badge', i); i.onclick = () => { if (!+i.dataset.unread) return; i.dataset.unread = 0; b && b.classList.add('gone'); upd(); }; }); upd(); };

  /* ---------- 7 转场与滚动 ---------- */
  H.shared = el => { $$(':scope > div', el).forEach(tile => tile.addEventListener('click', () => { // FLIP 共享元素：先钉在小图位置，下一帧放开
    const r = tile.getBoundingClientRect(), big = document.createElement('div'); big.className = 'ix-shared-big'; big.style.background = getComputedStyle(tile).background; Object.assign(big.style, { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px', transition: 'none' });
    const scrim = document.createElement('div'); scrim.className = 'ix-scrim'; document.body.append(scrim, big); tile.style.visibility = 'hidden';
    raf2(() => { scrim.classList.add('on'); const w = Math.min(innerWidth - 32, 520), h = w * .75; Object.assign(big.style, { transition: '', left: (innerWidth - w) / 2 + 'px', top: (innerHeight - h) / 2 + 'px', width: w + 'px', height: h + 'px' }); });
    const close = () => { const r2 = tile.getBoundingClientRect(); Object.assign(big.style, { left: r2.left + 'px', top: r2.top + 'px', width: r2.width + 'px', height: r2.height + 'px' }); scrim.classList.remove('on'); setTimeout(() => { big.remove(); scrim.remove(); tile.style.visibility = ''; }, 460); };
    big.onclick = scrim.onclick = close; })); };
  H.largetitle = el => { el.classList.add('ix-largetitle'); const h2 = $('h2', el), small = $('header .small', el); // 所有属性挂在同一个进度 p 上
    const on = () => { const p = Math.min(el.scrollTop / 46, 1); h2.style.transform = `translate(${p * ((el.clientWidth - h2.scrollWidth * .5) / 2 - 16)}px, ${-p * 6}px) scale(${1 - p * .5})`; h2.style.opacity = 1 - p; if (small) small.style.opacity = p; $('header', el).style.boxShadow = p >= 1 ? '0 1px 0 var(--color-line)' : 'none'; };
    el.addEventListener('scroll', on, { passive: true }); on(); };
  H.tabs = el => { el.classList.add('ix-tabs'); const ind = document.createElement('span'); ind.className = 'ind'; el.prepend(ind); const btns = $$('button', el); let cur = btns.find(b => b.classList.contains('on')) || btns[0];
    const place = b => { ind.style.transform = `translateX(${b.offsetLeft}px)`; ind.style.width = b.offsetWidth + 'px'; };
    const go = b => { const a = cur, right = b.offsetLeft > a.offsetLeft; const L = Math.min(a.offsetLeft, b.offsetLeft), W = Math.max(a.offsetLeft + a.offsetWidth, b.offsetLeft + b.offsetWidth) - L; // 前沿先冲出拉长，后沿再跟上
      ind.animate([{ transform: `translateX(${a.offsetLeft}px)`, width: a.offsetWidth + 'px' }, { transform: `translateX(${right ? a.offsetLeft : L}px)`, width: W + 'px', offset: .45 }, { transform: `translateX(${b.offsetLeft}px)`, width: b.offsetWidth + 'px' }], { duration: reduce() ? 1 : 420, easing: 'cubic-bezier(.22,1,.36,1)' });
      place(b); btns.forEach(x => x.classList.toggle('on', x === b)); cur = b; };
    btns.forEach(b => b.addEventListener('click', () => go(b))); raf(() => place(cur)); };
  H.category = el => { el.classList.add('ix-cat'); const list = $('.list', el), navs = $$('nav button', el), heads = $$('h4', list); let lock = false;
    navs.forEach((b, i) => b.onclick = () => { lock = true; navs.forEach(x => x.classList.toggle('on', x === b)); list.scrollTo({ top: heads[i].offsetTop, behavior: reduce() ? 'auto' : 'smooth' }); clearTimeout(el._l); el._l = setTimeout(() => lock = false, 600); });
    list.addEventListener('scroll', () => { if (lock) return; let k = 0; heads.forEach((h, i) => { if (h.offsetTop - list.scrollTop <= 8) k = i; }); navs.forEach((x, i) => x.classList.toggle('on', i === k)); }, { passive: true }); };
  H.fly = el => el.addEventListener('click', e => { const to = $(el.dataset.to); if (!to) return; const a = el.getBoundingClientRect(), b = to.getBoundingClientRect(); // X linear + Y ease-out(先上抛) = 抛物线
    const outer = document.createElement('div'), inner = document.createElement('i'); outer.className = 'ix-flyer'; outer.style.left = a.left + a.width / 2 + 'px'; outer.style.top = a.top + a.height / 2 + 'px'; outer.appendChild(inner); document.body.appendChild(outer);
    const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
    outer.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${dx}px)` }], { duration: 620, easing: 'linear', fill: 'forwards' });
    inner.animate([{ transform: 'translateY(0) scale(1)' }, { transform: `translateY(${Math.min(dy, 0) - 80}px) scale(.9)`, offset: .35, easing: 'cubic-bezier(.33,0,.67,1)' }, { transform: `translateY(${dy}px) scale(.5)` }], { duration: 620, easing: 'cubic-bezier(.5,0,.75,0)', fill: 'forwards' }).onfinish = () => { outer.remove(); to.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }], { duration: 360, easing: 'cubic-bezier(.34,1.56,.64,1)' }); const s = $('.ix-slot', to) || to.querySelector('[data-count]'); if (s) slot(s, (+s.dataset.value || 0) + 1); }; });
  H.push = el => { el.classList.add('ix-push-stage'); el.addEventListener('click', e => { if (e.target.closest('[data-back]')) el.classList.remove('on'); else if (e.target.closest('[data-go]')) el.classList.add('on'); }); };

  const list = { '按钮与反馈': ['press', 'physical', 'ripple', 'burst', 'success', 'tristate', 'stepper', 'hold', 'slide', 'morph', 'switch', 'split'], '数字与文字': ['countup', 'slot', 'badge', 'titleswap'],
    '卡片与列表': ['swipe', 'flip', 'fan', 'expand', 'layout', 'filter', 'stagger', 'skeleton', 'coupon'], '手势与控件': ['ptr', 'compare', 'ruler', 'arc'], '弹窗与面板': ['sheet', 'pop', 'search', 'glass'],
    '提示与通知': ['toast', 'banner', 'dot', 'chain'], '转场与滚动': ['shared', 'largetitle', 'tabs', 'category', 'fly', 'push'], '高级布局(CSS)': ['ix-asym', 'ix-offset', 'ix-layer', 'ix-blocks'] };
  function init(root = document) { for (let pass = 0; pass < 5; pass++) { const todo = $$('[data-ix]', root).filter(el => !el._ix); if (!todo.length) break; todo.forEach(el => { if (el._ix || !el.isConnected) return; el._ix = 1; el.dataset.ix.split(/\s+/).forEach(n => { if (H[n]) { try { H[n](el); } catch (err) { console.error('[IX] ' + n, err); } } else console.warn('[IX] 未知交互: ' + n); }); }); } }
  window.IX = { init, toast, sheet, countUp, slot, burst, flip, drag, list, handlers: H };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init()); else init();
})();
