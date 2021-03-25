import {activateBlock, activateElement} from './activator.js';
import {renderAdCard} from './render-ad-card.js';
import {mapFilterForm, mapFilters, mapFeaturesBlock} from './filters.js';
import {adForm, adFormHeader, adFormElements, adFormAddress} from './form.js';

const TOKYO_LATITUDE = 35.67100;
const TOKYO_LONGITUDE = 139.78350;
const PRECISION = 5;

const map = window.L.map('map-canvas')
  .on('load', () => {
    mapFilters.forEach((element) => {
      activateElement(element);
    });
    activateElement(mapFeaturesBlock);
    activateBlock(mapFilterForm, 'map__filters--disabled');

    activateElement(adFormHeader);
    adFormElements.forEach((element) => {
      activateElement(element);
    });
    activateBlock(adForm, 'ad-form--disabled');

    adFormAddress.value = `${TOKYO_LATITUDE.toFixed(PRECISION)}, ${TOKYO_LONGITUDE.toFixed(PRECISION)}`;
  })
  .setView({
    lat: TOKYO_LATITUDE,
    lng: TOKYO_LONGITUDE,
  }, 12);

window.L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mapPinIcon = window.L.icon ({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchore: [26, 52],
});

const mapPin = window.L.marker(
  {
    lat: TOKYO_LATITUDE,
    lng: TOKYO_LONGITUDE,
  },
  {
    draggable: true,
    icon: mapPinIcon,
  },
);

mapPin.addTo(map);

mapPin.on('drag', (evt) => {
  const anchorPoint = evt.target.getLatLng();
  adFormAddress.value = `${anchorPoint.lat.toFixed(PRECISION)}, ${anchorPoint.lng.toFixed(PRECISION)}`;
});

const ads = createAds();
const adPins = [];

ads.forEach(({offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}, author: {avatar}, location: {x, y}}, index) => {
  adPins[index] = {
    title,
    address,
    price,
    type,
    rooms,
    guests,
    checkin,
    checkout,
    features,
    description,
    photos,
    avatar,
    lat: x,
    lng: y,
  }
});

adPins.forEach((element) => {
  const {lat, lng} = element;

  const adPinIcon = window.L.icon ({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchore: [20, 40],
  });

  const adPin = window.L.marker(
    {
      lat,
      lng,
    },
    {
      icon: adPinIcon,
    },
  );

  adPin
    .addTo(map)
    .bindPopup(
      renderAdCard(element),
      {
        keepInView: true,
      },
    );
})
