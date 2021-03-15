import './styles.css';
import ImagesApiService from './js/apiService';
import getRefs from './js/get-refs';
import galleryTpl from './js/templates/gallery.hbs';
import LoadMoreBtn from './js/components/load-more-btn';
// import ImagePagination from './js/img-pagination/gallery';

// const images = new ImagePagination('.gallery');
const refs = getRefs();
const imagesApiService = new ImagesApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

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
  const searchQuery = event.currentTarget.elements.query.value;

  if (searchQuery === '') return;

  loadMoreBtn.show();

  clearGallery();
  imagesApiService.resetPage();
  imagesApiService.query = searchQuery;
  fetchImages();
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
