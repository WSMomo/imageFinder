import * as variables from './variables.js';
import { getImagesDataFromAPI, createListOfImages } from './function.js';
let currentPage = variables.currentPage;

variables.form.addEventListener('submit', (event)=>{
  event.preventDefault();
  getImagesDataFromAPI(variables.searchInput.value, currentPage, variables.perPage)
  .then(data => {
    if(data.length > 0){
      createListOfImages(data, variables.imagesContainer)
      variables.showMore.style.display = 'block';
      variables.errorMessage.style.display = 'none';
      } else {
        variables.showMore.style.display = 'none';
        variables.errorMessage.style.display = 'flex';
      }

      })
      .catch(error => console.error(error));
})

variables.showMore.addEventListener('click',(event)=>{
  event.preventDefault();
  currentPage++;
  getImagesDataFromAPI(variables.searchInput.value, variables.currentPage, variables.perPage)
  .then(data => {
    if(data.length > 0){
      createListOfImages(data, variables.imagesContainer)
      } else {
        variables.showMore.style.display = 'none';
      }

      })
    .catch(error => console.error(error));
})
