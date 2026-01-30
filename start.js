let currentStories = [];
let currentIndex = 0;

/* DOM READY */
document.addEventListener("DOMContentLoaded", () => {

  loadLanguage("en");

  document.getElementById("searchInput")
    .addEventListener("keyup", searchStory);

  document.getElementById("shareBtn").onclick = shareStory;
  document.getElementById("homeBtn").onclick = showList;
  document.getElementById("nextBtn").onclick = nextStory;

  document.querySelectorAll(".lang-bar button")
    .forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll(".lang-bar button")
          .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");
        loadLanguage(btn.dataset.lang);
      };
    });
});

/* LANGUAGE */
function loadLanguage(lang){
  currentStories = window["stories_" + lang] || [];
  renderList();
}

/* LIST */
function renderList(){
  const list = document.getElementById("listPage");
  list.innerHTML = "";

  currentStories.forEach((s,i)=>{
    const card = document.createElement("div");
    card.className = "story-card";

    card.innerHTML = `
      <h3>${s.title}</h3>
      <small>${getReadTime(s.content)}</small>
    `;

    card.onclick = ()=> openStory(i);

    list.appendChild(card);
  });

  showList();
}

/* OPEN */
function openStory(index){
  currentIndex = index;
  const story = currentStories[index];

  title.innerText = story.title;
  content.innerText = story.content;

  storyNumber.innerText =
    `Story ${index+1}/${currentStories.length}`;

  readTime.innerText =
    getReadTime(story.content);

  listPage.style.display="none";
  readerPage.style.display="block";

  window.scrollTo(0,0);
}

/* HOME */
function showList(){
  readerPage.style.display="none";
  listPage.style.display="grid";
}

/* NEXT */
function nextStory(){
  currentIndex = (currentIndex+1)%currentStories.length;
  openStory(currentIndex);
}

/* SHARE */
function shareStory(){
  const story = currentStories[currentIndex];

  const url =
    location.origin + location.pathname +
    `?story=${currentIndex}`;

  const text = `${story.title}\n\nRead on ComWors 😄\n${url}`;

  if(navigator.share){
    navigator.share({text});
  }else{
    navigator.clipboard.writeText(text);
    alert("Copied!");
  }
}

/* SEARCH */
function searchStory(){
  const value = searchInput.value.toLowerCase();

  document.querySelectorAll(".story-card")
    .forEach((card,i)=>{
      card.style.display =
        currentStories[i].title
        .toLowerCase()
        .includes(value) ? "block":"none";
    });
}

/* READ TIME */
function getReadTime(text){
  const words = text.match(/\w+/g)?.length || 0;
  const min = Math.max(1, Math.ceil(words/200));
  return `${min} min read`;
}
