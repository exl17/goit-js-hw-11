// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

 const API_KEY = '42176709-03057e91c34187fd30d01f158';
        const URL = "https://pixabay.com/api/?key=" + API_KEY + "&q="+encodeURIComponent('black dog');;

        document.addEventListener('DOMContentLoaded', function () {
            fetch(URL)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (parseInt(data.totalHits) > 0) {
                        data.hits.forEach(hit => {
                            console.log(hit.pageURL);
                        });
                    } else {
                        console.log('No hits');
                    }
                })
                .catch(error => {
                    console.error('Error during fetch:', error.message);
                });
        });