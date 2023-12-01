const accessKey = "d9WXyvFMHqfuzBcP7B3DW6qDJxiZqk2kBDH4963yIZA";

const searchForm = document.querySelector("form");
const inputElement = document.getElementById("default-search");
const searchBtn = document.getElementById("search-button");
const searchResults = document.querySelector('#search-results');
const showMoreBtn = document.getElementById('showMore');
const alt_image = document.getElementById('alt_description');

let inputData = "";
let page = 1;

// Display results

const displayResults = (results) => {


searchResults.innerHTML = "";
alt_image.innerHTML = "";
    
    results.forEach((result) => {
        const resultContainer = document.createElement("div");
        const contentOverlay = document.createElement("div");
        const imgElement = document.createElement("img");
        const altText = document.createElement('p');
        
        resultContainer.classList.add('resultContainer',  'resultContainer','relative','hover:content-overlay-opacity', 'lg:w-1/3', 'md:w-1/2', 'sm:w-full', 'grid', 'place-content-center');
        contentOverlay.classList.add('content-overlay',
        'absolute',
        'h-99',
        'w-full',
        'left-0',
        'top-0',
        'bottom-0',
        'right-0',
        'opacity-0',
        'transition-all',
        'duration-400',
        'ease-in-out');
        altText.classList.add('altTextStlye', 'text-white', 'text-center', 'text-lg', 'mt-2');

        imgElement.classList.add('unsplashImage');
        imgElement.src = result.urls.small;

        altText.textContent = result.alt_description;

        
        resultContainer.appendChild(imgElement);
        resultContainer.appendChild(contentOverlay);
        resultContainer.appendChild(altText);
        searchResults.appendChild(resultContainer);


    });
};


document.addEventListener('DOMContentLoaded',  () => {

    const page = 1;
    const resultContainer = document.getElementById('search-results');
    

    fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`)
        .then(response => response.json())
        .then(data => {

            data.results.forEach(result => {
                const imageContainer = document.createElement('div');
                imageContainer.className = 'lg:w-1/3 sm:w-1/2 p-4';

                const image = document.createElement('img');
                image.src = result.urls.small;
                image.alt = result.alt_description;
                image.className = 'w-full';

                const contentOverlay = document.createElement('div');
                contentOverlay.className = 'content-overlay';

                const altDescription = document.createElement('div');
                altDescription.textContent = result.alt_description;
                altDescription.id = 'alt_description';

                imageContainer.appendChild(contentOverlay);
                imageContainer.appendChild(image);
                imageContainer.appendChild(altDescription);
                resultContainer.appendChild(imageContainer);

            });
        })
        .catch(error => {
            console.log("error fetching data", error);
        });
});

const dummyResults = [
    { urls: { small: 'https://source.unsplash.com/featured/601x361?1' }, alt_description: 'https://source.unsplash.com/name' },
    { urls: { small: 'https://source.unsplash.com/featured/601x361?2' }, alt_description: 'Description 2' },
    { urls: { small: 'https://source.unsplash.com/featured/601x361?3' }, alt_description: 'Description 3' },
    { urls: { small: 'https://source.unsplash.com/featured/601x361?4' }, alt_description: 'Description 4' },
    { urls: { small: 'https://source.unsplash.com/featured/601x361?5' }, alt_description: 'Description 5' },
    { urls: { small: 'https://source.unsplash.com/featured/601x361?6' }, alt_description: 'Description 6' },
    // Add more dummy results as needed
];

displayResults(dummyResults);

const searchImage = async () => {

        const inputData = inputElement.value;
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

        const response = await fetch(url);
        const data = await response.json();

        const results = data.results;

        displayResults(results);

};

showMoreBtn.addEventListener("click", async() => {
    page++;
    await searchImage();
});



searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    page = 1; 
    await searchImage();
})





// try to test in a single image only then after that proceed to the others