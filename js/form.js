import {deactivateBlock, deactivateElement} from './deactivator.js';
import {ServerUrl, sendData} from './server.js';
import {ApartmentType} from './apartment-types.js';
import {resetPage} from './reset-page.js';
import {deleteAttribute, getCorrectEndingWord, showOutcomingMessage} from './util.js';

const AdTitleLength = {
  MIN: 30,
  MAX: 100,
}

const AdPrice = {
  MIN: {
    PALACE: 10000,
    FLAT: 1000,
    HOUSE: 5000,
    BUNGALOW: 0,
  },
  MAX: 1e6,
}

const adForm = document.querySelector('.ad-form');
adForm.setAttribute('action', 'https://22.javascript.pages.academy/keksobooking');

const adFormHeader = adForm.querySelector('.ad-form-header');
const adFormElements = adForm.querySelectorAll('.ad-form__element');

deactivateBlock(adForm, 'ad-form--disabled');
deactivateElement(adFormHeader);
adFormElements.forEach((element) => {
  deactivateElement(element);
});

// title
const adFormTitle = adForm.querySelector('#title');
adFormTitle.setAttribute('required', true);
adFormTitle.setAttribute('minlength', AdTitleLength.MIN);
adFormTitle.setAttribute('maxlength', AdTitleLength.MAX);

adFormTitle.addEventListener('input', () => {
  const lengthValue = adFormTitle.value.length;

  if (lengthValue < AdTitleLength.MIN) {
    adFormTitle.setCustomValidity(`Необходимо ввести ещё минимум ${AdTitleLength.MIN - lengthValue} ${getCorrectEndingWord(AdTitleLength.MIN - lengthValue, 'символ', 'символа', 'символов')}`);
  } else if (lengthValue > AdTitleLength.MAX) {
    adFormTitle.setCustomValidity(`Сократите заголовок на ${lengthValue - AdTitleLength.MAX} ${getCorrectEndingWord(lengthValue - AdTitleLength.MAX, 'символ', 'символа', 'символов')}`);
  } else {
    deleteAttribute(adFormTitle, 'style');
    adFormTitle.setCustomValidity('');
  }

  adFormTitle.reportValidity();
});

// address
const adFormAddress = adForm.querySelector('#address');
adFormAddress.setAttribute('readonly', true);

// type/price
const adFormType = adForm.querySelector('#type');
const adFormPrice = adForm.querySelector('#price');
adFormPrice.setAttribute('required', true);
adFormPrice.setAttribute('max', AdPrice.MAX);

const setAdMinPrice = () => {
  switch (adFormType.value) {
    case ApartmentType.PALACE:
      adFormPrice.setAttribute('min', AdPrice.MIN.PALACE);
      adFormPrice.setAttribute('placeholder', AdPrice.MIN.PALACE);
      break;
    case ApartmentType.FLAT:
      adFormPrice.setAttribute('min', AdPrice.MIN.FLAT);
      adFormPrice.setAttribute('placeholder', AdPrice.MIN.FLAT);
      break;
    case ApartmentType.HOUSE:
      adFormPrice.setAttribute('min', AdPrice.MIN.HOUSE);
      adFormPrice.setAttribute('placeholder', AdPrice.MIN.HOUSE);
      break;
    case ApartmentType.BUNGALOW:
      adFormPrice.setAttribute('min', AdPrice.MIN.BUNGALOW);
      adFormPrice.setAttribute('placeholder', AdPrice.MIN.BUNGALOW);
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
    deleteAttribute(adFormPrice, 'style');
    adFormPrice.setCustomValidity('');
  }

  adFormPrice.reportValidity();
});

// in/out
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

// rooms/guests
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
    deleteAttribute(adFormGuestQuantity, 'style');
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

// reset
const adFormReset = adForm.querySelector('.ad-form__reset');

adFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetPage();
  deleteAttribute(adFormTitle, 'style');
  deleteAttribute(adFormPrice, 'style');
  deleteAttribute(adFormGuestQuantity, 'style');
});

// submit
const adFormSubmit = adForm.querySelector('.ad-form__submit');

const setInvalidBorder = (formElement) => {
  formElement.addEventListener('invalid', () => {
    formElement.style = 'border: 2px solid red';
  });
};

adFormSubmit.addEventListener('click', () => {
  setInvalidBorder(adFormTitle);
  setInvalidBorder(adFormPrice);
  setInvalidBorder(adFormGuestQuantity);
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
