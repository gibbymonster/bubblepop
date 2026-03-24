// bubble.js - fixed version

const container = document.getElementById('container');
const countEl = document.getElementById('count');
let count = 0;
const popSound = new Audio('pop.mp3');

function createBubble() {
  const bubble = document.createElement('div');
  const size = Math.random() * 90 + 50;

  bubble.classList.add('bubble');
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${Math.random() * 100}%`;
  bubble.style.top = `${Math.random() * 100}%`;
  bubble.style.pointerEvents = 'auto';   // this was missing

  container.appendChild(bubble);

  // float up
  let y = parseFloat(bubble.style.top);
  const floatInterval = setInterval(() => {
    y -= 0.25;
    bubble.style.top = `${y}%`;

    if (y < -15) {
      clearInterval(floatInterval);
      bubble.remove();
    }
  }, 30);

  // pop on click
  bubble.addEventListener('click', (e) => {
    e.stopImmediatePropagation();

    bubble.classList.add('pop');

    popSound.currentTime = 0;
    popSound.play().catch(() => {});

    count++;
    countEl.textContent = count;

    setTimeout(() => bubble.remove(), 350);
  });
}

// auto spawn
setInterval(() => {
  if (document.querySelectorAll('.bubble').length < 14) {
    createBubble();
  }
}, 160);

// extra spawn on background click
container.addEventListener('click', () => {
  createBubble();
});

// starting bubbles
for (let i = 0; i < 9; i++) {
  setTimeout(createBubble, i * 100);
}
