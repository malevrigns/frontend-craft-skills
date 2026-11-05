"""Optional local Chromium inspection. Use as evidence, not as proof of customer comprehension."""
from pathlib import Path
import json
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
folder=root/'examples/attention-contract'
html=(folder/'index.html').read_text(encoding='utf8')
results=[]
with sync_playwright() as pw:
    browser=pw.chromium.launch(executable_path='/usr/bin/chromium', headless=True, args=['--no-sandbox'])
    for w,h in [(1440,900),(768,1024),(390,844),(320,640),(390,667)]:
        p=browser.new_page(viewport={'width':w,'height':h})
        p.set_content(html,wait_until='load')
        initial=p.evaluate('''() => ({
          overflow: document.documentElement.scrollWidth>innerWidth,
          anchorInFirstView: document.querySelector('#trail-demo').getBoundingClientRect().top<innerHeight,
          ctaInFirstView: document.querySelector('#hero-cta').getBoundingClientRect().bottom<=innerHeight,
          titleVisible: document.querySelector('#hero-title').getBoundingClientRect().bottom<innerHeight
        })''')
        assert all(not v if k=='overflow' else v for k,v in initial.items()), (w,h,initial)
        p.locator('[data-source="1"]').click()
        assert p.locator('[data-source="1"]').get_attribute('aria-pressed')=='true'
        assert '比较不同文献' in p.locator('#source-detail').inner_text()
        p.locator('#hero-cta').click()
        assert p.locator('#trail-demo').evaluate('(el)=> el.classList.contains("demo-focused")')
        p.close()
        results.append({'width':w,'height':h,'overflow':False,'anchorInFirstView':True,'ctaInFirstView':True,'sourceStateUpdate':'passed','ctaFocus':'passed','testEngine':'Chromium local via page.set_content'})
    reduced=browser.new_page(reduced_motion='reduce',viewport={'width':390,'height':844})
    reduced.set_content(html)
    assert reduced.evaluate('matchMedia("(prefers-reduced-motion: reduce)").matches')
    assert reduced.locator('#hero-title').is_visible()
    reduced.close()
    nojs=browser.new_page(java_script_enabled=False,viewport={'width':390,'height':844})
    nojs.set_content(html)
    assert nojs.locator('#hero-title').is_visible() and nojs.locator('#hero-cta').is_visible()
    nojs.close()
    browser.close()
(folder/'browser-results.json').write_text(json.dumps({'results':results,'reducedMotion':'passed','jsDisabledContent':'passed','disclaimer':'not a user attention or conversion study'},ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps({'status':'PASS','viewports':len(results),'reducedMotion':'PASS','noJs':'PASS'},ensure_ascii=False))
