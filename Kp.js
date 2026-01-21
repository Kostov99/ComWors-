// Eye tracking
const eyes = [document.getElementById("eye1"), document.getElementById("eye2")];
const pupils = [document.getElementById("pupil1"), document.getElementById("pupil2")];

document.addEventListener('mousemove', (e) => {
  eyes.forEach((eye, index) => {
    const rect = eye.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;
    const dx = e.clientX - eyeCenterX;
    const dy = e.clientY - eyeCenterY;
    const angle = Math.atan2(dy, dx);
    const distance = Math.min(Math.hypot(dx, dy), 20);
    const pupil = pupils[index];
    pupil.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
  });
});

// Hidden navigation to post.html
let clickCount = 0;
let lastClickTime = 0;
const title = document.getElementById("title");

title.addEventListener("click", () => {
  const now = Date.now();
  if (now - lastClickTime > 3000) clickCount = 0; // reset if too slow
  lastClickTime = now;
  clickCount++;
  if (clickCount >= 100) window.location.href = "post.html";
});
