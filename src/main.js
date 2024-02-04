// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";


const API_KEY = '42176709-03057e91c34187fd30d01f158';

function performSearch(searchQuery) {
    const imageType = 'photo';
    const orientation = 'horizontal';
    const safeSearch = true;

    const params = new URLSearchParams({
        key: API_KEY,
        q: searchQuery,
        image_type: imageType,
        orientation: orientation,
        safesearch: safeSearch,
    });
    const URL = `https://pixabay.com/api/?${params}`;

    fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const imageContainer = document.getElementById('imageContainer');
            imageContainer.innerHTML = '';

            if (parseInt(data.totalHits) > 0) {
                data.hits.forEach(hit => {
                    const cardContainer = document.createElement('div');
                    cardContainer.className = 'image-card';

                    const imgElement = document.createElement('img');
                    imgElement.src = hit.webformatURL;
                    imgElement.alt = hit.tags;

                    const detailsContainer = document.createElement('div');
                    detailsContainer.className = 'image-details';

                    const likesElement = document.createElement('p');
                    likesElement.textContent = `Likes ${hit.likes}`;

                    const viewsElement = document.createElement('p');
                    viewsElement.textContent = `Views ${hit.views}`;

                    const commentsElement = document.createElement('p');
                    commentsElement.textContent = `Comments ${hit.comments}`;

                    const downloadsElement = document.createElement('p');
                    downloadsElement.textContent = `Downloads ${hit.downloads}`;

                    detailsContainer.appendChild(likesElement);
                    detailsContainer.appendChild(viewsElement);
                    detailsContainer.appendChild(commentsElement);
                    detailsContainer.appendChild(downloadsElement);

                    cardContainer.appendChild(imgElement);
                    cardContainer.appendChild(detailsContainer);

                    imageContainer.appendChild(cardContainer);
                });
            } else {
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                });
            }
        })
        .catch(error => {
            console.error('Error during fetch:', error.message);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('searchForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const searchInputValue = document.getElementById('searchInput').value;
        if (searchInputValue.trim() !== '') {
            performSearch(searchInputValue);
        } else {
            iziToast.error({
                message: 'Please enter a valid search query.',
                position: 'topRight',
            });
        }

        event.target.reset();
    });
});
