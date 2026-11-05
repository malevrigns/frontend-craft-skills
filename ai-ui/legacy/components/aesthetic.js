/* AI UI 高级审美 · 行为脚本（零依赖）。引入后自动初始化，也可手动 AestheticUI.init(root)
 * .ui-nav            滚动后出现毛玻璃底色 + 链接悬停指示条跟随
 * [data-reveal]      进入视口错峰入场（同一父元素内自动设置 --i）
 * [data-magnetic]    磁吸按钮（强度 data-magnetic="0.3"）
 * [data-spotlight]   卡片情境光跟随鼠标
 * [data-tilt]        Z 轴 3D 倾斜
 * .ui-toggle         分段切换 + 滑块；配合 [data-month][data-year] 价格切换（数字滚动）
 * [data-theme-toggle] 圆形扩散换肤（View Transitions，降级为直接切换）
 * [data-validate]    输入框校验：data-validate="email|required|min:6"
 * AestheticUI.loadSkeleton(el, ms)  骨架屏 → 内容
 * AestheticUI.countTo(el, to, ms)   数字滚动（easeOutCubic）
 */
(function () {
  const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
  function countTo(el, to, ms = 700, fmt = v => Math.round(v).toLocaleString('zh-CN')) {
    const from = parseFloat((el.textContent || '0').replace(/[^\d.-]/g, '')) || 0, t0 = performance.now();
    if (reduce()) { el.textContent = fmt(to); return; }
    const step = now => { const p = Math.min(1, (now - t0) / ms); el.textContent = fmt(from + (to - from) * easeOutCubic(p)); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }
  function nav(root) {
    root.querySelectorAll('.ui-nav').forEach(n => {
      if (n._ui) return; n._ui = 1;
      const sc = n.closest('[data-scroll-root]') || window;
      const on = () => n.classList.toggle('scrolled', (sc.scrollY ?? sc.scrollTop) > 8); sc.addEventListener('scroll', on, { passive: true }); on();
      const links = n.querySelector('.links'); if (!links) return;
      const pill = document.createElement('span'); pill.className = 'pill'; links.prepend(pill);
      const move = a => { pill.style.width = a.offsetWidth + 'px'; pill.style.transform = `translateX(${a.offsetLeft}px)`; pill.style.opacity = 1; };
      links.querySelectorAll('a').forEach(a => a.addEventListener('mouseenter', () => move(a)));
      links.addEventListener('mouseleave', () => { const cur = links.querySelector('a.on'); cur ? move(cur) : (pill.style.opacity = 0); });
    });
  }
  function reveal(root) {
    const els = [...root.querySelectorAll('[data-reveal]:not(.in)')];
    els.forEach(el => { if (!el.style.getPropertyValue('--i')) { const sib = [...el.parentElement.children].filter(c => c.hasAttribute('data-reveal')); el.style.setProperty('--i', sib.indexOf(el)); } });
    if (!('IntersectionObserver' in window)) return els.forEach(e => e.classList.add('in'));
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
    els.forEach(e => io.observe(e));
  }
  function magnetic(root) {
    root.querySelectorAll('[data-magnetic]').forEach(el => {
      if (el._ui) return; el._ui = 1; const k = parseFloat(el.dataset.magnetic) || .3;
      el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * k}px,${(e.clientY - r.top - r.height / 2) * k}px)`; });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }
  function spotlight(root) {
    root.querySelectorAll('[data-spotlight]').forEach(el => { if (el._sp) return; el._sp = 1;
      el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); el.style.setProperty('--mx', e.clientX - r.left + 'px'); el.style.setProperty('--my', e.clientY - r.top + 'px'); }); });
  }
  function tilt(root) {
    root.querySelectorAll('[data-tilt]').forEach(el => { if (el._tl) return; el._tl = 1; const max = +el.dataset.tilt || 8;
      el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; el.style.transform = `perspective(900px) rotateY(${x * max}deg) rotateX(${-y * max}deg) translateZ(0)`; });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; }); });
  }
  function toggles(root) {
    root.querySelectorAll('.ui-toggle').forEach(t => {
      if (t._ui) return; t._ui = 1; const knob = document.createElement('span'); knob.className = 'knob'; t.prepend(knob);
      const btns = [...t.querySelectorAll('button')];
      const set = (b, fire) => { btns.forEach(x => x.classList.toggle('on', x === b)); knob.style.width = b.offsetWidth + 'px'; knob.style.transform = `translateX(${b.offsetLeft - 4}px)`;
        if (fire) { const key = b.dataset.value; (t.closest('[data-pricing-scope]') || document).querySelectorAll('[data-' + key + ']').forEach(el => countTo(el, +el.dataset[key], 500)); t.dispatchEvent(new CustomEvent('change', { detail: key, bubbles: true })); } };
      btns.forEach(b => b.addEventListener('click', () => set(b, true)));
      requestAnimationFrame(() => set(t.querySelector('button.on') || btns[0], false));
    });
  }
  function theme(root) {
    root.querySelectorAll('[data-theme-toggle]').forEach(b => { if (b._ui) return; b._ui = 1;
      b.addEventListener('click', e => {
        const html = document.documentElement, apply = () => html.dataset.theme = html.dataset.theme === 'dark' ? '' : 'dark';
        if (!document.startViewTransition || reduce()) return apply();
        const x = e.clientX, y = e.clientY, r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
        document.startViewTransition(apply).ready.then(() => html.animate({ clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] }, { duration: 480, easing: 'cubic-bezier(.22,1,.36,1)', pseudoElement: '::view-transition-new(root)' }));
      }); });
  }
  function validate(root) {
    const rules = { required: v => !!v.trim() || '必填', email: v => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) || '邮箱格式不对', min: (v, n) => v.length >= +n || `至少 ${n} 个字符` };
    root.querySelectorAll('[data-validate]').forEach(inp => { if (inp._ui) return; inp._ui = 1; const field = inp.closest('.ui-field'), hint = field && field.querySelector('small'), base = hint ? hint.textContent : '';
      inp.addEventListener('blur', () => { let msg = true; for (const r of inp.dataset.validate.split('|')) { const [k, a] = r.split(':'); msg = rules[k] ? rules[k](inp.value, a) : true; if (msg !== true) break; }
        field && field.classList.toggle('invalid', msg !== true); if (hint) hint.textContent = msg === true ? base : msg; }); });
  }
  function loadSkeleton(el, ms = 1200) { el.classList.remove('is-loaded'); return new Promise(r => setTimeout(() => { el.classList.add('is-loaded'); r(); }, ms)); }
  function init(root = document) { nav(root); reveal(root); magnetic(root); spotlight(root); tilt(root); toggles(root); theme(root); validate(root); }
  window.AestheticUI = { init, countTo, loadSkeleton };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init()); else init();
})();
