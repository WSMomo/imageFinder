// Function to get image data from the Unsplash API
// Input: a search query, page number, and number of images per page
// Output: an array of image results
export function getImagesDataFromAPI(query, accessKey, page, perPage) {

  // Construct the URL for the API request using the query, page, and perPage parameters
  const url = `https://api.unsplash.com/search/photos/?query=${query}&client_id=${accessKey}&page=${page}&per_page=${perPage}`;

  // Make a request to the Unsplash API using fetch
  return fetch(url)
    .then(response => {

      // Check if the response is not OK (i.e. status code other than 200)
      if (!response.ok) {
        throw new Error('Errore durante la ricerca di immagini');
      }

      // Parse the response as JSON and return the array of image results
      return response.json();
    })
    .then(data => {
      console.log(data);
      
      // Extract the array of image results from the API response and return it
      return data.results;
    })
    .catch(error => {
      console.log(error);
    })

}

// Function to create a list of image elements and append them to a container element
// Input: an array of image data objects and a container HTML element
// Output: none (appends image elements to the container element)
export function createListOfImages(arrayOfSearched, tagHTML) {
  // Return a promise so that the caller can wait for the images to be created and appended
  return new Promise((resolve, reject) => {

    // Loop through the array of image data objects

    arrayOfSearched.forEach(item => {

      // Create HTML elements for the image, link, and description
      const div = document.createElement('div');
      const link = document.createElement('a');
      const image = document.createElement('img');
      const description = document.createElement('p');

      // Set the image source and alt text to the appropriate values from the image data object
      image.src = item.urls.regular;
      image.alt = item.description;

      // Set the description text to the appropriate value from the image data object
      description.textContent = item.description;

      // Set the link href to the Unsplash URL for the image and open in a new tab

      link.href = item.links.html;
      link.target = '_blank';

      // Append the image and description to the link, and the link to the div
      link.appendChild(image);
      link.appendChild(description);
      div.appendChild(link);

      // Append the div to the container HTML element
      tagHTML.appendChild(div);
    });

    // Resolve the promise to indicate that the images have been created and appended
    resolve();
  })

}