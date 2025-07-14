const storyData = {
  title: "The Day My Scooter Became a Superstar",
  content: `It all began when my old rusty scooter decided to fart like a dinosaur in the middle of the market. 
The sound echoed so loud that a nearby film crew thought it was a stunt sound effect. 
They came over, hired me and my scooter for a scene, and before I knew it, we were famous! 
My scooter got more fan mail than I did. 
The twist? It now refuses to start unless paparazzi are around. 
Lesson? Never underestimate a fart-powered vehicle!`
};

const saveBtn = document.getElementById("saveBtn");
const savedStoriesContainer = document.getElementById("savedStories");

function displaySavedStories() {
  const saved = JSON.parse(localStorage.getItem("longStories")) || [];
  savedStoriesContainer.innerHTML = "<h2>📚 Saved Stories</h2>";
  saved.reverse().forEach(story => {
    const div = document.createElement("div");
    div.className = "saved-story";
    div.innerHTML = `<h3>${story.title}</h3><p>${story.content}</p>`;
    savedStoriesContainer.appendChild(div);
  });
}

function isAlreadySaved(title) {
  const saved = JSON.parse(localStorage.getItem("longStories")) || [];
  return saved.some(s => s.title === title);
}

if (isAlreadySaved(storyData.title)) {
  saveBtn.style.display = "none";
}

saveBtn.addEventListener("click", () => {
  const saved = JSON.parse(localStorage.getItem("longStories")) || [];
  saved.push(storyData);
  localStorage.setItem("longStories", JSON.stringify(saved));
  saveBtn.style.display = "none";
  displaySavedStories();
});

displaySavedStories();
