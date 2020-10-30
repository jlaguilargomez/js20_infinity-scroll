# js20_infinity-scroll

Infinity Scroll project from "JS 20 projects course"

Live project: http://jlaguilardev.me/vanilla_js20_infinity-scroll/

-----

# Infinity scroll

### A tener en cuenta ...

- Iconos eventos de carga (SVG +)
- Color "whitesnake" ❤️
- ASYNC - AWAIT + FETCH

### GitHub

[jlaguilargomez/js20_infinity-scroll](https://github.com/jlaguilargomez/js20_infinity-scroll)

## Project

En este caso, vamos a usar esta página para añadir iconos a los eventos de carga de la página:

[loading.io - Your SVG + GIF + PNG Ajax Loading Icons and Animation Generator](https://loading.io/)

Descargamos el que será nuestro **ICONO DE CARGA** en SVG > ANIMATED, para que no se pierda calidad con el zoom.

Ojo al color que usamos para el fondo, se llama "**whitesmoke**", es como el blanco pero un poquito más gris ...

Para llevar a cabo la funcionalidad de **"scroll" infinito**, debemos acceder a la **API de Unsplash**:

Me gusta especialmente la forma que tiene de realizar las llamadas tareas asíncronas con **ASYNC-AWAIT.** En este caso concreto mediante la api **FETCH**:

```jsx
const count = 100;
const apiKey = 'ubu9lCAZ2x4TJmExp3iAPqMVFViYoNjKxMaAWMkJos4';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API
async function getPhotos(){
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data)
  } catch (err) {
    // Catch error here
  }
}

// On Load
getPhotos();
```

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/289ea70c-531f-4430-8889-efbec1050519/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/289ea70c-531f-4430-8889-efbec1050519/Untitled.png)

Esta es la implementación que queremos llevar a cabo, explicada **de forma esquemática**:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/37ab5bcb-250d-453f-a2f5-634494a77a20/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/37ab5bcb-250d-453f-a2f5-634494a77a20/Untitled.png)

Ya "puestos en harina", a la hora de crear la funcionalidad para mostrar las imagenes en pantalla, descubrimos que no es muy **CLEAN ....**

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/aab3b139-67d3-44c5-8738-06aebf5dd3e7/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/aab3b139-67d3-44c5-8738-06aebf5dd3e7/Untitled.png)

Siguiendo la idea de DRY (*Dont repeat yourself)* no nos queda otra que refactorizar el código, ya que estamos repitiendo varias veces lo mismo (`setAttribute`)

Creamos una función que, en base al elemento del DOM a modificar y a un objeto con los atributos, nos permita añadirlos dinámicamente:

```jsx
function setAttributes(elem, attributes) {
  for (const key in attributes) {
    elem.setAttribute(key, attributes[key])
  }
}
```

Ahora tan solo lo configuramos de la siguiente forma:

```jsx
// Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      alt: photo.alt_description,
    })
```

Trabajaremos ahora en generar la funcionalidad del ejercicio: **INFINITE SCROLL**

Como sabemos, con el evento **SCROLL** ligado a `window`, este se ejecuta de forma indefinida cada vez que hacemos scroll en la página, pero OJO, que sólo queremos volver a hacer una llamada a la API en un momento concreto del SCROLL (cuando este se aproxime a la parte inferior de la página.

Tengamos en cuenta lo siguiente:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/73ec6dbd-e6a0-44c9-ad4f-88d5dcf77355/InfiniteScrollFunctionality.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/73ec6dbd-e6a0-44c9-ad4f-88d5dcf77355/InfiniteScrollFunctionality.png)

Con esto, creamos un **callback** que añadimos al capturador de eventos de "scroll" de la página, para lanzar la funcionalidad que queremos:

```jsx
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
    console.log('pepe')
  }
})
```

¿El problema?, se ejecuta múltiples veces una vez sobrepasada la frontera establecida. **¡Debemos solucionarlo!**

Para esto, utilizaremos el siguiente **DOM event:**

[onload Event](https://www.w3schools.com/jsref/event_onload.asp)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c0eee8e7-cb70-4ff2-b3e7-4165c7f0fc00/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c0eee8e7-cb70-4ff2-b3e7-4165c7f0fc00/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1a3a713e-a3b3-4470-be48-3f08e0f483f2/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1a3a713e-a3b3-4470-be48-3f08e0f483f2/Untitled.png)

Lo que estamos haciendo es chequear que todos los elementos han sido cargados, antes de cambiar la variable `ready` a `true` y posibilitar la carga de más elementos:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a35bd732-8a8e-4101-a0b3-b0d675bfbf8d/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a35bd732-8a8e-4101-a0b3-b0d675bfbf8d/Untitled.png)

## Para nota...

**Podría decirse que es de vital importancia el tema del rendimiento dentro de la aplicación. ¡¡En este caso cargamos 30 elementos inicialmente!! Eso no es bueno para conexiones lentas**

Vamos a modificar el estado de carga, con el objetivo de que se carguen sólo 5 elementos al inicio y, una vez cargados estos, se cambie el número de elementos a cargar a 30:

```jsx
**let count = 5;**
const apiKey = 'ubu9lCAZ2x4TJmExp3iAPqMVFViYoNjKxMaAWMkJos4';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaderd
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    **count = 30;**
  }
}
```

---
