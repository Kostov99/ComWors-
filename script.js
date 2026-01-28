// Buttons
const readBtn = document.getElementById("readBtn");
const writeBtn = document.getElementById("writeBtn");

// Navigation
readBtn.addEventListener("click", () => {
    window.location.href = "reading.html";
});

writeBtn.addEventListener("click", () => {
    window.location.href = "writer.html";
});
