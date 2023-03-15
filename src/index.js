import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
// import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onInput, 500));

let inputValue = '';

function onInput(evt) {
  inputValue = evt.target.value.toLowerCase();
  console.log(inputValue);
  fetchCountries(inputValue);
}
// fetchCountries
function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      return response.json();
    })
    .then(renderCountryCard)
    .catch(error => {
      console.log(error);
    });
}
function renderCountryCard(countries) {
  if (countries.length >= 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (countries.length === 1) {
    const countryMarkup = countries
      .flatMap(({ flags, languages, population, capital, name }) => {
        return `<h1><svg width="40" height="30px"><use href="${
          flags.svg
        }" ></use></svg>${name.official}</h1>
      <ul>
        <li>Capital: <span>${capital}</span></li>
        <li>Population: <span>${population}</span></li>
        <li>Languages: <span>${Object.values(languages)}</span></li>
      </ul>`;
      })
      .join('');
    countryInfoRef.innerHTML = countryMarkup;
    countryListRef.innerHTML = '';
  }
  if (countries.length < 11 && countries.length > 1) {
    const countriesListMarkup = countries
      .flatMap(({ flags, languages, population, capital, name }) => {
        return `<li><svg width="40" height="30px"><use href="${flags.svg}"></use></svg> ${name.official}</li>`;
      })
      .join('');
    countryListRef.innerHTML = countriesListMarkup;
    countryInfoRef.innerHTML = '';
  }
  console.log(countries);
}

// //Создание карточек с отфильтрованными странами
// function renderCountryCard(countries) {
//   const filteredCountries = countryNameFilter(countries);
//   console.log(filteredCountries);

//   // const countryMarkup = filteredCountries.map(({}))

//   //деструктуризація обєкта кантрі { name, capital, population, flags, languages }
//   // country
//   //   .map(({ preview, original, description }) => {
//   //     return `
//   //   <div class = "gallery__item">
//   //   <a class="gallery__link" href="large-image.jpg">
//   //   <img src = "${preview}"
//   //   class = "gallery__image"
//   //   data-source="${original}"
//   //   alt="${description}">
//   //   </a>
//   //   </div>`;
//   //   })
//   //   .join('');
// }

// //Проверка названия на инпут.Фильтрация массива и возврат нового массива со странами удовлетворяющими критерии поиска
// function countryNameFilter(countries) {
//   const filteredCountries = countries.filter(country =>
//     country.name.official.toLowerCase().includes(inputValue)
//   );
//   return filteredCountries;
// }
