import './styles.css';
import ImagesApiService from './js/apiService';
import getRefs from './js/get-refs';
import galleryTpl from './js/templates/gallery.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import notification from './js/components/notifications';
import settings from './js/settings/index';
import collectTags from './js/collect-tags';
import dCarousel from 'd-carousel';

import tagsTpl from './js/templates/tags.hbs';

const refs = getRefs();
const { PER_PAGE } = settings;
const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.gallery.addEventListener('click', onGalleryClick);

async function onSearch(event) {
  try {
    event.preventDefault();
    const searchQuery = event.currentTarget.elements.query.value.trim();

    if (searchQuery === '') return;

    imagesApiService.resetPage();
    imagesApiService.query = searchQuery;
    clearGallery();
    await fetchImages();
    repositionSearchForm();
    observer.observe(refs.sentinel);
    if (imagesApiService.total === 0) {
      notification.onNotFoundError();
    } else {
      notification.fetchStatus(imagesApiService.total);
    }
  } catch (error) {
    notification.onError();
  }
}

async function onLoadMore(entries) {
  await entries.forEach(entry => {
    if (entry.isIntersecting) {
      fetchImages();
    }
  });
}

async function fetchImages() {
  const images = await imagesApiService.fetchImages();
  renderGallery(images);

  const tags = collectTags(imagesApiService.hits);
  renderTags(tags);

  if (images.length < PER_PAGE) {
    notification.noMoreContent();
    // refs.sentinel.textContent = 'no more content';
    observer.unobserve(refs.sentinel);
  }
}

function renderTags(tags) {
  refs.tags.innerHTML = tagsTpl(tags);
  dCarousel(document.querySelector('.d-carousel'));
  refs.tags.addEventListener('click', onTagClick);
}

async function onTagClick(event) {
  if (event.target.nodeName !== 'LI') return;
  const searchQueryFromTag = event.target.textContent.substring(1);
  imagesApiService.query = searchQueryFromTag;
  imagesApiService.resetPage();
  clearGallery();
  await fetchImages();
  refs.searchForm.elements.query.value = searchQueryFromTag;
}

function renderGallery(images) {
  refs.gallery.insertAdjacentHTML('beforeend', galleryTpl(images));
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function repositionSearchForm() {
  refs.searchWrapper.classList.add('header');
  refs.logoContainer.classList.add('header');
}

function onGalleryClick(event) {
  if (event.target.nodeName !== 'IMG') return;

  const largeImgUrl = event.target.getAttribute('data-largeImg');
  const instance = basicLightbox.create(`<img src="${largeImgUrl}" >`);
  instance.show();
}

const options = {
  rootMargin: '150px',
};
const observer = new IntersectionObserver(onLoadMore, options);
