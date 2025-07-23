const languageSelect = document.getElementById('languageSelect');
const searchInput = document.getElementById('search');
const allStories = Array.from(document.querySelectorAll('.story'));

function filterStories() {
  const selectedLang = languageSelect.value;
  const query = searchInput.value.toLowerCase();

  allStories.forEach(story => {
    const matchesLang = story.getAttribute('data-lang') === selectedLang;
    const matchesSearch = story.textContent.toLowerCase().includes(query);
    story.style.display = matchesLang && matchesSearch ? 'block' : 'none';
  });
}

// Initial Filter
filterStories();

languageSelect.addEventListener('change', filterStories);
searchInput.addEventListener('input', filterStories);

// Handle Copy Link buttons
document.querySelectorAll('.copyBtn').forEach(button => {
  button.addEventListener('click', () => {
    const story = button.closest('.story');
    const lang = story.getAttribute('data-lang');
    const id = story.getAttribute('data-id');
    const shareUrl = `${window.location.origin}${window.location.pathname}?lang=${lang}&id=${id}`;
    
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        button.textContent = "✅ Copied!";
        setTimeout(() => {
          button.textContent = "📋 Copy Link";
        }, 2000);
      })
      .catch(() => {
        alert("❌ Failed to copy link");
      });
  });
});


