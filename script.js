const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

const photosArray = [];

// Unsplash API
const count = 100;
const apiKey = 'ubu9lCAZ2x4TJmExp3iAPqMVFViYoNjKxMaAWMkJos4';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Create Elements for Links & photos add to the DOM


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