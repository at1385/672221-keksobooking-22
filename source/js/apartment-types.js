const ApartmentType = {
  PALACE: 'palace',
  FLAT: 'flat',
  HOUSE: 'house',
  BUNGALOW: 'bungalow',
}

const apartmentTypeToRus = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
};

const apartmentTypeToEng = {
  'Дворец': 'palace',
  'Квартира': 'flat',
  'Дом': 'house',
  'Бунгало': 'bungalow',
};

export {ApartmentType, apartmentTypeToRus, apartmentTypeToEng};
