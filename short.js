const searchInput = document.getElementById('search');
const languageSelect = document.getElementById('languageSelect');
const stories = document.querySelectorAll('.story');

function filterStories() {
  const lang = languageSelect.value;
  const search = searchInput.value.toLowerCase();

  stories.forEach(story => {
    const storyLang = story.getAttribute('data-lang');
    const text = story.textContent.toLowerCase();
    const match = storyLang === lang && text.includes(search);
    story.style.display = match ? 'block' : 'none';
  });
}

function loadFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const storyId = urlParams.get('id');
  const lang = urlParams.get('lang');

  if (storyId && lang) {
    languageSelect.value = lang;
    searchInput.value = '';
    stories.forEach(story => {
      const match = story.getAttribute('data-id') === storyId;
      story.style.display = match ? 'block' : 'none';
    });
  } else {
    filterStories();
  }
}

// Copy link function
function setupCopyButtons() {
  const buttons = document.querySelectorAll('.copyBtn');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const story = button.parentElement;
      const id = story.getAttribute('data-id');
      const lang = story.getAttribute('data-lang');
      const link = `${window.location.origin}${window.location.pathname}?id=${id}&lang=${lang}`;
      
      navigator.clipboard.writeText(link).then(() => {
        alert("✅ Link copied to clipboard!");
      }).catch(() => {
        alert("❌ Failed to copy link.");
      });
    });
  });
}

// Event listeners
languageSelect.addEventListener('change', filterStories);
searchInput.addEventListener('input', filterStories);

// Initial Load
loadFromURL();
setupCopyButtons();

