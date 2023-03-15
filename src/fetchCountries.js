const BASE_URL = 'https://restcountries.com/v3.1/all';

function fetchCountries(name) {
  return fetch(`${BASE_URL}?fields=name,capital,population,flags,languages`)
    .then(response => {
      return response.json();
    })
    .then(renderCountryCard)
    .catch(error => {
      console.log(error);
    });
}

// export { fetchCountries };
