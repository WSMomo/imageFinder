// https://unsplash.com/developers API
export function getImagesDataFromAPI(query, page, perPage) {
  const apiKey = 'RIpm1cZwnI0GC--TG45KEzYEv3qQcl_0_txgvNQjrA8';
  const url = `https://api.unsplash.com/search/photos/?query=${query}&client_id=${apiKey}&page=${page}&per_page=${perPage}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Errore durante la ricerca di immagini');
      }
      return response.json();
    })
    .then(data=>{
      console.log(data);
      return data.results;
    })
    .catch(error=>{
      console.log(error);
    })
    
  } 


export function createListOfImages(arrayOfSearched, tagHTML){
  return new Promise((resolve, reject) => {

  arrayOfSearched.forEach(item => {

    const div = document.createElement('div');
    const link = document.createElement('a');
    const image = document.createElement('img');
    const description = document.createElement('p');
    
    image.src = item.urls.regular;
    image.alt = item.description;
    description.textContent = item.description;
    link.href = item.links.html;
    link.target = '_blank';

    link.appendChild(image);
    link.appendChild(description);
    div.appendChild(link);
    
    tagHTML.appendChild(div);
  });

  resolve();
})
  
}

//dati importanti: 
 //-urls
 //-description
 //-username