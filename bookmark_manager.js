$(document).ready(function () {
  let bookmarks = [];
  let currentIndex = 0;

  // Load state from localStorage if available
  const savedIndex = localStorage.getItem('bookmarkCarouselIndex');
  if (savedIndex !== null) {
    currentIndex = parseInt(savedIndex, 10);
  }

  // Save state to localStorage whenever currentIndex changes
  function saveState() {
    localStorage.setItem('bookmarkCarouselIndex', currentIndex.toString());
  }

  // Function to recursively collect bookmarks
  function collectBookmarks(bookmarkNodes) {
    bookmarkNodes.forEach(function (bookmark) {
      if (bookmark.url) {
        // It's a bookmark
        bookmarks.push(bookmark);
      } else if (bookmark.children) {
        // It's a folder
        collectBookmarks(bookmark.children);
      }
    });
  }

  // Function to display the current bookmark
  function displayCurrentBookmark() {
    if (currentIndex < bookmarks.length) {
      const bookmark = bookmarks[currentIndex];
      const progressPercentage = Math.round((currentIndex / bookmarks.length) * 100);
      $('#progress-bar').css('width', progressPercentage + '%');
      $('#progress-percentage').text(progressPercentage + '%');
      $('#bookmark-progress').text(`Bookmark ${currentIndex + 1} of ${bookmarks.length}`);
      $('#bookmark-title').text(bookmark.title || 'No Title');
      $('#bookmark-url').text(bookmark.url);
    } else {
      // No more bookmarks
      $('#progress-bar').css('width', '100%');
      $('#progress-percentage').text('100%');
      $('#bookmark-progress').text('');
      $('#bookmark-title').text('No more bookmarks.');
      $('#bookmark-url').text('');
      $('#keep-button').prop('disabled', true);
      $('#delete-button').prop('disabled', true);
    }
  }

  // Fetch bookmarks and initialize the carousel
  chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
    collectBookmarks(bookmarkTreeNodes);
    displayCurrentBookmark();
  });

  // "Keep" button click handler
  $('#keep-button').click(function () {
    currentIndex++;
    saveState();
    displayCurrentBookmark();
  });

  // "Delete" button click handler
  $('#delete-button').click(function () {
    const bookmark = bookmarks[currentIndex];
    if (confirm('Are you sure you want to delete this bookmark?')) {
      chrome.bookmarks.remove(bookmark.id, function () {
        // Remove the bookmark from the array
        bookmarks.splice(currentIndex, 1);
        // Do not increment currentIndex since we've removed the current bookmark
        saveState();
        displayCurrentBookmark();
      });
    }
  });

  // Keyboard shortcuts
  $(document).keydown(function (e) {
    if ($('#keep-button').prop('disabled')) {
      return;
    }
    if (e.key === 'ArrowRight') {
      $('#keep-button').click();
    } else if (e.key === 'Enter') {
      $('#delete-button').click();
    } else if (e.key === 'k' || e.key === 'K') {
      $('#keep-button').click();
    } else if (e.key === 'd' || e.key === 'D') {
      $('#delete-button').click();
    } else if (e.key === 'o' || e.key === 'O') {
      if (currentIndex < bookmarks.length) {
        const bookmark = bookmarks[currentIndex];
        chrome.tabs.create({ url: bookmark.url });
      }
    }
  });
});