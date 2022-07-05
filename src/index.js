import './sass/index.scss';
import { fetchImg } from './js/fetch.js';
import { renderGallery } from './js/render.js';
import { onScroll, onTopButton } from './js/scroll.js';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
let query = '';
let page = 1;
let simpleLightBox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    nav: true,
    showCounter: true,
    enableKeyboard: true
});
const perPage = 40;

searchForm.addEventListener('submit', onSearchForm);
loadMore.addEventListener('click', onLoadMore);

onScroll();
onTopButton();


function onSearchForm(event) {
    event.preventDefault();
    window.scrollTo({ top: 0 });
    page = 1;
    query = event.currentTarget.searchQuery.value.trim();
    gallery.innerHTML = '';
    loadMore.classList.add('is-hidden');

    if (query === '') {
        emptySearch();
        return;
    }

    fetchImg(query, page, perPage).then(({ data }) => {
        if (data.totalHits === 0) {
            noImagesFound();
        } else {
            renderGallery(data.hits);
            simpleLightBox.refresh();
            imagesFound(data);

            if (data.totalHits > perPage) {
                loadMore.classList.remove('is-hidden');
            }
        }
    })
    .catch(error => console.log(error))
    .finally(() => {
        searchForm.reset();
    });
}

function onLoadMore() {
    page += 1;
    simpleLightBox.destroy();

    fetchImg(query, page, perPage)
        .then(({ data }) => {
            renderGallery(data.hits);
            simpleLightBox.refresh();

            const totalPages = Math.ceil(data.totalHits / perPage);

            if (page > totalPages) {
                loadMore.classList.add('is-hidden');
                endOfSearch();
            }
        })
        .catch(error => console.log(error));   
}


function emptySearch() {
    Notiflix.Notify.failure('The search string cannot be empty. Please specify your search query.');
}

function noImagesFound() {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}

function imagesFound(data) {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
}

function endOfSearch() {
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
}
