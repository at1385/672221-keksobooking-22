import {APARTMENT_TYPES} from './create-ads.js'

const adForm = document.querySelector('.ad-form');
const adFormType = adForm.querySelector('#type');
const adFormPrice = adForm.querySelector('#price');

const setAdMinPrice = () => {
  switch (adFormType.value) {
    case APARTMENT_TYPES[0]:
      adFormPrice.setAttribute('min', '10000');
      adFormPrice.setAttribute('placeholder', '10000');
      break;
    case APARTMENT_TYPES[1]:
      adFormPrice.setAttribute('min', '1000');
      adFormPrice.setAttribute('placeholder', '1000');
      break;
    case APARTMENT_TYPES[2]:
      adFormPrice.setAttribute('min', '5000');
      adFormPrice.setAttribute('placeholder', '5000');
      break;
    case APARTMENT_TYPES[3]:
      adFormPrice.setAttribute('min', '0');
      adFormPrice.setAttribute('placeholder', '0');
      break;
  }
};

adFormType.addEventListener('change', () => {
  setAdMinPrice();
});

const adFormTimeIn = adForm.querySelector('#timein');
const adFormTimeOut = adForm.querySelector('#timeout');

const onAdFormTimeInChange = () => {
  adFormTimeOut.value = adFormTimeIn.value;
};

const onAdFormTimeOutChange = () => {
  adFormTimeIn.value = adFormTimeOut.value;
};

adFormTimeIn.addEventListener('change', onAdFormTimeInChange);

adFormTimeOut.addEventListener('change',onAdFormTimeOutChange);
