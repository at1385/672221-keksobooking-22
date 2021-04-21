import {TokyoCoordinate, mapPin} from './map.js'
import {mapFilterForm} from './filters.js';
import {adForm, adFormAddress} from './form.js';

const resetPage = () => {
  mapPin.setLatLng({
    lat: TokyoCoordinate.LATITUDE,
    lng: TokyoCoordinate.LONGITUDE,
  });

  mapFilterForm.reset();
  adForm.reset();

  adFormAddress.value = `${TokyoCoordinate.LATITUDE.toFixed(TokyoCoordinate.PRECISION)}, ${TokyoCoordinate.LONGITUDE.toFixed(TokyoCoordinate.PRECISION)}`;
};

export {resetPage};
