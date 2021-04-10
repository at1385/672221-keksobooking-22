import {activateBlock, activateElement} from './activator.js';
import {ServerUrl, getData} from './server.js';
import {apartmentTypeToRus} from './apartment-types.js';
import {renderAdCard} from './render-ad-card.js';
import {mapFilterForm, mapFilters, mapFeaturesBlock} from './filters.js';
import {adForm, adFormHeader, adFormElements, adFormAddress} from './form.js';
import {showIncomingError} from './util.js';

const TokyoCoordinate = {
  LATITUDE: 35.67100,
  LONGITUDE: 139.78350,
  PRECISION: 5,
}

const ADS_MAX_QUANTITY = 10;

const INCOMING_ERROR_MESSAGE = 'Объявления не были загружены. Попробуйте обновить страницу.';

const map = window.L.map('map-canvas')
  .on('load', () => {
    activateElement(adFormHeader);
    adFormElements.forEach((element) => {
      activateElement(element);
    });
    activateBlock(adForm, 'ad-form--disabled');

    adFormAddress.value = `${TOKYO_LATITUDE.toFixed(COORD_PRECISION)}, ${TOKYO_LONGITUDE.toFixed(COORD_PRECISION)}`;
  })
  .setView({
    lat: TokyoCoordinate.LATITUDE,
    lng: TokyoCoordinate.LONGITUDE,
  }, 10);

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

getData(ADS_DATA_URL)
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

    adPins.slice(0, ADS_MAX_QUANTITY).forEach((element) => {
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
        );
    })
  })
  .then(() => {
    mapFilters.forEach((element) => {
      activateElement(element);
    });
    activateElement(mapFeaturesBlock);
    activateBlock(mapFilterForm, 'map__filters--disabled');
  })
  .catch(() => showIncomingError(INCOMING_ERROR_MESSAGE));

export {TokyoCoordinate, ADS_MAX_QUANTITY, mapPin};
