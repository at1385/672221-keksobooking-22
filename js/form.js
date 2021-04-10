import {deactivateBlock, deactivateElement} from './deactivator.js';
import {ServerUrl, sendData} from './server.js';
import {ApartmentType} from './apartment-types.js';
import {resetPage} from './reset-page.js';
import {getCorrectEndingWord, showOutcomingMessage} from './util.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MIN_PRICE_PALACE = 10000;
const MIN_PRICE_FLAT = 1000;
const MIN_PRICE_HOUSE = 5000;
const MIN_PRICE_BUNGALOW = 0;
const MAX_PRICE_VALUE = 1e6;

const adForm = document.querySelector('.ad-form');
adForm.setAttribute('action', 'https://22.javascript.pages.academy/keksobooking');

const adFormHeader = adForm.querySelector('.ad-form-header');
const adFormElements = adForm.querySelectorAll('.ad-form__element');

deactivateBlock(adForm, 'ad-form--disabled');
deactivateElement(adFormHeader);
adFormElements.forEach((element) => {
  deactivateElement(element);
});

const adFormTitle = adForm.querySelector('#title');
adFormTitle.setAttribute('required', true);
adFormTitle.setAttribute('minlength', MIN_TITLE_LENGTH);
adFormTitle.setAttribute('maxlength', MAX_TITLE_LENGTH);

adFormTitle.addEventListener('input', () => {
  const lengthValue = adFormTitle.value.length;

  if (lengthValue < MIN_TITLE_LENGTH) {
    adFormTitle.setCustomValidity(`Необходимо ввести ещё минимум ${MIN_TITLE_LENGTH - lengthValue} ${getCorrectEndingWord(MIN_TITLE_LENGTH - lengthValue, 'символ', 'символа', 'символов')}`);
  } else if (lengthValue > MAX_TITLE_LENGTH) {
    adFormTitle.setCustomValidity(`Сократите заголовок на ${lengthValue - MAX_TITLE_LENGTH} ${getCorrectEndingWord(lengthValue - MAX_TITLE_LENGTH, 'символ', 'символа', 'символов')}`);
  } else {
    adFormTitle.setCustomValidity('');
  }

  adFormTitle.reportValidity();
});

const adFormAddress = adForm.querySelector('#address');
adFormAddress.setAttribute('readonly', true);

const adFormType = adForm.querySelector('#type');
const adFormPrice = adForm.querySelector('#price');
adFormPrice.setAttribute('required', true);
adFormPrice.setAttribute('max', MAX_PRICE_VALUE);

const setAdMinPrice = () => {
  switch (adFormType.value) {
      adFormPrice.setAttribute('min', MIN_PRICE_PALACE);
      adFormPrice.setAttribute('placeholder', MIN_PRICE_PALACE);
    case ApartmentType.PALACE:
      break;
      adFormPrice.setAttribute('min', MIN_PRICE_FLAT);
      adFormPrice.setAttribute('placeholder', MIN_PRICE_FLAT);
    case ApartmentType.FLAT:
      break;
      adFormPrice.setAttribute('min', MIN_PRICE_HOUSE);
      adFormPrice.setAttribute('placeholder', MIN_PRICE_HOUSE);
    case ApartmentType.HOUSE:
      break;
      adFormPrice.setAttribute('min', MIN_PRICE_BUNGALOW);
      adFormPrice.setAttribute('placeholder', MIN_PRICE_BUNGALOW);
    case ApartmentType.BUNGALOW:
      break;
  }
};

setAdMinPrice();

adFormType.addEventListener('change', () => {
  setAdMinPrice();
});

adFormPrice.addEventListener('input', () => {
  const priceValue = +adFormPrice.value;

  if (priceValue < +adFormPrice.min) {
    adFormPrice.setCustomValidity(`Минимальная цена за ночь должна быть не ниже ${adFormPrice.min} рублей`);
  } else if (priceValue > +adFormPrice.max) {
    adFormPrice.setCustomValidity(`Максимальная цена за ночь должна быть не выше ${adFormPrice.max} рублей`);
  } else {
    adFormPrice.setCustomValidity('');
  }

  adFormPrice.reportValidity();
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

const adFormRoomQuantity = adForm.querySelector('#room_number');
const adFormGuestQuantity = adForm.querySelector('#capacity');

const showRoomOrGuestMessage = (messageLocation, customMessage) => {
  if (+adFormRoomQuantity.value < +adFormGuestQuantity.value) {
    messageLocation.setCustomValidity(customMessage);
  } else if (+adFormRoomQuantity.value === 100 && +adFormGuestQuantity.value !== 0) {
    messageLocation.setCustomValidity('100 комнат не для гостей!');
  } else if (+adFormRoomQuantity.value !== 100 && +adFormGuestQuantity.value === 0) {
    messageLocation.setCustomValidity('Только для 100 комнат!');
  } else {
    messageLocation.setCustomValidity('');
  }
};

adFormRoomQuantity.addEventListener('change', () => {
  showRoomOrGuestMessage(adFormGuestQuantity, 'Количество гостей не должно превышать количество комнат!');

  adFormGuestQuantity.reportValidity();
});

adFormGuestQuantity.addEventListener('change', () => {
  showRoomOrGuestMessage(adFormRoomQuantity, 'Количество комнат не должно быть меньше количества гостей!');

  adFormRoomQuantity.reportValidity();
});

adForm.addEventListener('click', () => {
  showRoomOrGuestMessage(adFormGuestQuantity, 'Количество гостей не должно превышать количество комнат!');
});

const adFormReset = adForm.querySelector('.ad-form__reset');

adFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetPage();
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendData(
    new FormData(evt.target),
    ServerUrl.AD_FORM,
    () => {
      resetPage();
      showOutcomingMessage('#success', '.success');
    },
    () => {
      showOutcomingMessage('#error', '.error');
    },
  );
});

export {adForm, adFormHeader, adFormElements, adFormAddress};
