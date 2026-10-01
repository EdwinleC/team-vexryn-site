const boot=document.getElementById('boot'),enter=document.getElementById('enterBtn'),nav=document.getElementById('nav');
enter.onclick=()=>{boot.classList.add('hide');sessionStorage.setItem('vexryn-entered','1')};
if(sessionStorage.getItem('vexryn-entered'))boot.classList.add('hide');
document.getElementById('menuBtn').onclick=()=>nav.classList.toggle('open');
nav.querySelectorAll('a').forEach(a=>a.onclick=()=>nav.classList.remove('open'));
const glow=document.getElementById('cursorGlow');
addEventListener('mousemove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});
const obs=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('visible')),{threshold:.1});
document.querySelectorAll('.reveal').forEach(e=>obs.observe(e));
const modal=document.getElementById('modal'),title=document.getElementById('modalTitle');
document.querySelectorAll('.tile').forEach(t=>t.onclick=()=>{title.textContent=t.dataset.title;modal.classList.add('open')});
document.getElementById('close').onclick=()=>modal.classList.remove('open');
modal.onclick=e=>{if(e.target===modal)modal.classList.remove('open')};
document.getElementById('year').textContent=new Date().getFullYear();

// ===== VEXRYN V3 CONFIG =====
// Change this when the next match is booked.
// Format: YYYY-MM-DDTHH:MM:SS+02:00
const NEXT_MATCH = "2026-10-11T20:14:00+02:00";

const playerSetups = {
  xyloo: {
    name: "XYLOO",
    gear: [
      ["MOUSE", "Logitech G Pro X2 Superstrike"],
      ["KEYBOARD", "Keychron H2 HE"],
      ["MONITOR", "AOC 310HZ"],
      ["HEADSET", "Logitech G522"],
      ["IEM", "Shure SE215"],
      ["MIC", "Fifine"],
      ["RESOLUTION", "1280 × 960"],
      ["DPI / SENS", "400 / 1.0"]
    ]
  },
  piesang: { 
    name:"PIESANG", 
    gear:[
      ["MOUSE","Corsair Harpoon RGB Wireless"],
      ["KEYBOARD","Reddragon 80%"],
      ["MONITOR","Dell S2721"],
      ["HEADSET","Logitech G733"],
      ["RESOLUTION","1280 × 960"],
      ["DPI / SENS","400 / 0.75"]
    ] 
  },
  vortexxxx: { 
    name:"VORTEXXXX", 
    gear:[
      ["MOUSE","Glorius Model O Pro"],
      ["KEYBOARD","Gamdias Hermes P3 RGB"],
      ["MONITOR","Dell SE2416H"],
      ["HEADSET","Skullcandy Evo"],
      ["RESOLUTION","1280 × 960"],
      ["DPI / SENS","800 / 0.7"]
    ] 
  },
  madkmc: { 
    name:"MADKMC-", 
    gear:[
      ["MOUSE","Logitech G502 HERO"],
      ["KEYBOARD","Steelseries Apex 100"],
      ["MONITOR","Viewsonic VX2458 144HZ"],
      ["HEADSET","Steelseries Arctis 7P+"],
      ["RESOLUTION","1920x1080"],
      ["DPI / SENS","1600/1.00"]
    ] 
  },
  an4vr1n: { 
    name:"AN4VR1N", 
    gear:[
      ["MOUSE","Steelseries Rival 3"],
      ["KEYBOARD","Logitech G213"],
      ["MONITOR","DELL SE2426HG 240HZ"],
      ["HEADSET","Logitech G733"],
      ["RESOLUTION","1920x1080"],
      ["DPI / SENS","700/1.0"]
    ] 
  }
};

function updateCountdown(){
  const diff = new Date(NEXT_MATCH).getTime() - Date.now();
  if(diff <= 0){
    document.getElementById("countdownStatus").textContent = "OPERATION WINDOW OPEN";
    ["days","hours","minutes","seconds"].forEach(id=>document.getElementById(id).textContent="00");
    return;
  }
  const d=Math.floor(diff/86400000), h=Math.floor(diff/3600000)%24, m=Math.floor(diff/60000)%60, s=Math.floor(diff/1000)%60;
  document.getElementById("days").textContent=String(d).padStart(2,"0");
  document.getElementById("hours").textContent=String(h).padStart(2,"0");
  document.getElementById("minutes").textContent=String(m).padStart(2,"0");
  document.getElementById("seconds").textContent=String(s).padStart(2,"0");
  document.getElementById("countdownStatus").textContent="COUNTDOWN ACTIVE";
}
updateCountdown(); setInterval(updateCountdown,1000);

function renderSetup(key){
  const p=playerSetups[key], grid=document.getElementById("gearGrid");
  document.getElementById("setupPlayer").textContent=p.name+" // LOADOUT";
  grid.innerHTML=p.gear.map(([label,value])=>`<div class="gear"><small>${label}</small><strong>${value}</strong></div>`).join("");
}
renderSetup("xyloo");
document.querySelectorAll("#setupTabs button").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll("#setupTabs button").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active"); renderSetup(btn.dataset.player);
}));

const vexCursor=document.getElementById("vexCursor");
addEventListener("mousemove",e=>{vexCursor.style.left=e.clientX+"px";vexCursor.style.top=e.clientY+"px"});
document.querySelectorAll("a,button,.player,.highlight").forEach(el=>{
  el.addEventListener("mouseenter",()=>vexCursor.classList.add("hover"));
  el.addEventListener("mouseleave",()=>vexCursor.classList.remove("hover"));
});

// Subtle random electrical pulse. Purely visual.
const lightning=document.getElementById("lightning");
function scheduleLightning(){
  const wait=7000+Math.random()*13000;
  setTimeout(()=>{lightning.classList.remove("flash"); void lightning.offsetWidth; lightning.classList.add("flash"); scheduleLightning()},wait);
}
scheduleLightning();
