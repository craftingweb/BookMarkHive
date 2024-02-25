const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-model");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");
const btn = document.getElementById("btn");

let bookmarks = [];

// Show Modal, Focus on Input
function showModal() {
  modal.classList.add("show-modal");
  websiteNameEl.focus();
}

// Modal Event Listener
modalShow.addEventListener("click", showModal);

modalClose.addEventListener("click", () =>
  modal.classList.remove("show-modal")
);

btn.addEventListener("click", () => modal.classList.remove("show-modal"));

window.addEventListener("click", (e) =>
  e.target === modal ? modal.classList.remove("show-modal") : false
);

// Validate Form
function validate(nameValue, urlValue) {
  const expression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!urlValue.match(regex)) {
    alert("Please provide a valid WEB address");
    return false;
  }
  return true;
}

// Building Bookmarks DOM
function buildBookmarks() {
  bookmarksContainer.textContent = "";
  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;
    const item = document.createElement("div");
    item.classList.add("item");
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-times");
    closeIcon.setAttribute("title", "Delete");
    closeIcon.setAttribute("onclick", `deleteBookmark('${url}')`);
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");
    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute("alt", "Favicon");
    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
  });
}

// Fetch data
function fetchBookmarks() {
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    bookmarks = [
      {
        name: "Vitali Design",
        url: "https://vitaliyprymak.com",
      },
    ];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  buildBookmarks();
}

// Delete Bookmark
function deleteBookmark(url) {
  bookmarks.forEach((bookmark, i) => {
    if (bookmark.url === url) {
      bookmarks.splice(i, 1);
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchBookmarks();
  });
}

// Handle Data from Form
function storeBookmark(e) {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue | !nameValue) {
    alert("Please fill all fields");
    return false;
  }
  if (!urlValue.includes("https://")) {
    urlValue = `https://${urlValue}`;
  }
  if (!validate(nameValue, urlValue)) {
    return false;
  }
  let bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmark);
  console.log(bookmarks);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus;
}

// Event Listener
bookmarkForm.addEventListener("submit", storeBookmark);

// On load
fetchBookmarks();
