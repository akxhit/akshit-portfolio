import { readFile, writeFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import postcss from 'postcss';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const html = await read('homepage/index.html');
const match = html.match(
  /<footer class="footer closing"[^>]*>([\s\S]*?)<\/footer>/,
);
if (!match) throw new Error('Homepage closing footer missing');
const context = { window: {} };
runInNewContext(await read('homepage/content.js'), context);
const { email, socials, footer } = context.window.SITE;
const css = postcss.parse(await read('homepage/gallery-footer.css'));
css.walkRules((rule) => {
  rule.selectors = rule.selectors.filter(selector => !selector.includes('.card'));
  if (!rule.selectors.length) {
    rule.remove();
    return;
  }
  rule.selectors = rule.selectors.map((selector) => {
    if (selector.startsWith('.footer.closing'))
      return selector.replace(
        '.footer.closing',
        '.portfolio-case-footer.footer.closing',
      );
    if (/^\.closing(?=[ .:#])/.test(selector))
      return selector.replace(/^\.closing/, '.portfolio-case-footer.closing');
    return '.portfolio-case-footer ' + selector;
  });
});
const reset = `
@import url('https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
.portfolio-case-footer.footer.closing {--font-ui:Inter,Arial,sans-serif;font-family:'Schibsted Grotesk',Arial,sans-serif;max-width:none;margin:0;border-radius:0;position:relative;text-align:left}
.portfolio-case-footer *, .portfolio-case-footer *::before, .portfolio-case-footer *::after {box-sizing:border-box}
.portfolio-case-footer :is(h2,p){margin:0;padding:0}
.portfolio-case-footer a {text-decoration:none}
.portfolio-case-footer button {font:inherit;text-transform:none;box-shadow:none}
`;
await writeFile(
  new URL('public/shared/homepage-footer.css', root),
  reset + css.toString(),
);
const runtime = `/* Generated from the homepage footer by scripts/build-case-footer.mjs. */
(function(){
const host=document.querySelector('.portfolio-case-footer');
if(!host || host.dataset.homeFooter) return;
host.dataset.homeFooter='true';host.classList.add('footer','closing');
host.innerHTML=${JSON.stringify(match[1])};
const data=${JSON.stringify({ email, socials, footer })};
const q=s=>host.querySelector(s);
q('#footer-email').href='mailto:'+data.email;q('#footer-email-address').textContent=data.email;
q('#place').textContent=data.footer.location;q('#copyright').textContent=data.footer.copyright;
for(const item of data.socials){const a=document.createElement('a');a.className='closing-social';a.href=item.url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=item.name+' ↗';q('#footer-socials').appendChild(a);}
const tick=()=>{q('#clock').textContent=new Intl.DateTimeFormat('en-US',{hour:'2-digit',minute:'2-digit',hour12:true,timeZone:data.footer.timeZone||'Asia/Kolkata'}).format(new Date());};
tick();let timer=setInterval(tick,30000);addEventListener('pagehide',()=>clearInterval(timer));addEventListener('pageshow',e=>{if(e.persisted){tick();timer=setInterval(tick,30000);}});
q('.closing-top').addEventListener('click',()=>{const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;if(window.__lenis)window.__lenis.scrollTo(0,{immediate:reduced});else window.scrollTo({top:0,behavior:reduced?'instant':'smooth'});});
})();
`;
const ascii = (await read('homepage/ascii-footer.js')).replace(
  "document.querySelector('.ascii-signature')",
  "document.querySelector('.portfolio-case-footer .ascii-signature')",
);
await writeFile(
  new URL('public/shared/homepage-footer.js', root),
  runtime + ascii,
);
