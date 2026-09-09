/* Build objectives.html — the syllabus and nothing else.
 *
 * The full study guide carries figures, 129 questions and 81 cards, which is a lot to
 * face when all you want is the list of what you have to learn. This emits just the 32
 * objectives as a tickable checklist, generated from src/content.js so the two can
 * never drift apart.
 *
 *     node tools/build_objectives.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(ROOT, 'src/content.js'), 'utf8');
const { MODULES, OBJECTIVES } = eval(source + ';({MODULES, OBJECTIVES})');

const esc = (t) => String(t).replace(/[&<>"]/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const sections = MODULES.map((m) => {
  const objectives = OBJECTIVES.filter((o) => o.module === m.id);
  const rows = objectives.map((o) => `
      <li class="obj${o.highYield ? ' hy' : ''}">
        <label>
          <input type="checkbox" data-id="${o.id}">
          <span class="num">${m.num}.${o.num}</span>
          <span class="text">${esc(o.text)}</span>
          ${o.highYield ? '<span class="tag">high yield</span>' : ''}
        </label>
      </li>`).join('');
  return `
    <section class="mod" data-mod="${m.id}">
      <h2><span class="mnum">Module ${m.num}</span>${esc(m.title)}
        <span class="mcount" data-count="${m.id}">0/${objectives.length}</span>
      </h2>
      <ol class="objs">${rows}
      </ol>
    </section>`;
}).join('');

const highYield = OBJECTIVES.filter((o) => o.highYield).length;

const page = `<title>The 32 Objectives</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&family=IBM+Plex+Sans:wght@400;500&family=Newsreader:opsz,wght@6..72,600&display=swap">
<style>
:root{
  --paper:#f6f5f8; --surface:#fff; --ink:#1c1a26; --ink-2:#4a4658; --ink-3:#736e85;
  --line:#ddd9e6; --line-2:#c9c4d8; --hema:#3e3a70; --hema-soft:#eae7f5; --eosin:#c4547a;
  --eosin-soft:#fbeef2; --done:#2f7d5c;
  --sans:"IBM Plex Sans",ui-sans-serif,system-ui,-apple-system,sans-serif;
  --serif:"Newsreader",ui-serif,Georgia,serif;
  --mono:"IBM Plex Mono",ui-monospace,Menlo,Consolas,monospace;
}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
  --paper:#131220; --surface:#1c1a2b; --ink:#eae7f2; --ink-2:#b6b1c7; --ink-3:#8a849e;
  --line:#322e44; --line-2:#423d59; --hema:#a79fe0; --hema-soft:#262242; --eosin:#e890aa;
  --eosin-soft:#38222d; --done:#5bb98c;
}}
:root[data-theme="dark"]{
  --paper:#131220; --surface:#1c1a2b; --ink:#eae7f2; --ink-2:#b6b1c7; --ink-3:#8a849e;
  --line:#322e44; --line-2:#423d59; --hema:#a79fe0; --hema-soft:#262242; --eosin:#e890aa;
  --eosin-soft:#38222d; --done:#5bb98c;
}
*{box-sizing:border-box}
body{margin:0;background:var(--paper);color:var(--ink);font-family:var(--sans);
  font-size:15px;line-height:1.5;-webkit-font-smoothing:antialiased}
.wrap{max-width:720px;margin:0 auto;padding:34px 22px 70px}
header{margin-bottom:22px}
h1{font-family:var(--serif);font-size:29px;font-weight:600;margin:0;letter-spacing:-.015em}
.sub{color:var(--ink-2);margin-top:6px}
.bar{display:flex;flex-wrap:wrap;gap:9px;align-items:center;margin:18px 0 4px;
  position:sticky;top:0;background:var(--paper);padding:10px 0;z-index:5;
  border-bottom:1px solid var(--line)}
.tally{font-family:var(--mono);font-size:13px;color:var(--ink-3);font-variant-numeric:tabular-nums;margin-right:auto}
.tally b{color:var(--ink);font-size:16px}
button{font:inherit;color:inherit;cursor:pointer;border:1px solid var(--line-2);
  background:var(--surface);border-radius:8px;padding:6px 11px;font-size:13px}
button:hover{background:var(--hema-soft)}
button[aria-pressed="true"]{background:var(--hema);border-color:var(--hema);color:#fff}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) button[aria-pressed="true"]{color:#17152a}}
:root[data-theme="dark"] button[aria-pressed="true"]{color:#17152a}
:focus-visible{outline:2px solid var(--hema);outline-offset:2px}
.mod{margin-top:26px}
.mod h2{font-family:var(--serif);font-size:17px;font-weight:600;margin:0 0 8px;
  display:flex;align-items:baseline;gap:9px;padding-bottom:7px;border-bottom:1px solid var(--line)}
.mnum{font-family:var(--mono);font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;
  color:var(--ink-3);font-weight:500}
.mcount{margin-left:auto;font-family:var(--mono);font-size:11.5px;color:var(--ink-3);
  font-variant-numeric:tabular-nums;font-weight:400}
.objs{list-style:none;margin:0;padding:0}
.obj{border-bottom:1px solid var(--line)}
.obj:last-child{border-bottom:0}
.obj label{display:flex;gap:11px;align-items:baseline;padding:11px 6px;cursor:pointer;border-radius:6px}
.obj label:hover{background:var(--surface)}
.obj input{margin:0;width:16px;height:16px;flex:none;accent-color:var(--hema);
  position:relative;top:2px;cursor:pointer}
.num{font-family:var(--mono);font-size:11px;color:var(--ink-3);flex:none;
  min-width:26px;font-variant-numeric:tabular-nums}
.text{flex:1}
.tag{font-family:var(--mono);font-size:9.5px;letter-spacing:.07em;text-transform:uppercase;
  background:var(--eosin-soft);color:var(--eosin);padding:2px 6px;border-radius:4px;
  flex:none;align-self:center}
.obj.checked .text{color:var(--ink-3);text-decoration:line-through;
  text-decoration-color:var(--line-2)}
.obj.checked .num{color:var(--done)}
body.hyonly .obj:not(.hy){display:none}
footer{margin-top:30px;color:var(--ink-3);font-size:12.5px;border-top:1px solid var(--line);padding-top:14px}
@media print{
  .bar,footer{display:none}
  body{background:#fff;color:#000;font-size:11pt}
  .wrap{max-width:none;padding:0}
  .obj label:hover{background:none}
  .mod{break-inside:avoid}
}
</style>

<div class="wrap">
  <header>
    <h1>The 32 Objectives</h1>
    <p class="sub">Everything the five lecture decks say you have to learn — the list, and nothing else.
    ${highYield} of them are also covered by the high-yield guide.</p>
  </header>

  <div class="bar">
    <span class="tally"><b id="done">0</b> / ${OBJECTIVES.length} ticked</span>
    <button id="hy" aria-pressed="false">High-yield only</button>
    <button id="clear">Clear</button>
    <button id="print">Print</button>
  </div>

  ${sections}

  <footer>Ticks are saved in this browser. Module numbering follows each deck's own
  LEARNING OBJECTIVES slide.</footer>
</div>

<script>
(function(){
  var KEY='trunk-objectives-ticked-v1';
  var boxes=[].slice.call(document.querySelectorAll('input[type=checkbox]'));
  var state={};
  try{ state=JSON.parse(localStorage.getItem(KEY)||'{}'); }catch(e){ state={}; }

  function paint(){
    var total=0;
    boxes.forEach(function(b){
      var on=!!state[b.dataset.id];
      b.checked=on;
      b.closest('.obj').classList.toggle('checked',on);
      if(on) total++;
    });
    document.getElementById('done').textContent=total;
    [].forEach.call(document.querySelectorAll('[data-count]'),function(el){
      var mod=el.getAttribute('data-count');
      var inMod=boxes.filter(function(b){ return b.dataset.id.indexOf(mod+'-')===0; });
      var n=inMod.filter(function(b){ return state[b.dataset.id]; }).length;
      el.textContent=n+'/'+inMod.length;
    });
    try{ localStorage.setItem(KEY,JSON.stringify(state)); }catch(e){}
  }

  boxes.forEach(function(b){
    b.addEventListener('change',function(){
      if(b.checked) state[b.dataset.id]=1; else delete state[b.dataset.id];
      paint();
    });
  });

  document.getElementById('hy').addEventListener('click',function(){
    var on=this.getAttribute('aria-pressed')==='true';
    this.setAttribute('aria-pressed',String(!on));
    document.body.classList.toggle('hyonly',!on);
  });
  document.getElementById('clear').addEventListener('click',function(){
    if(!confirm('Clear every tick?')) return;
    state={}; paint();
  });
  document.getElementById('print').addEventListener('click',function(){ window.print(); });

  paint();
})();
</script>
`;

fs.writeFileSync(path.join(ROOT, 'objectives.html'), page);
console.log('objectives.html  ' + Math.round(page.length / 1024) + ' KB  (' +
  OBJECTIVES.length + ' objectives, ' + highYield + ' high-yield)');
