import newApiService from './api-service/apiService.js';
import galleryItemsTemplates from '../templates/gallery.hbs';
let debounce = require('lodash.debounce');
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';

const refs = {
  searchForm: document.querySelector('#search-form'),
  searchGallery: document.querySelector('#gallery'),
  loadMore: document.querySelector('button[data-action="load-more"]'),
};

refs.searchForm.addEventListener('input', debounce(searchFormInput, 500));
refs.loadMore.addEventListener('click', loadMoreBtn);
refs.searchGallery.addEventListener('click', originalImagesWindow);

function originalImagesWindow(e) {
  const instance = basicLightbox.create(`
	<img src="${e.target.dataset.source}" width="100%">
`);
  instance.show();
}

function searchFormInput(e) {
  e.preventDefault;
  let inputValue = e.srcElement.value;
  clearListGallery();
  newApiService.searchQuery = inputValue;
  newApiService.resetPage();
  newApiService
    .searchImages(inputValue)
    .then(hits => {
      const galleryMarkup = buildGalleryServiceMarkup(hits);
      insertGallary(galleryMarkup);
    })
    .catch(error => {
      console.log(error);
    });
  refs.searchForm.elements.query.value = '';
}

function loadMoreBtn() {
  newApiService.searchImages().then(hits => {
    const galleryMarkup = buildGalleryServiceMarkup(hits);
    insertGallary(galleryMarkup);
    window.scrollTo(0, 200);
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    });
  });
}

function buildGalleryServiceMarkup(items) {
  return galleryItemsTemplates(items);
}

function insertGallary(items) {
  refs.searchGallery.insertAdjacentHTML('beforeend', items);
}

function clearListGallery() {
  refs.searchGallery.innerHTML = '';
}
