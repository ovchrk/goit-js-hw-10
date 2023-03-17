import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const EMPTY_FIELD = '';

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
  } else {
    clearAllFields();
  }
}

export function renderCountryCard(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    clearAllFields();
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
    clearCountryList();

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
    clearCountryInfo();

    const listItemRef = document.querySelectorAll('.list-item');
    listItemRef.forEach(item => {
      item.style.padding = '15px';
    });
  }
}
function clearAllFields() {
  countryInfoRef.innerHTML = EMPTY_FIELD;
  countryListRef.innerHTML = EMPTY_FIELD;
}

function clearCountryInfo() {
  countryInfoRef.innerHTML = EMPTY_FIELD;
}

function clearCountryList() {
  countryListRef.innerHTML = EMPTY_FIELD;
}
