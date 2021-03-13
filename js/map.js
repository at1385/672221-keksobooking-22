import {activateBlock, activateElement} from './activator.js';
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

