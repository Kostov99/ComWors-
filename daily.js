// Like button functionality
const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const countSpan = button.querySelector(".count");
    let count = parseInt(countSpan.textContent);
    count += 1;
    countSpan.textContent = count;
    button.disabled = true; // prevent multiple likes
    button.style.opacity = 0.6;
  });
});

// Share button functionality (dummy alert)
const shareButtons = document.querySelectorAll(".share-btn");

shareButtons.forEach((button) => {
  button.addEventListener("click", () => {
    alert("Story shared! 📤");
  });
});

