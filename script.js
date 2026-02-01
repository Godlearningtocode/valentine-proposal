const noBtn = document.getElementById("noBtn");
const stage = document.getElementById("stage");
const card = document.getElementById("card");
const yesBtn = document.getElementById("yesBtn");

function rectsOverlap(r1, r2, padding = 8) {
  return !(
    r1.right + padding < r2.left ||
    r1.left - padding > r2.right ||
    r1.bottom + padding < r2.top ||
    r1.top - padding > r2.bottom
  );
}

function placeNoButtonStart() {
  const stageRect = stage.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();

  const startX = Math.min(
    stageRect.width - noRect.width - 18,
    Math.max(18, cardRect.right - stageRect.left + 24)
  );
  const startY = Math.min(
    stageRect.height - noRect.height - 18,
    Math.max(18, cardRect.bottom - stageRect.top + 18)
  );

  noBtn.style.left = `${startX}px`;
  noBtn.style.top = `${startY}px`;
}

function moveNoButton() {
  const stageRect = stage.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const yesRect = yesBtn.getBoundingClientRect();

  const maxX = stageRect.width - noRect.width - 16;
  const maxY = stageRect.height - noRect.height - 16;
  const minX = 16;
  const minY = 16;

  let attempts = 0;
  let nextLeft = noRect.left - stageRect.left;
  let nextTop = noRect.top - stageRect.top;

  while (attempts < 60) {
    const randX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    const randY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

    const candidate = {
      left: stageRect.left + randX,
      right: stageRect.left + randX + noRect.width,
      top: stageRect.top + randY,
      bottom: stageRect.top + randY + noRect.height,
    };

    if (!rectsOverlap(candidate, cardRect, 24) && !rectsOverlap(candidate, yesRect, 32)) {
      nextLeft = randX;
      nextTop = randY;
      break;
    }

    attempts += 1;
  }

  noBtn.style.left = `${nextLeft}px`;
  noBtn.style.top = `${nextTop}px`;
}

noBtn.addEventListener("mouseenter", moveNoButton);
window.addEventListener("resize", placeNoButtonStart);

placeNoButtonStart();
