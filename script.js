const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const photosArray = [];

// Unsplash API
let count = 5;
const apiKey = 'ubu9lCAZ2x4TJmExp3iAPqMVFViYoNjKxMaAWMkJos4';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaderd
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
  }
}

// Create Elements for Links & photos add to the DOM
function setAttributes(elem, attributes) {
  for (const key in attributes) {
    elem.setAttribute(key, attributes[key])
  }
}

function displayPhotos() {
  totalImages = photosArray.length;
  imagesLoaded = 0;
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    })
    
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      alt: photo.alt_description,
    })
    img.addEventListener('load', imageLoaded())    
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

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
})

// On Load
getPhotos();