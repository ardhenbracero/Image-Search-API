const accessKey = "d9WXyvFMHqfuzBcP7B3DW6qDJxiZqk2kBDH4963yIZA";

const searchForm = document.querySelector("form");
const inputElement = document.getElementById("default-search");
const searchBtn = document.getElementById("search-button");
const searchResults = document.querySelector('#search-results');
const showMoreBtn = document.getElementById('showMore');


let inputData = "";
let page = 1;

const searchImage = async () => {

        const inputData = inputElement.value;
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

        const response = await fetch(url);
        const data = await response.json();

        const results = data.results

        if(page === 1){
            searchResults.innerHTML = "" ;
        }

        results.map((result) => {
            const imageWrapper = document.getElementById('search-result');
            const image = document.querySelectorAll('#unsplashImage');
            image.src = result.urls.small
            const imageConent = document.querySelectorAll('#image-content');
            imageConent.textContent = result.alt_description
       
            imageWrapper.appendChild(image)
            image
        });

    
};



