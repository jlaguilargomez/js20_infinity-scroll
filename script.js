const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

const photosArray = [];

// Unsplash API
const count = 100;
const apiKey = 'ubu9lCAZ2x4TJmExp3iAPqMVFViYoNjKxMaAWMkJos4';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Create Elements for Links & photos add to the DOM
function displayPhotos() {
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target', '_blank');

    // Create <img> for photo
    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);

    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item)
    
  });
}

// Get photos from Unsplash API
async function getPhotos(){
  try {
    const response = await fetch(apiURL);
    photosArray.push(...await response.json())  
    displayPhotos();
    
  } catch (err) {
    // Catch error here
    console.log(err)
  }
}

// On Load
getPhotos();