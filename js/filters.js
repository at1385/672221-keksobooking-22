import {deactivateBlock, deactivateElement} from './deactivator.js';
import {apartmentTypeToEng} from './apartment-types.js';
import {ADS_MAX_QUANTITY} from './map.js';

const FILTER_DEFAULT_VALUE = 'any';

const PriceRange = {
  LOW: {
    MIN: 0,
    MAX: 10000,
  },
  MIDDLE: {
    MIN: 10000,
    MAX: 50000,
  },
  HIGH: {
    MIN: 50000,
    MAX: Infinity,
  },
}

const mapFilterForm = document.querySelector('.map__filters');
const mapFilters = mapFilterForm.querySelectorAll('.map__filter');

const typeFilter = mapFilterForm.querySelector('#housing-type');
const priceFilter = mapFilterForm.querySelector('#housing-price');
const roomsFilter = mapFilterForm.querySelector('#housing-rooms');
const guestsFilter = mapFilterForm.querySelector('#housing-guests');
const featuresFilter = mapFilterForm.querySelector('#housing-features');

deactivateBlock(mapFilterForm, 'map__filters--disabled');

mapFilters.forEach((element) => {
  deactivateElement(element);
});

deactivateElement(featuresFilter);

const filterByType = (ad) => typeFilter.value === FILTER_DEFAULT_VALUE || typeFilter.value === apartmentTypeToEng[ad.type];
const filterByPrice = (ad) => priceFilter.value === FILTER_DEFAULT_VALUE || (PriceRange[priceFilter.value.toUpperCase()].MIN <= ad.price && PriceRange[priceFilter.value.toUpperCase()].MAX >= ad.price);
const filterByRooms = (ad) => roomsFilter.value === FILTER_DEFAULT_VALUE || +roomsFilter.value === ad.rooms;
const filterByGuests = (ad) => guestsFilter.value === FILTER_DEFAULT_VALUE || +guestsFilter.value === ad.guests;
const filterByFeatures = (ad) => {
  const checkedFeatures = Array.from(featuresFilter.querySelectorAll('input:checked'));

  return checkedFeatures.every((element) => ad.features.includes(element.value));
};

const getFilteredAds = (ads) => {
  const filteredAds = [];

  for (let i = 0; i < ads.length; i++) {
    if (filterByType(ads[i]) && filterByPrice(ads[i]) && filterByRooms(ads[i]) && filterByGuests(ads[i]) && filterByFeatures(ads[i])) {
      filteredAds.push(ads[i])

      if (filteredAds.length === ADS_MAX_QUANTITY) {
        break;
      }
    }
  }

  return filteredAds;
};

export {mapFilterForm, mapFilters, featuresFilter, getFilteredAds};
