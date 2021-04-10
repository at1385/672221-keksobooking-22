/* global L:readonly */
/* global _:readonly */

import {activateBlock, activateElement} from './activator.js';
import {ServerUrl, getData} from './server.js';
import {apartmentTypeToRus} from './apartment-types.js';
import {renderAdCard} from './render-ad-card.js';
import {mapFilterForm, mapFilters, featuresFilter, getFilteredAds} from './filters.js';
import {adForm, adFormHeader, adFormElements, adFormAddress, adFormReset} from './form.js';
import {showIncomingError} from './util.js';

const DEBOUNCE_INTERVAL = 500;

const TokyoCoordinate = {
  LATITUDE: 35.67100,
  LONGITUDE: 139.78350,
  PRECISION: 5,
}

const ADS_MAX_QUANTITY = 10;

const INCOMING_ERROR_MESSAGE = 'Объявления не были загружены. Попробуйте обновить страницу.';

const map = L.map('map-canvas')
  .on('load', () => {
    activateElement(adFormHeader);
    adFormElements.forEach((element) => {
      activateElement(element);
    });
    activateBlock(adForm, 'ad-form--disabled');

    adFormAddress.value = `${TokyoCoordinate.LATITUDE.toFixed(TokyoCoordinate.PRECISION)}, ${TokyoCoordinate.LONGITUDE.toFixed(TokyoCoordinate.PRECISION)}`;
  })
  .setView({
    lat: TokyoCoordinate.LATITUDE,
    lng: TokyoCoordinate.LONGITUDE,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mapPinIcon = L.icon ({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchore: [26, 52],
});

const mapPin = L.marker(
  {
    lat: TokyoCoordinate.LATITUDE,
    lng: TokyoCoordinate.LONGITUDE,
  },
  {
    draggable: true,
    icon: mapPinIcon,
  },
);

mapPin.addTo(map);

mapPin.on('drag', (evt) => {
  const anchorPoint = evt.target.getLatLng();
  adFormAddress.value = `${anchorPoint.lat.toFixed(TokyoCoordinate.PRECISION)}, ${anchorPoint.lng.toFixed(TokyoCoordinate.PRECISION)}`;
});

const renderAdPins = (adPins) => {
  for (let i = 0; i < ADS_MAX_QUANTITY; i++) {
    if (adPins[i]) {
      const {lat, lng} = adPins[i];

      const adPinIcon = L.icon ({
        iconUrl: 'img/pin.svg',
        iconSize: [40, 40],
        iconAnchore: [20, 40],
      });

      const adPin = L.marker(
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
          renderAdCard(adPins[i]),
        );

      mapFilterForm.addEventListener('change', () => {
        map.removeLayer(adPin);
      });

      adFormReset.addEventListener('click', () => {
        map.removeLayer(adPin);
      });
    } else {
      break;
    }
  }
};

getData(ServerUrl.ADS_DATA)
  .then((ads) => {
    const adPins = [];

    ads.forEach(({offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}, author: {avatar}, location: {lat, lng}}, index) => {
      adPins[index] = {
        title,
        address,
        price,
        type: apartmentTypeToRus[type],
        rooms,
        guests,
        checkin,
        checkout,
        features,
        description,
        photos,
        avatar,
        lat,
        lng,
      }
    });

    renderAdPins(adPins);

    const setFilterChange = () => {
      const filteredAdPins = getFilteredAds(adPins);

      renderAdPins(filteredAdPins);
    };

    mapFilterForm.addEventListener('change', _.debounce(setFilterChange, DEBOUNCE_INTERVAL));

    adFormReset.addEventListener('click', () => {
      renderAdPins(adPins);
    });

  })
  .then(() => {
    mapFilters.forEach((element) => {
      activateElement(element);
    });
    activateElement(featuresFilter);
    activateBlock(mapFilterForm, 'map__filters--disabled');
  })
  .catch(() => showIncomingError(INCOMING_ERROR_MESSAGE));

export {TokyoCoordinate, ADS_MAX_QUANTITY, mapPin};
