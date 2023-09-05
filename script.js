const apiKey = `JQxDIhaTS_Ma9upl-4mzAtf9gwrDrwcNxmwbldt-ue0`;

const formE1 = document.querySelector("form");
const inputE1 = document.getElementById("search-input");
const searchResult = document.querySelector(".search-results");
const showBtn = document.getElementById("show-more");

let inputData = "";
let page = 1;

// fetch data from API and display on the page
async function searchImages() {
  inputData = inputE1.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  const results = data.results;

  // Clear the searchResult div if it's the first page
  if (page === 1) {
    searchResult.innerHTML = "";
  }

  results.forEach((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img"); // Corrected 'documnet' to 'document'
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResult.appendChild(imageWrapper);
  });
  page++;

  // Hide the "Show More" button if there are no more pages
  if (page > data.total_pages) {
    showBtn.style.display = "none";
  } else {
    showBtn.style.display = "block";
  }
}

formE1.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showBtn.addEventListener("click", (event) => {
  event.preventDefault();
  searchImages();
});

// Initial search on page load (optional)
searchImages();
