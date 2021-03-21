export default function getRefs() {
  return {
    searchForm: document.getElementById('search-form'),
    gallery: document.querySelector('.gallery'),
    sentinel: document.getElementById('sentinel'),
    searchWrapper: document.querySelector('.search-wrapper'),
    logoContainer: document.querySelector('.logo-container'),
  };
}
