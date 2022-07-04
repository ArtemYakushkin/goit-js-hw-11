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



//  <a class="gallery__link" href="${largeImageURL}">
//           <div class="gallery-item" id="${id}">
//             <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
//             <div class="info">
//               <p class="info-item"><b>Likes</b>${likes}</p>
//               <p class="info-item"><b>Views</b>${views}</p>
//               <p class="info-item"><b>Comments</b>${comments}</p>
//               <p class="info-item"><b>Downloads</b>${downloads}</p>
//             </div>
//           </div>
//         </a>