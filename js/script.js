const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold: .12});
revealEls.forEach(el => observer.observe(el));

const hearts = document.getElementById("hearts");
function createHeart() {
  const h = document.createElement("span");
  h.className = "heart";
  h.textContent = Math.random() > .35 ? "♡" : "✦";
  h.style.left = Math.random()*100 + "vw";
  h.style.fontSize = (10 + Math.random()*18) + "px";
  h.style.animationDuration = (8 + Math.random()*7) + "s";
  hearts.appendChild(h);
  setTimeout(() => h.remove(), 16000);
}
setInterval(createHeart, 1600);

const revealBtn = document.getElementById("revealBtn");
const secret = document.getElementById("secret");
revealBtn.addEventListener("click", () => {
  secret.classList.toggle("open");
  revealBtn.innerHTML = secret.classList.contains("open")
    ? "You found it ♡" : "Open it <span>→</span>";
  if (secret.classList.contains("open")) {
    for (let i=0;i<18;i++) setTimeout(createHeart, i*80);
  }
});

const musicBtn = document.getElementById("musicBtn");
const musicText = document.getElementById("musicText");
let audio = null;
let playing = true;

musicBtn.addEventListener("click", () => {
  if (!audio) {
    audio = new Audio("music/birthday-song.mp3");
    audio.loop = true;
  }
  if (!playing) {
    audio.play().then(() => {
      playing = true;
      musicText.textContent = "Pause";
    }).catch(() => {
      musicText.textContent = "Add song";
      alert("Add your MP3 as music/birthday-song.mp3, then click Music.");
    });
  } else {
    audio.pause();
    playing = false;
    musicText.textContent = "Music";
  }
});
