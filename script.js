const yesBtn = document.getElementById("yesBtn");
const successMsg = document.getElementById("successMsg");
const confetti = document.getElementById("confetti");
const noBtn = document.getElementById("noBtn");

function showSuccess() {
  if (!successMsg) return;
  successMsg.classList.add("is-visible");
  yesBtn?.setAttribute("aria-pressed", "true");
  fireConfetti();
}

yesBtn?.addEventListener("click", showSuccess);
yesBtn?.addEventListener("touchstart", showSuccess, { passive: true });

const noOffsets = [
  [-16, 0],
  [14, -6],
  [-10, 10],
  [12, 12],
  [0, -12],
];
let noOffsetIndex = 0;

function nudgeNoButton() {
  if (!noBtn) return;
  noOffsetIndex = (noOffsetIndex + 1) % noOffsets.length;
  const [x, y] = noOffsets[noOffsetIndex];
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

noBtn?.addEventListener("mouseenter", nudgeNoButton);
noBtn?.addEventListener("touchstart", nudgeNoButton, { passive: true });

function fireConfetti() {
  if (!confetti) return;
  confetti.innerHTML = "";

  const colors = ["#ff7f6e", "#ffcf5a", "#7dcfff", "#b6f7e5", "#ffd1e8"];
  const pieces = 32;

  for (let i = 0; i < pieces; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.3}s`;
    piece.style.animationDuration = `${1 + Math.random() * 0.9}s`;
    piece.style.transform = `translateY(-20px) rotate(${Math.random() * 180}deg)`;
    confetti.appendChild(piece);
  }
}
