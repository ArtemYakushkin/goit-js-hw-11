import axios from "axios";
export { fetchImg };

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '28419323-07717efaf215650b1b40134d5';

async function fetchImg(query, page, perPage) {
    const response = await axios.get(
        `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    return response;
}