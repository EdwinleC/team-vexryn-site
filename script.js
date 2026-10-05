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

const playerProfiles = {
  xyloo: {
    name: "XYLOO",
    number: "18",
    role: "RIFLER // SOUTH AFRICA",
    image: "assets/Edwin.png"
  },

  piesang: {
    name: "PIESANG",
    number: "02",
    role: "PLAYER // SOUTH AFRICA",
    image: "assets/Gavin.png"
  },

  vortexxxx: {
    name: "VORTEXXXX",
    number: "03",
    role: "PLAYER // SOUTH AFRICA",
    image: "assets/Xavier.png"
  },

  madkmc: {
    name: "MADKMC-",
    number: "04",
    role: "PLAYER // SOUTH AFRICA",
    image: "assets/Kaylen.png"
  },

  an4vr1n: {
    name: "AN4VR1N",
    number: "05",
    role: "PLAYER // SOUTH AFRICA",
    image: "assets/Tiaan.png"
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

// ===== LEETIFY API =====

const LEETIFY_API = "https://api-public.cs-prod.leetify.com/v3/profile";

const vexrynPlayers = [
  {
    key: "xyloo",
    steamId: "76561198998256189"
  },
  {
    key: "piesang",
    steamId: "76561199778733993"
  },
  {
    key: "vortexxxx",
    steamId: "76561198026210094"
  },
  {
    key: "madkmc",
    steamId: "76561198311851014"
  },
  {
    key: "an4vr1n",
    steamId: "76561198019298244"
  }
];

const LEETIFY_CACHE_KEY = "vexryn-leetify-stats";
const LEETIFY_CACHE_TIME = 30 * 60 * 1000; // 30 minutes

function displayLeetifyPlayer(key, data) {
  document.getElementById(`${key}-leetify`).textContent =
    data.ranks?.leetify != null
      ? data.ranks.leetify.toFixed(2)
      : "—";

  document.getElementById(`${key}-winrate`).textContent =
    data.winrate != null
      ? `${(data.winrate * 100).toFixed(1)}%`
      : "—";

  document.getElementById(`${key}-aim`).textContent =
    data.rating?.aim != null
      ? data.rating.aim.toFixed(1)
      : "—";

  document.getElementById(`${key}-premier`).textContent =
    data.ranks?.premier != null
      ? data.ranks.premier.toLocaleString()
      : "—";
}

async function loadVexrynStats() {

  const cached = localStorage.getItem(LEETIFY_CACHE_KEY);

  if (cached) {
    try {
      const cache = JSON.parse(cached);

      if (Date.now() - cache.timestamp < LEETIFY_CACHE_TIME) {

        console.log("VEXRYN // Loading Leetify stats from cache");

        Object.entries(cache.players).forEach(([key, data]) => {
          displayLeetifyPlayer(key, data);
        });

        return;
      }
    } catch (error) {
      console.warn("VEXRYN // Invalid Leetify cache");
    }
  }

  console.log("VEXRYN // Fetching fresh Leetify stats");

  const players = {};

  for (const player of vexrynPlayers) {

    try {

      const response = await fetch(
        `${LEETIFY_API}?steam64_id=${player.steamId}`
      );

      if (!response.ok) {
        console.warn(
          `VEXRYN // ${player.key} returned ${response.status}`
        );

        continue;
      }

      const data = await response.json();

      players[player.key] = data;

      displayLeetifyPlayer(player.key, data);

      console.log(`VEXRYN // ${player.key} loaded`);

    } catch (error) {

      console.error(
        `VEXRYN // Failed to load ${player.key}`,
        error
      );

    }

    // Don't hammer Leetify
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  if (Object.keys(players).length > 0) {

    localStorage.setItem(
      LEETIFY_CACHE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        players
      })
    );

  }
}

loadVexrynStats();



loadVexrynStats();

// ===== PLAYER DOSSIER =====

const playerModal = document.getElementById("playerModal");
const playerModalClose = document.getElementById("playerModalClose");

function openPlayerProfile(key) {

  const player = playerProfiles[key];
  const setup = playerSetups[key];

  if (!player) return;

  document.getElementById("profileName").textContent = player.name;
  document.getElementById("profileNumber").textContent = `#${player.number}`;
  document.getElementById("profileRole").textContent = player.role;

  const image = document.getElementById("profileImage");
  image.src = player.image;
  image.alt = player.name;

  // Reuse the Leetify stats already displayed in the leaderboard
  document.getElementById("profileLeetify").textContent =
    document.getElementById(`${key}-leetify`)?.textContent || "—";

  document.getElementById("profileWinrate").textContent =
    document.getElementById(`${key}-winrate`)?.textContent || "—";

  document.getElementById("profileAim").textContent =
    document.getElementById(`${key}-aim`)?.textContent || "—";

  document.getElementById("profilePremier").textContent =
    document.getElementById(`${key}-premier`)?.textContent || "—";

  // Load player hardware
  const gearContainer = document.getElementById("profileGear");

  gearContainer.innerHTML = setup
    ? setup.gear.map(([label, value]) => `
        <div class="profile-gear-item">
          <small>${label}</small>
          <strong>${value}</strong>
        </div>
      `).join("")
    : "";

  playerModal.classList.add("open");

  document.body.style.overflow = "hidden";
}

function closePlayerProfile() {
  playerModal.classList.remove("open");
  document.body.style.overflow = "";
}

document.querySelectorAll(".player[data-player]").forEach(card => {

  card.addEventListener("click", () => {
    openPlayerProfile(card.dataset.player);
  });

});

playerModalClose.addEventListener("click", closePlayerProfile);

playerModal.addEventListener("click", event => {
  if (event.target === playerModal) {
    closePlayerProfile();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closePlayerProfile();
  }
});
