const saveBtn = document.getElementById("save-btn");
const storySource = document.getElementById("story-source");
const storyList = document.getElementById("story-list");

function loadStories() {
  const stories = JSON.parse(localStorage.getItem("comwors_stories")) || [];
  storyList.innerHTML = "";
  stories.reverse().forEach(story => {
    const card = document.createElement("div");
    card.className = "story-card";
    card.innerHTML = `<h3>${story.title}</h3><p>${story.text}</p>`;
    storyList.appendChild(card);
  });
}

saveBtn.addEventListener("click", () => {
  const title = storySource.getAttribute("data-title");
  const text = storySource.getAttribute("data-text");

  if (!title || !text) return;

  let stories = JSON.parse(localStorage.getItem("comwors_stories")) || [];

  // Duplicate check
  const exists = stories.find(s => s.title === title && s.text === text);
  if (exists) {
    alert("This story is already saved.");
    return;
  }

  stories.push({ title, text });
  localStorage.setItem("comwors_stories", JSON.stringify(stories));

  loadStories();
  saveBtn.style.display = "none"; // Hide Save button
});

// Reactivate Save button when story changed
const observer = new MutationObserver(() => {
  saveBtn.style.display = "inline-block";
});
observer.observe(storySource, { attributes: true });

window.addEventListener("DOMContentLoaded", loadStories);
