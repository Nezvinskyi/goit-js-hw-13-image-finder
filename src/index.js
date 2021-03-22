import './styles.css';
import ImagesApiService from './js/apiService';
import getRefs from './js/get-refs';
import galleryTpl from './js/templates/gallery.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import notification from './js/components/notifications';
import settings from './js/settings/index';
import tags from './js/collect-tags';
import dCarousel from 'd-carousel';

import tagsTpl from './js/templates/tags.hbs';

const refs = getRefs();
const { PER_PAGE } = settings;
const imagesApiService = new ImagesApiService();
const options = {
  rootMargin: '150px',
};
const observer = new IntersectionObserver(onLoadMore, options);

refs.searchForm.addEventListener('submit', onSearchClick);
refs.gallery.addEventListener('click', onGalleryClick);

function onSearchClick(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.query.value.trim();
  onSearch(searchQuery);
}

async function onSearch(searchQuery) {
  try {
    if (searchQuery === '') return;
    imagesApiService.resetPage();
    imagesApiService.query = searchQuery;
    clearGallery();
    tags.resetTags();
    await fetchImages();
    repositionSearchForm();
    if (imagesApiService.total === 0) {
      notification.onNotFoundError();
    } else if (imagesApiService.total <= PER_PAGE) {
      notification.notTooManyStatus(imagesApiService.total);
    } else {
      notification.fetchStatus(imagesApiService.total);
      observer.observe(refs.sentinel);
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
  if (imagesApiService.total > 0) {
    tags.collectTags(imagesApiService.hits);
    const tagsForRender = tags.collectTags(imagesApiService.hits);
    renderTags(tagsForRender);
  }

  if (imagesApiService.total > PER_PAGE && images.length < PER_PAGE) {
    notification.noMoreContent();
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
  onSearch(searchQueryFromTag);
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
