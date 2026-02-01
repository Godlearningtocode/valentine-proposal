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

function moveNoButton() {
  const stageRect = stage.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const yesRect = yesBtn.getBoundingClientRect();

  const maxX = stageRect.width - noRect.width - 12;
  const maxY = stageRect.height - noRect.height - 12;
  const minX = 12;
  const minY = 12;

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

    if (!rectsOverlap(candidate, cardRect, 16) && !rectsOverlap(candidate, yesRect, 16)) {
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
window.addEventListener("resize", moveNoButton);
