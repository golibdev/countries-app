const api = `https://restcountries.com/v3.1/all`;
const searchInput = document.querySelector('#country-name');
const cardRow = document.querySelector('#card-row');
const countryNameValue = document.querySelector('#country-name-value');
const searchBtn = document.querySelector('.btn')
let countries = [];

async function getData() {
   const res = await fetch(api);
   const data = await res.json();

   countries = data;
   displayData(countries)

   return countries;
}

searchBtn.addEventListener('click', async (e) => {
   e.preventDefault();
   const value = countryNameValue.value;

   const result = await getData();

   const filterData = result.filter(item => item.name.common.toLowerCase().includes(value.toLowerCase().trim()))

   displayData(filterData);
   countryNameValue.value = '';
})

searchInput.addEventListener('input', async (e) => {
   const value = e.target.value.toLowerCase();
   const countries = await getData();

   const filterData = countries.filter(item => item.name.common.toLowerCase().includes(value.trim()))

   displayData(filterData)
})

function displayData(countries) {
   let row = ``
   if(countries.length !== 0) {
      countries.forEach(country => {
         row+=`
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">
               <div class="card shadow p-2">
                  <div class="card-boody">
                     <img src="${country['flags']['png']}" id="flag-image" alt="flag" class="img-fluid">
                     <div class="country-info mt-2">
                        <h5>
                           <span class="fw-bold">
                              Name:
                           </span>
                           <span id="name">${country['name']['common']}</span>
                        </h5>
                        <h5>
                           <span class="fw-bold">
                              Capital:
                           </span>
                           <span id="capital">${country['capital']}</span>
                        </h5>
                        <h5>
                           <span class="fw-bold">
                              Population:
                           </span>
                           <span id="population">
                              ${country['population'].toLocaleString('en-us')}
                           </span>
                        </h5>
                     </div>
                  </div>
               </div>
            </div>
         `
      })
   } else {
      row+=`<div class="col-12 alert alert-danger text-center">
         Country not found
      </div>`
   }

   cardRow.innerHTML = row
}

getData()

const date = new Date(1668859337116);
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

const fullData = `${day < 10 ? '0'+day : day}.${month < 10 ? '0'+month : month}.${year}`
console.log(fullData);