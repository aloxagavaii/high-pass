// burger

let btn = document.querySelector('.burger-btn');
let menu = document.querySelector('.burger');
let menuClose = document.querySelector('.burger__close');

btn.addEventListener('click', function () {
  menu.style.display = 'block';
  menu.classList.add('burger_active');

  document.body.classList.toggle('stop-scroll');
});

menuClose.addEventListener('click', function () {
  menu.classList.remove('burger_active');
});

// search

document.addEventListener('DOMContentLoaded', (e) => {
  document.getElementById('search-open').addEventListener('click', (e) => {
    document.getElementById('search').classList.add('search--active');
  });
  document.getElementById('close').addEventListener('click', (e) => {
    document.getElementById('search').classList.remove('search--active');
  });
  document.getElementById('search').addEventListener('submit', (e) => {
    e.preventDefault();
  });
});

// map

ymaps.ready(init);
function init() {
  var myMap = new ymaps.Map('map', {
    center: [55.76963601332982, 37.63668850000002],
    zoom: 15,
  });
  myMap.controls.remove('zoomControl');
  myMap.controls.remove('SearchControl');
  myMap.controls.remove('geolocationControl');
  myMap.controls.remove('routeButtonControl');
  myMap.controls.remove('trafficControl');
  myMap.controls.remove('typeSelector');
  myMap.controls.remove('fullscreenControl');

  const myGeoObject = new ymaps.GeoObject({
    geometry: {
      type: 'Point',
      coordinates: [55.76963601332982, 37.63668850000002],
    },
  });
  const myPlacemark = new ymaps.Placemark(
    [55.76963601332982, 37.63668850000002],
    {
      hintContent: 'Шоурум №4, Леонтьевский переулок, дом 5, строение 1',
    },
    {
      iconLayout: 'default#image',
      iconImageHref: 'images/Ellipse 2.svg',
      iconImageSize: [12, 12],
      balloonImageSize: [0, 0],
    }
  );
  myMap.geoObjects.add(myPlacemark);
}

const contactsMap = document.querySelector('.map');
const contactsDesc = document.querySelector('.contacts__adress');
let contactsClose = document.querySelector('.contacts__closes');

contactsMap.addEventListener('click', () => {
  if (contactsDesc.classList.contains('contacts__adress_active')) {
    contactsDesc.classList.remove('contacts__adress_active');
  } else {
    contactsDesc.classList.add('contacts__adress_active');
    contactsDesc.style.display = 'block';
  }
});

contactsClose.addEventListener('click', function () {
  contactsDesc.classList.remove('contacts__adress_active');
});
setTransitionendListenter(contactsDesc, 'contacts__adress_active', 'block');

function setTransitionendListenter(elem, elemClass, displayProp) {
  elem.addEventListener('transitionend', () => {
    if (!elem.classList.contains(elemClass)) {
      elem.removeAttribute('style');
    } else {
      elem.style.display = displayProp;
    }
  });
}
