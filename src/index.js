import './styles.css';
import API from './js/apiService';
import getRefs from './js/get-refs';
import { debounce } from 'lodash';
import galleryTpl from './js/templates/gallery.hbs';

const refs = getRefs();

console.log(refs.gallery);

// getImages();

refs.searchForm.addEventListener('input', debounce(onSearch, 500));

async function onSearch(event) {
  event.preventDefault();
  const searchQuery = event.target.value;
  await getImages(searchQuery);
}

async function getImages(searchQuery) {
  const response = await API(searchQuery);
  console.log('clg ');
  renderGallery(response.hits);
}

function renderGallery(data) {
  console.log(galleryTpl(data));
  refs.gallery.innerHTML = galleryTpl(data);
}
