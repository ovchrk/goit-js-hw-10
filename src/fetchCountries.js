const BASE_URL = 'https://restcountries.com/v3.1/name/';
import Notiflix from 'notiflix';
import { renderCountryCard } from './index.js';

export function fetchCountries(name) {
  fetch(`${BASE_URL}${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
      if (!response.ok) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
      return response.json();
    })
    .then(renderCountryCard)
    .catch(error => {
      console.log(error);
    });
}
// export { fetchCountries };
