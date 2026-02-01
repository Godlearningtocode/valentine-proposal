const yesBtn = document.getElementById("yesBtn");
const successMsg = document.getElementById("successMsg");
const confetti = document.getElementById("confetti");
const noBtn = document.getElementById("noBtn");
const stage = document.getElementById("stage");
const card = document.getElementById("card");

function rectsOverlap(r1, r2, padding = 8) {
  return !(
    r1.right + padding < r2.left ||
    r1.left - padding > r2.right ||
    r1.bottom + padding < r2.top ||
    r1.top - padding > r2.bottom
  );
}

function showSuccess() {
  if (!successMsg) return;
  successMsg.classList.add("is-visible");
  yesBtn?.setAttribute("aria-pressed", "true");
  fireConfetti();
}

yesBtn?.addEventListener("click", showSuccess);
yesBtn?.addEventListener("touchstart", showSuccess, { passive: true });

function placeNoButtonInitial() {
  if (!noBtn || !stage) return;
  const stageRect = stage.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();
  const yesRect = yesBtn?.getBoundingClientRect();

  const left = Math.min(
    stageRect.width - noRect.width - 24,
    (yesRect?.right ?? stageRect.width / 2) - stageRect.left + 16
  );
  const top = Math.min(
    stageRect.height - noRect.height - 24,
    (yesRect?.top ?? stageRect.height / 2) - stageRect.top
  );

  noBtn.style.left = `${Math.max(16, left)}px`;
  noBtn.style.top = `${Math.max(16, top)}px`;
}

function moveNoButtonAnywhere() {
  if (!noBtn || !stage) return;
  const stageRect = stage.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();
  const yesRect = yesBtn?.getBoundingClientRect();
  const cardRect = card?.getBoundingClientRect();
  const edgePadding = 36;
  const maxX = stageRect.width - noRect.width - edgePadding;
  const maxY = stageRect.height - noRect.height - edgePadding;
  const minX = edgePadding;
  const minY = edgePadding;

  let nextLeft = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
  let nextTop = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
  let attempts = 0;

  while (attempts < 60) {
    const candidate = {
      left: stageRect.left + nextLeft,
      right: stageRect.left + nextLeft + noRect.width,
      top: stageRect.top + nextTop,
      bottom: stageRect.top + nextTop + noRect.height,
    };

    const overlapsCard = cardRect ? rectsOverlap(candidate, cardRect, 24) : false;
    const overlapsYes = yesRect ? rectsOverlap(candidate, yesRect, 32) : false;

    if (!overlapsCard && !overlapsYes) break;

    nextLeft = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    nextTop = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    attempts += 1;
  }

  noBtn.style.left = `${nextLeft}px`;
  noBtn.style.top = `${nextTop}px`;
}

noBtn?.addEventListener("mouseenter", moveNoButtonAnywhere);
noBtn?.addEventListener("touchstart", moveNoButtonAnywhere, { passive: true });
window.addEventListener("resize", placeNoButtonInitial);

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

placeNoButtonInitial();
