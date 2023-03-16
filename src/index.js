import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

countryListRef.style.listStyleType = 'none';
countryListRef.style.margin = '20px';
countryListRef.style.fontSize = '20px';

inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

let inputValue = '';

function onInput(evt) {
  inputValue = evt.target.value.trim().toLowerCase();

  if (inputValue !== '') {
    fetchCountries(inputValue);
  }
  if (inputValue === '') {
    countryInfoRef.innerHTML = '';
    countryListRef.innerHTML = '';
  }
}

export function renderCountryCard(countries) {
  if (countries.length > 10) {
    countryInfoRef.innerHTML = '';
    countryListRef.innerHTML = '';
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (countries.length === 1) {
    const countryMarkup = countries
      .flatMap(({ flags, languages, population, capital, name }) => {
        return `<h1 class="title"><img 
        src="${flags.svg}" 
        alt="${flags.alt}" 
        width="40" height="25" />${name.official}</h1>
      <ul class="country-info__list">
        <li><b>Capital:</b> ${capital}</li>
        <li><b>Population:</b> ${population}</li>
        <li><b>Languages:</b> ${Object.values(languages)}</li>
      </ul>`;
      })
      .join('');
    countryInfoRef.innerHTML = countryMarkup;
    countryListRef.innerHTML = '';

    const countryInfoListRef = document.querySelector('.country-info__list');
    const titleRef = document.querySelector('.title');

    titleRef.style.marginLeft = '35px';
    countryInfoListRef.style.listStyleType = 'none';
    countryInfoListRef.style.margin = '20px';
  }
  if (countries.length < 11 && countries.length > 1) {
    const countriesListMarkup = countries
      .flatMap(({ flags, name }) => {
        return `<li class="list-item">
        <img
        src="${flags.svg}" 
        alt="${flags.alt}" 
        width="30" height="20" /> ${name.official}</li>`;
      })
      .join('');
    countryListRef.innerHTML = countriesListMarkup;
    countryInfoRef.innerHTML = '';

    const listItemRef = document.querySelectorAll('.list-item');
    listItemRef.forEach(item => {
      item.style.padding = '15px';
    });
  }
}

// fetchCountries
// function fetchCountries(name) {
//   fetch(
//     `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
//   )
//     .then(response => {
//       if (!response.ok) {
//         Notiflix.Notify.failure('Oops, there is no country with that name');
//       }
//       return response.json();
//     })
//     .then(renderCountryCard)
//     .catch(error => {
//       console.log(error);
//     });
// }
