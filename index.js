const accessKey = "d9WXyvFMHqfuzBcP7B3DW6qDJxiZqk2kBDH4963yIZA";

const searchForm = document.querySelector("form");
const inputElement = document.getElementById("default-search");
const searchBtn = document.getElementById("search-button");
const searchResults = document.querySelector('#search-results');
const showMoreBtn = document.getElementById('showMore');


let inputData = "";
let page = 1;

// Display results

const displayResults = (results) => {


searchResults.innerHTML = "";
    
    results.forEach((result) => {
        const imgElement = document.createElement("img");
        imgElement.classList.add('unsplashImage', 'lg:w-1/3', 'sm:w-full');

        imgElement.src = result.urls.small;
        imgElement.alt = result.alt_description;


        // const unsplashImageContainer = document.querySelector(".unsplashImage");

        searchResults.appendChild(imgElement);

    });
};

const dummyResults = [
    { urls: { small: 'https://dummyimage.com/600x360' }, alt_description: 'Description 1' },
    { urls: { small: 'https://dummyimage.com/601x361' }, alt_description: 'Description 2' },
    { urls: { small: 'https://dummyimage.com/602x362' }, alt_description: 'Description 3' },
    { urls: { small: 'https://dummyimage.com/602x362' }, alt_description: 'Description 4' },
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

        // if(page === 1){
        //     searchResults.innerHTML = "" ;
        // }

        // results.map((result) => {
        //     const imageWrapper = document.getElementById('search-result');
        //     const image = document.querySelectorAll('#unsplashImage');
        //     image.src = result.urls.small
        //     const imageConent = document.querySelectorAll('#image-content');
        //     imageConent.textContent = result.alt_description
       
        //     imageWrapper.appendChild(image)
        //     image
        // });
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



