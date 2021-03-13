import {APARTMENT_TYPES} from './create-ads.js';
import {deactivateBlock, deactivateElement} from './deactivator.js';

const adForm = document.querySelector('.ad-form');
const adFormHeader = adForm.querySelector('.ad-form-header');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const adFormType = adForm.querySelector('#type');
const adFormPrice = adForm.querySelector('#price');

deactivateBlock(adForm, 'ad-form--disabled');

deactivateElement(adFormHeader);

adFormElements.forEach((element) => {
  deactivateElement(element);
});

const adFormAddress = adForm.querySelector('#address');
adFormAddress.setAttribute('readonly', true);

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

export {adForm, adFormHeader, adFormElements, adFormAddress};
