const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

const photosArray = [];

// Unsplash API
const count = 100;
const apiKey = 'ubu9lCAZ2x4TJmExp3iAPqMVFViYoNjKxMaAWMkJos4';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;



// Create Elements for Links & photos add to the DOM

function setAttributes(elem, attribute, prop) {
  return elem.setAttribute(attribute, prop)
}

function displayPhotos() {
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    setAttributes(item, 'href',photo.links.html)
    setAttributes(item, 'target', '_blank');
    
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, 'src', photo.urls.regular);
    setAttributes(img, 'alt', photo.alt_description);
    setAttributes(img, 'title', photo.alt_description);
    
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