import settings from './settings/index';

const { BASE_URL, API_KEY, PER_PAGE } = settings;
const options = {
  method: 'GET',
  headers: {
    // key: `${API_KEY}`,
    per_page: `${PER_PAGE}`,
  },
};
export default async function (query) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&per_page=${PER_PAGE}`;
  return await (await fetch(url)).json();
}
