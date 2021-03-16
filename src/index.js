import './styles.css';
import ImagesApiService from './js/apiService';
import getRefs from './js/get-refs';
import galleryTpl from './js/templates/gallery.hbs';
import LoadMoreBtn from './js/components/load-more-btn';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const refs = getRefs();
const imagesApiService = new ImagesApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
refs.gallery.addEventListener('click', onGalleryClick);
//
// async function tempoFuncCSS() {
//   imagesApiService.query = 'sex';
//   const images = await imagesApiService.fetchImages();
//   renderGallery(images);
// }
// tempoFuncCSS();
//

async function onSearch(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.query.value.trim();

  if (searchQuery === '') return;

  loadMoreBtn.show();
  imagesApiService.resetPage();
  imagesApiService.query = searchQuery;
  clearGallery();
  fetchImages();
  repositionSearchForm();
}

async function onLoadMore() {
  await fetchImages();
  window.scrollBy({
    top: screen.height - 250,
    behavior: 'smooth',
  });
}

async function fetchImages() {
  loadMoreBtn.disable();
  const images = await imagesApiService.fetchImages();
  renderGallery(images);
  loadMoreBtn.enable();
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
