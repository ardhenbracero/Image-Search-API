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
        const imgElement = document.createElement("img");
        const altText = document.createElement('p');
        
        resultContainer.classList.add('resultContainer', 'lg:w-1/3', 'md:w-1/2', 'sm:w-full', 'grid', 'place-content-center');
        altText.classList.add('altTextStlye', 'text-slate-950', 'text-center', 'text-lg', 'mt-2');

        imgElement.classList.add('unsplashImage');
        imgElement.src = result.urls.small;

        altText.textContent = result.alt_description;

        
        resultContainer.appendChild(imgElement);
        resultContainer.appendChild(altText);
        searchResults.appendChild(resultContainer);


    });
};


const hoverImage = () => {

}

const dummyResults = [
    { urls: { small: 'https://dummyimage.com/600x360' }, alt_description: 'Description 1' },
    { urls: { small: 'https://dummyimage.com/601x361' }, alt_description: 'Description 2' },
    { urls: { small: 'https://dummyimage.com/602x362' }, alt_description: 'Description 3' },
    { urls: { small: 'https://dummyimage.com/602x362' }, alt_description: 'Description 4' },
    { urls: { small: 'https://dummyimage.com/602x362' }, alt_description: 'Description 5' },
    { urls: { small: 'https://dummyimage.com/602x362' }, alt_description: 'Description 6' },
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



