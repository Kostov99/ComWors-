
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

// Share Button Function
document.querySelectorAll('.shareBtn').forEach(button => {
  button.addEventListener('click', () => {
    const story = button.closest('.story');
    const lang = story.getAttribute('data-lang');
    const id = story.getAttribute('data-id');
    const shareUrl = `${window.location.origin}${window.location.pathname}?lang=${lang}&id=${id}`;
    const shareText = "📖 Check out this funny story on ComWors!";

    // 1️⃣ Native mobile share menu
    if (navigator.share) {
      navigator.share({
        title: "ComWors Story",
        text: shareText,
        url: shareUrl
      }).catch(err => console.log("Share cancelled", err));
    } 
    // 2️⃣ Desktop Fallback
    else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
      const instagramUrl = `https://www.instagram.com/direct/new/?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
      
      // Open popup
      const popup = window.open("", "_blank", "width=400,height=300");
      popup.document.write(`
        <h3>Share this story</h3>
        <a href="${whatsappUrl}" target="_blank">📱 Share on WhatsApp</a><br><br>
        <a href="${instagramUrl}" target="_blank">📷 Share on Instagram DM</a><br><br>
        <p>Or copy this link:<br><input type="text" value="${shareUrl}" style="width:90%" readonly></p>
      `);
    }
  });
});

