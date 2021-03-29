import {TOKYO_LATITUDE, TOKYO_LONGITUDE, COORD_PRECISION, mapPin} from './map.js'
import {mapFilterForm} from './filters.js';
import {adForm, adFormAddress} from './form.js';

const resetPage = () => {
  mapPin.setLatLng({
    lat: TOKYO_LATITUDE,
    lng: TOKYO_LONGITUDE,
  });

  mapFilterForm.reset();
  adForm.reset();

  adFormAddress.value = `${TOKYO_LATITUDE.toFixed(COORD_PRECISION)}, ${TOKYO_LONGITUDE.toFixed(COORD_PRECISION)}`;
};

export {resetPage};
